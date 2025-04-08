import { Order } from "../models/order.js";
import { Customer } from "../models/customer.js";
import BlockedRole from "../models/email.js";
import { sendEmail } from "../core/common/nodeMailer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { Item } from "../models/item.js";
import { sentMailAfterCloseOrder } from "../core/Template/sentMailAfterCloseOrder.js";
import fs from "fs";
import sendInvoiceEmail from "../core/common/sendInvoiceMail.js";
import generateInvoicePDF from "./pdfInvoice.js";



export const addOrder = async (req) => {
  const {
    customerId,
    employee,
    items,
    status,
    expectedTime,
    totalPrice,
    discount,
    tax,
    paymentStatus,
    chef,
    type,
    paymentMode,
    phone,
    table,
    orderStatus
  } = req?.body;

  const order = await Order.create({
    customerId,
    employee,
    items,
    status,
    expectedTime,
    totalPrice,
    discount,
    tax,
    paymentStatus,
    chef,
    type,
    paymentMode,
    phone,
    table,
    orderStatus
  });

  const createdOrder = await Order.findById(order._id);

  if (!createdOrder) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdOrder;
};

export const getOrder = async () => {
  const order = await Order?.find().populate().sort({ createdAt: -1 });

  return order;
};
export const getTotalSales = async (req) => {
  try {
    const { year } = req?.query;
    const condition_obj = {};
    if (year) {
      condition_obj["createdAt"] = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    }
    const order = await Order.aggregate([
      { $match: condition_obj },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total_sales_amount: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedData = months.map((month, index) => {
      const monthData = order.find((data) => data._id === index + 1);
      return monthData ? monthData.total_sales_amount : 0;
    });
    return formattedData;
  } catch (error) {
    console.error("Error fetching total sales for the month:", error);
    throw new Error(data_not_found);
  }
};
export const getTotalQty = async (req) => {
  try {
    const { year } = req?.query;
    const condition_obj = {};
    if (year) {
      condition_obj["createdAt"] = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    }
    const order = await Order.aggregate([
      {
        $match: condition_obj,
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalQuantitySold: { $sum: "$items.quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedData = months.map((month, index) => {
      const monthData = order.find((data) => data._id === index + 1);
      return monthData ? monthData.totalQuantitySold : 0;
    });
    return formattedData;
  } catch (error) {
    throw new Error(data_not_found);
  }
};

export const getOrderbyId = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }
  const order = await Order.findOne({ _id: id });

  if (!order) {
    throw new CustomError(
      statusCodes?.notFound,
      "Order not found",
      errorCodes?.not_found,
    );
  }

  return order;
};
export const getOrderByCustomerId = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }
  const order = await Order.find({ customerId: id });

  if (!order) {
    throw new CustomError(
      statusCodes?.notFound,
      "Order not found",
      errorCodes?.not_found,
    );
  }

  return order;
};

export const updateOrder = async (id, updatedData) => {
  const itemdata = await Item.findById(updatedData.items);
  if (!itemdata) {
    throw new CustomError(statusCodes?.notFound, "Item not found", errorCodes?.not_found);
  }
  const newItem = {
    id: itemdata._id,
    name: itemdata.name,
    price: itemdata.price,
    quantity: updatedData.quantity,
    cost: itemdata.cost
  };

  const order = await Order.findById(id);
  if (!order) {
    throw new CustomError(statusCodes?.notFound, "Order not found", errorCodes?.not_found);
  }
  order.items.push(newItem);
  order.totalPrice = order.totalPrice + (newItem.price * newItem.quantity);

  await order.save();
  return order;
};


export const updateOrderStatus = async (orderId, updatedData) => {

  if (!orderId || !updatedData.orderStatus) {
    throw new CustomError(statusCodes.badRequest, "Missing required fields", errorCodes.bad_request);
  }

  const order = await Order.findById(orderId);
  if (!order) {
    throw new CustomError(statusCodes.notFound, "Order not found", errorCodes.not_found);
  }
 


  const customer = await Customer.findById(order.customerId);
  if (!customer) {
    throw new CustomError(
      statusCodes.notFound,
      "Customer not found",
      errorCodes.not_found
    );
  }
 

  order.orderStatus = updatedData.orderStatus;
  await order.save();

  const orderDetails = {
    orderId: order._id,
    orderStatus: updatedData.orderStatus,
    totalPrice: order.totalPrice,
    customerName: customer?.name || 'N/A',
    customerEmail: customer.email,
    items: order.items,

  };

  try {
    const invoicePath = await generateInvoicePDF(orderDetails);
    await sendInvoiceEmail(customer.email, invoicePath);

    if (fs.existsSync(invoicePath)) {
      fs.unlinkSync(invoicePath);
    }
  } catch (error) {
    console.error("Error processing invoice:", error);
    throw new Error("Failed to generate or send invoice.");
  }



  const isBlocked = await BlockedRole.findOne({ role: "On Invoice Generate" });
  if (isBlocked?.isBlocked) {
    await sendEmail(
      customer?.email,
      "Welcome to Our Company",
      "",
      sentMailAfterCloseOrder(order?.totalPrice),
    );
  } else {
    console.log("Email not sent as 'client' role is blocked.");
  }

  return { success: true, message: "Order status updated", order };
};


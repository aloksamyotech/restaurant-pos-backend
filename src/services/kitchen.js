import mongoose from "mongoose";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { Kitchen } from "../models/kitchen.js";
import CustomError from "../utils/exception.js";
import BlockedRole from "../models/email.js";
import { sendEmail } from "../core/common/nodeMailer.js";
import { Employee } from "../models/user.js";
import getChefAssignmentEmailTemplate from "../core/Template/getChefAssignmentEmailTemplate.js";
import { Order } from "../models/order.js";
import { Customer } from "../models/customer.js";
import { sentMailAfterCloseOrder } from "../core/Template/sentMailAfterCloseOrder.js";
import fs from "fs";
import sendInvoiceEmail from "../core/common/sendInvoiceMail.js";
import generateInvoicePDF from "./pdfInvoice.js";



export const addKitchenOrder = async (req) => {
    let { order, table } = req?.body;
    order = new mongoose.Types.ObjectId(order);
    const kitchenOrder = await Kitchen.create({
        order: order,
        status: 'pending',
        table
    });
    const createdKitchenOrder = await Kitchen.findById(kitchenOrder._id).lean();
    if (!createdKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }
    return createdKitchenOrder;
};

export const updateKitchenOrder = async (req) => {
    const kitchenOrderId = req?.params?.id
    const { ...updatedValues } = req?.body;

const isKitchenOrder = await Kitchen.findById(kitchenOrderId);
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }
    const updatedData = await Kitchen.findOneAndUpdate({
        _id: kitchenOrderId,

    },
        updatedValues
    );
  const chefId=updatedValues?.chef;
 const chefData = await Employee.findById(chefId);
  
   
   const fetchChefData = {
      email: chefData?.email,
      name: chefData?.firstName,
      
    };
    
      const isBlocked = await BlockedRole.findOne({ role: "chef Assign" });
      if (isBlocked?.isBlocked) {
        await sendEmail(
            fetchChefData?.email,
          "Welcome to Our Company",
          "",
          getChefAssignmentEmailTemplate(fetchChefData?.name),
        );
      } else {
        console.log("Email not sent as 'client' role is blocked.");
      }

    return updatedData;
};

export const findKitchenOrderById = async (req) => {
    let kitchenOrderId = req?.params?.id

    kitchenOrderId = new mongoose.Types.ObjectId(kitchenOrderId)
    const isKitchenOrder = await Kitchen.findById(kitchenOrderId).populate("chef", "firstName").populate("order", "type");
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }

    return isKitchenOrder;
};

export const findAllKitchenOrder = async (req) => {
    const isKitchenOrder = await Kitchen.find().populate("order", "type").sort({ createdAt: -1 });
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }

    return isKitchenOrder;
};

export const updateOrderStatus = async (kitchenId, updatedData) => {
 

    if (!kitchenId || !updatedData.status) {
      throw new CustomError(statusCodes.badRequest, "Missing required fields", errorCodes.bad_request);
    }
  
    const KitchenData = await Kitchen.findById(kitchenId);
    if (!KitchenData) {
      throw new CustomError(statusCodes.notFound, "KitchenData not found", errorCodes.not_found);
    }
   
    const order = await Order.findById(KitchenData?.order);
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
   
  
    KitchenData.status = updatedData.status;
    await KitchenData.save();
  
    const orderDetails = {
      orderId: order._id,
      orderStatus: updatedData?.status,
      totalPrice: order?.totalPrice,
      customerName: customer?.name || 'N/A',
      customerEmail: customer?.email,
      items: order?.items,
  
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
  
  

import { Order } from "../models/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addOrder = async (req) => {
  const {customer, employee, items, status, expectedTime, totalPrice, discount, tax, paymentStatus, chef, type} = req.body;



const order = await Order.create({
    customer, employee, items, status, expectedTime, totalPrice, discount, tax, paymentStatus, chef, type
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


export const deleteOrder= async (req) => {
  const { id } = req.params; 

 
  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }


  

  return {
    message: Message?.deletedSuccessfully,
    itemId: id,
  };
};

export const getOrder= async () => {
  const order = await Order.find();
 
  return order;
};

export const updateOrder= async (id, updatedData) => {
  
  const item = await Item.findByIdAndUpdate(id, updatedData, { new: true });

  if (!item) {
    throw new CustomError(
      statusCodes?.notFound,
      "Order not found",
      errorCodes?.not_found,
    );
  }

  return item;
};


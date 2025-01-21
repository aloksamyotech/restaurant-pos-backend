import { Order } from "../models/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

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
  const order = await Order.find().populate();

  return order;
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

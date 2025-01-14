import * as orderService from "../services/order.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addOrder = async (req, res, next) => {
  const orderData = await orderService?.addOrder(req, res, next);
  res.status(statusCodes?.created).send(orderData);
};

const deleteOrder = async (req, res, next) => {
  const orderData = await orderService?.deleteOrder(req, res, next);
  res.status(statusCodes?.ok).send(orderData);
};

const getOrder = async (req, res, next) => {
  const order = await orderService?.getOrder(req, res, next);
  res.status(statusCodes?.ok).send(order);
};
const fetchOrder = async (req, res, next) => {
  const order = await orderService?.getOrderbyId(req, res, next);
  res.status(statusCodes?.ok).send(order);
};

const updateOrder = async (req, res, next) => {
  const { id } = req?.params;
  const updatedData = req?.body;

  const updatedOrder = await orderService?.updateOrder(id, updatedData);

  res.status(statusCodes?.ok).send(updatedOrder);
};

export default {
  addOrder,
  deleteOrder,
  getOrder,
  fetchOrder,
  updateOrder,
};

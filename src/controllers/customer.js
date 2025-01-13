import * as customerService from "../services/customer.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addCustomer = async (req, res, next) => {
  const customerData = await customerService?.addCustomer(req, res, next);
  res.status(statusCodes?.created).send(customerData);
};

const deleteCustomer = async (req, res, next) => {
  const customerData = await customerService?.deleteCustomer(req, res, next);
  res.status(statusCodes?.ok).send(customerData);
};

const getCustomer = async (req, res, next) => {
  const customer = await customerService?.getCustomers(req, res, next);
  res.status(statusCodes?.ok).send(customer);
};
const fetchCustomer = async (req, res, next) => {
  const customer = await customerService?.getCustomerbyId(req, res, next);
  res.status(statusCodes?.ok).send(customer);
};

const updateCustomer = async (req, res, next) => {
  const { id } = req?.params;
  const updatedData = req?.body;

  const updatedCustomer = await customerService?.updateCustomer(
    id,
    updatedData,
  );

  res.status(statusCodes?.ok).send(updatedCustomer);
};

export default {
  addCustomer,
  deleteCustomer,
  getCustomer,
  fetchCustomer,
  updateCustomer,
};

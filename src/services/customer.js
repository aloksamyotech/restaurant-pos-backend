import { Customer } from "../models/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addCustomer = async (req) => {
  const { customerName, email, phone, address } = req?.body;

  const customer = await Customer.create({
    customerName,
    email,
    phone,
    address,
  });

  const createdCustomer = await Customer.findById(customer._id);

  if (!createdCustomer) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdCustomer;
};

export const deleteCustomer = async (req) => {
  const { id } = req?.params;

  const customer = await Customer.findByIdAndDelete(id);
  if (!customer) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    customerId: id,
  };
};

export const getCustomers = async () => {
  const customers = await Customer.find();
  return customers;
};

export const getCustomerbyId = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }
  const customer = await Customer.findOne({ _id: id });
  if (!customer) {
    throw new CustomError(
      statusCodes?.notFound,
      "Customer not found",
      errorCodes?.not_found,
    );
  }

  return customer;
};

export const updateCustomer = async (id, updatedData) => {
  const customer = await Customer.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!customer) {
    throw new CustomError(
      statusCodes?.notFound,
      "Customer not found",
      errorCodes?.not_found,
    );
  }

  return customer;
};

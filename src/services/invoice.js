import { Invoice } from "../models/invoice.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addInvoice = async (req) => {
  const {
    orderId,
    paymentId,
    customerId,
    items,
    amount,
    tax,
    discount,
    paymentMode,
    paymentStatus,
    customerName,
    invoicePdfUrl
  } = req?.body;

  const invoice = await Invoice.create({
    orderId,
    paymentId,
    customerId,
    items,
    amount,
    tax,
    discount,
    paymentMode,
    paymentStatus,
    customerName,
    invoicePdfUrl
  });

  const createdInvoice = await Invoice.findById(invoice._id);

  if (!createdInvoice) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdInvoice;
};

export const getInvoicebyId = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }

  const invoice = await Invoice.findOne({ _id: id })
    .populate({
      path: "customerId",
      select: "name email phone",
    })
    .populate({
      path: "paymentId",
      select: "status mode amount",
    });
  if (!invoice) {
    throw new CustomError(
      statusCodes?.notFound,
      "Invoice not found",
      errorCodes?.not_found,
    );
  }

  return invoice;
};

export const getInvoiceByOrderId = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }
  const invoice = await Invoice.findOne({ orderId: id });
  if (!invoice) {
    throw new CustomError(
      statusCodes?.notFound,
      "Invoice not found",
      errorCodes?.not_found,
    );
  }

  return invoice;
};

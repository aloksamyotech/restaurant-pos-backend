import * as invoiceService from "../services/invoice.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addInvoice = async (req, res, next) => {
  const invoiceData = await invoiceService?.addInvoice(req, res, next);
  res.status(statusCodes?.created).send(invoiceData);
};

const fetchInvoice= async  (req, res, next) => {
  const invoice = await invoiceService?.getInvoicebyId(req, res, next); 
  res.status(statusCodes?.ok).send(invoice); 
};

export default {
    addInvoice,
    fetchInvoice,
    
    
  
};
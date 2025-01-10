import * as paymentService from "../services/payment.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addPayment = async (req, res, next) => {
  const paymentData = await paymentService?.addPayment(req, res, next);
  res.status(statusCodes?.created).send(paymentData);
};

const deletePayment = async (req, res, next) => {
  const paymentData = await paymentService?.deletePayment(req, res, next);
  res.status(statusCodes?.ok).send(paymentData);
};

const getPayment= async  (req, res, next) => {
  const payment = await paymentService?.getPayments(req, res, next); 
  res.status(statusCodes?.ok).send(payment); 
};
const fetchPayment= async  (req, res, next) => {
  const payment = await paymentService?.getPaymentbyId(req, res, next); 
  res.status(statusCodes?.ok).send(payment); 
};

const updatePayment= async (req, res, next) => {
  const { id } = req?.params; 
  const updatedData = req?.body; 

  const updatedPayment= await paymentService?.updatePayment(id, updatedData);

  res.status(statusCodes?.ok).send(updatedPayment); 
};




export default {
    addPayment,
    deletePayment,
    getPayment,
    fetchPayment,
    updatePayment
    
  
};

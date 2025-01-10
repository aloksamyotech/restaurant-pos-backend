import { Payment } from "../models/payment.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addPayment = async (req) => {
  const { paymentMode,amount,paymentStatus} = req?.body;

 const payment = await Payment .create({
    paymentMode,amount,paymentStatus
  });

  const createdPayment  = await Payment.findById(payment._id);
  

  if (!createdPayment ) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdPayment ;
};


export const deletePayment = async (req) => {
  const { id } = req?.params; 

 const payment=await Payment.findByIdAndDelete(id);
  if (!payment) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

return {
    message: Message?.deletedSuccessfully,
    paymentId: id,
  };
};


export const getPayments = async () => {
  const payments = await Payment.find(); 
  return payments;
};

export const getPaymentbyId= async (req) => {
    const {id} = req?.params;
    if(!id){
        throw new CustomError(
            statusCodes?.badRequest,
            Message?.idRequired,
            errorCodes?.id_required
          );
    }
  const payment = await Payment.findOne({_id:id});
  if (!payment) {
    throw new CustomError(
      statusCodes?.notFound,
      "Payment not found",
      errorCodes?.not_found,
    );
  }
 
  return payment;
};



export const updatePayment = async (id, updatedData) => {
  
  const payment = await Payment.findByIdAndUpdate(id, updatedData, { new: true });

  if (!payment) {
    throw new CustomError(
      statusCodes?.notFound,
      "Payment not found",
      errorCodes?.not_found,
    );
  }

  return payment;
};


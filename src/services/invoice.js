import { Invoice } from "../models/invoice.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addInvoice = async (req) => {
    const {OrderId} = req?.body;
  
  const invoice = await Invoice.create({
    OrderId
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
  

  export const getInvoicebyId= async (req) => {
    const {id} = req.params;
    if(!id){
        throw new CustomError(
            statusCodes?.badRequest,
            Message?.idRequired,
            errorCodes?.id_required
          );
    }
  const invoice = await Invoice.findOne({_id:id});
  if (!invoice) {
    throw new CustomError(
      statusCodes?.notFound,
      "Invoice not found",
      errorCodes?.not_found,
    );
  }
 
  return invoice;
};
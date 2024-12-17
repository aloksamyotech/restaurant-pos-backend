import { Item } from "../models/item.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addItem  = async (req) => {
  const { itemName,desc, active, image,itemId,ingredient,price ,cost,totalServing,rating,comment,discount,categoryName} = req.body;

  // TODO: Validation

  const isItemAlreadyExist = await Item.findOne({ itemName });

  if (isItemAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const item = await Item.create({
    itemName,desc, active, image,itemId,ingredient,price ,cost,totalServing,rating,comment,discount,categoryName
  });

  const createdItem  = await Item.findById(item._id);
  

  if (!createdItem) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdItem ;
};


export const deleteItem = async (req) => {
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

export const getItem = async () => {
  const item = await Item.find(); 
  return item;
};

export const updateItem = async (id, updatedData) => {
  
  const item = await Item.findByIdAndUpdate(id, updatedData, { new: true });

  if (!item) {
    throw new CustomError(
      statusCodes?.notFound,
      "Item not found",
      errorCodes?.not_found,
    );
  }

  return item;
};

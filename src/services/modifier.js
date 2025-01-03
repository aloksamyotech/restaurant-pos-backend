import { Modifier } from "../models/modifier.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addModifier = async (req) => {
  const { name, desc, cost, price,isAvailable } = req.body;

  
  const isModifierAlreadyExist = await Modifier.findOne({ name });

  if (isModifierAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

 
  const modifier = await Modifier.create({ name, desc, cost, price,isAvailable });

  const createdModifier = await Modifier.findById(modifier._id);
 
  if (!createdModifier) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdModifier;
};

export const deleteModifier = async (req) => {
  const { id } = req.params;

  
  const modifier = await Modifier.findByIdAndDelete(id);
  if (!modifier) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    modifierId: id,
  };
};

export const getModifiers = async () => {
  const modifiers = await Modifier.find(); 
  return modifiers;
};

export const updateModifier = async (id, updatedData) => {
  
  const modifier = await Modifier.findByIdAndUpdate(id, updatedData, { new: true });

  if (!modifier) {
    throw new CustomError(
      statusCodes?.notFound,
      "Modifier not found",
      errorCodes?.not_found,
    );
  }

  return modifier;
};

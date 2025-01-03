import { Ingredient } from "../models/ingredient.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addIngredient = async (req) => {
  const { name,desc, cost,price, quantity,unit,isAvailable } = req.body;

 

  const isIngredientAlreadyExist = await Ingredient.findOne({ name });

  if (isIngredientAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const ingredient = await Ingredient .create({
    name,desc, cost,price, quantity,unit,isAvailable
  });

  const createdIngredient  = await Ingredient .findById(ingredient ._id);
  

  if (!createdIngredient ) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdIngredient ;
};


export const deleteIngredient = async (req) => {
  const { id } = req.params; 

 

  const ingredient=await Ingredient.findByIdAndDelete(id);
  if (!ingredient) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found
    );
  }



  return {
    message: Message?.deletedSuccessfully,
    ingredientId: id,
  };
};

export const getIngredients = async () => {
  const ingredients = await Ingredient.find(); 
  return ingredients;
};

export const updateIngredient = async (id, updatedData) => {
  
  const ingredient = await Ingredient.findByIdAndUpdate(id, updatedData, { new: true });

  if (!ingredient) {
    throw new CustomError(
      statusCodes?.notFound,
      "Ingredient not found",
      errorCodes?.not_found,
    );
  }

  return ingredient;
};


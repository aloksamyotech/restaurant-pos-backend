import * as ingredientService from "../services/ingredient.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addIngredient  = async (req, res, next) => {
  const ingredientData = await ingredientService.addIngredient(req, res, next);
  res.status(statusCodes?.created).send(ingredientData);
};

const deleteIngredient  = async (req, res, next) => {
  const ingredientData = await ingredientService.deleteIngredient(req, res, next);
  res.status(statusCodes?.ok).send(ingredientData);
};

const getIngredients = async  (req, res, next) => {
  const ingredients = await ingredientService.getIngredients(req, res, next); 
  res.status(statusCodes?.ok).send(ingredients); 
};

const updateIngredient = async (req, res, next) => {
  const { id } = req.params; 
  const updatedData = req.body; 

  const updatedIngredient = await ingredientService.updateIngredient(id, updatedData);

  res.status(statusCodes?.ok).send(updatedIngredient); 
};




export default {
    addIngredient,
    deleteIngredient,
    getIngredients,
    updateIngredient
    
  
};

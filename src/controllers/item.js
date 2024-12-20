import * as itemService from "../services/item.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addItem  = async (req, res, next) => {
  const itemData = await itemService.addItem(req, res, next);
  res.status(statusCodes?.created).send(itemData);
};

const deleteItem  = async (req, res, next) => {
  const itemData = await itemService.deleteItem(req, res, next);
  res.status(statusCodes?.ok).send(itemData);
};

const getItem = async  (req, res, next) => {
  const item = await itemService.getItem(req, res, next); 
  res.status(statusCodes?.ok).send(item); 
};

const updateItem = async (req, res, next) => {
  const { id } = req.params; 
  const updatedData = req.body; 

  const updatedItem = await itemService.updateItem(id, updatedData);

  res.status(statusCodes?.ok).send(updatedItem); 
};




export default {
    addItem,
    deleteItem,
    getItem,
    updateItem
    
  
};

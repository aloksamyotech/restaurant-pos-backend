import * as expenseTypeService from "../services/expenseType.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";

const addExpenseType = async (req, res, next) => {
  const expenseTypeData = await expenseTypeService.addExpenseType(req);
  res.status(statusCodes?.created).send(expenseTypeData);
};

const softDeleteExpenseType = async (req, res, next) => {
  const expenseTypeData = await expenseTypeService.softDeleteExpenseType(req);
  res.status(statusCodes?.ok).send(expenseTypeData);
};

const getExpenseTypes = async (req, res, next) => {
  const expenseTypes = await expenseTypeService.getExpenseTypes();
  res.status(statusCodes?.ok).send(expenseTypes);
};

const updateExpenseType = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedExpenseType = await expenseTypeService.updateExpenseType(id, updatedData);
  res.status(statusCodes?.ok).send(updatedExpenseType);
};

export default {
  addExpenseType,
  softDeleteExpenseType,
  getExpenseTypes,
  updateExpenseType,
};

import * as expenseService from "../services/expense.js";
import { statusCodes } from "../core/common/constant.js";

const addExpense = async (req, res, next) => {
  const expenseData = await expenseService.addExpense(req, res, next);
  res.status(statusCodes?.created).send(expenseData);
};

const deleteExpense = async (req, res, next) => {
  const expenseData = await expenseService.deleteExpense(req, res, next);
  res.status(statusCodes?.ok).send(expenseData);
};

const getExpenses = async (req, res, next) => {
  const expenses = await expenseService.getExpenses(req, res, next);
  res.status(statusCodes?.ok).send(expenses);
};

const updateExpense = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedExpense = await expenseService.updateExpense(id, updatedData);
  res.status(statusCodes?.ok).send(updatedExpense);
};

export default {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
};

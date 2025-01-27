import { Expense } from "../models/expense.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addExpense = async (req) => {
  const { name, desc, amount, expenseNameId } = req.body;

  const expense = await Expense.create({
    name,
    desc,
    amount,
    expenseNameId,
  });

  const createdExpense = await Expense.findById(expense._id);

  if (!createdExpense) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdExpense;
};

export const deleteExpense = async (req) => {
  const { id } = req.params;

  const expense = await Expense.findByIdAndUpdate(
    id,
    { active: false },
    { new: true },
  );

  if (!expense) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    expenseId: id,
  };
};

export const getExpenses = async () => {
  const expenses = await Expense.find({ active: true })
    .populate("expenseNameId", "expenseName")
    .sort({ createdAt: -1 });

  return expenses;
};

export const updateExpense = async (id, updatedData) => {
  const expense = await Expense.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!expense) {
    throw new CustomError(
      statusCodes?.notFound,
      "Expense not found",
      errorCodes?.not_found,
    );
  }

  return expense;
};

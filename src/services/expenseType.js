import { ExpenseType } from "../models/expenseType.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addExpenseType = async (req) => {
  const { expenseName, desc, available = true } = req.body;

  const isExpenseTypeAlreadyExist = await ExpenseType.findOne({
    expenseName,
    isDeleted: false,
  });

  if (isExpenseTypeAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const expenseType = await ExpenseType.create({
    expenseName,
    desc,
    available,
  });

  if (!expenseType) {
    throw new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return expenseType;
};

export const softDeleteExpenseType = async (req) => {
  const { id } = req.params;

  const expenseType = await ExpenseType.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!expenseType) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    expenseTypeId: id,
  };
};

export const getExpenseTypes = async () => {
  const expenseTypes = await ExpenseType.find({
    isDeleted: false,
    available: true,
  }).sort({ createdAt: -1 });
  return expenseTypes;
};

export const updateExpenseType = async (id, updatedData) => {
  const expenseType = await ExpenseType.findOneAndUpdate(
    { _id: id, isDeleted: false },
    updatedData,
    { new: true },
  );

  if (!expenseType) {
    throw new CustomError(
      statusCodes?.notFound,
      "ExpenseType not found",
      errorCodes?.not_found,
    );
  }

  return expenseType;
};

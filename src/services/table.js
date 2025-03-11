import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { Table } from "../models/table.js";

export const addTable = async (req) => {
  const { tableNumber, space,status } = req?.body;
  const isTableAlreadyExist = await Table.findOne({ tableNumber }).lean();
  if (isTableAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const table = await Table.create({
    tableNumber,
    status,
    space,
    
  });

  const createdItem = await Table.findById(table._id).lean();
  if (!createdItem) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }
  return createdItem;
};
export const getTable = async () => {
  const table = await Table.find().sort({ createdAt: -1 });
  return table;
};
export const deleteTable = async (req) => {
  const { id } = req.params;

  const table = await Table.findByIdAndDelete(id);
  if (!table) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    modifierId: id,
  };
};

export const updateTable = async (req) => {
  const id=req.params.id;
  const updatedData=req.body;

  const table = await Table.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!table) {
    throw new CustomError(
      statusCodes?.notFound,
      "Table not found",
      errorCodes?.not_found,
    );
  }

  return table;
};

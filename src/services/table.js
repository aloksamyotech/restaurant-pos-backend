import { errorCodes, Message, statusCodes } from "../core/common/constant";
import { Table } from "../models/table";

export const addTable = async (req) => {
  const { tableNumber, space } = req?.body;
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

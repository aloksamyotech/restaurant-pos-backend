import { Item } from "../models/item.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { log } from "console";

export const addItem = async (req) => {
  const {
    name,
    desc,
    available,
    discount,
    comment,
    rating,
    totalServing,
    cost,
    price,
    categoryId,
  } = req?.body;

  const ingredients = JSON.parse(req.body.ingredients);

  const isItemAlreadyExist = await Item.findOne({ name });

  if (isItemAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const itemImage = req.file ? `/uploads/${req.file.filename}` : null;
  const item = await Item.create({
    name,
    desc,
    available,
    itemImage,
    discount,
    comment,
    rating,
    totalServing,
    cost,
    price,
    ingredientId: ingredients,
    categoryId,
  });

  const createdItem = await Item.findById(item._id);

  if (!createdItem) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdItem;
};

export const deleteItem = async (req) => {
  const { id } = req.params;

  const item = await Item.findByIdAndDelete(id);
  if (!item) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    itemId: id,
  };
};

export const getItem = async () => {
  const item = await Item.find()
    .populate("categoryId", "categoryName")
    .populate("ingredientId", "name")
    .sort({ createdAt: -1 });

  return item;
};

export const getItemById = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }
  const item = await Item.findOne({ _id: id });

  if (!item) {
    throw new CustomError(
      statusCodes?.notFound,
      "Item not found",
      errorCodes?.not_found,
    );
  }

  return item;
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

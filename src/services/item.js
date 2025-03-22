import { Item } from "../models/item.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import XLSX from "xlsx";
import { Category } from "../models/category.js";

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
      Message?.ItemNotFound,
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

export const bulkUploadItem = async (req) => {
  const file = req?.file?.path;
  const workbook = XLSX.readFile(file);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const items = data.map((row) => ({ ...row }));
  const keysToCheck = ["name", "categoryName"];
  const checkAllKeys = items.every((obj) =>
    keysToCheck.every((key) => key in obj),
  );

  if (!checkAllKeys) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValidData,
      errorCodes?.invalid_format,
    );
  }

  const savedItems = [];

  for (const item of items) {
    try {
      const { name, desc, cost, price, categoryId, categoryName } = item;
      let category;

    
      if (categoryId) {
        category = await Category.findById(categoryId);
      }

      
      if (!category && categoryName) {
        category = await Category.findOne({ categoryName: categoryName.toLowerCase() });

        if (!category) {
          category = new Category({ categoryName: categoryName.toLowerCase() });
          await category.save();
        }
      }

      if (!category) {
        throw new CustomError(
          statusCodes?.badRequest,
          "Category not found or created",
          errorCodes?.not_found,
        );
      }
      const itemToSave = {
        name,
        desc,
        cost,
        price,
        categoryId: category._id, 
      };
      const isItemAlreadyExist = await Item.findOne({
        name: item?.name,
        isDeleted: false,
      });

      if (!isItemAlreadyExist) {
        const newItem = await Item.create(itemToSave);
        if (!newItem) {
          throw new CustomError(
            statusCodes?.badRequest,
            Message?.notCreated,
            errorCodes?.not_created,
          );
        }
        savedItems.push(newItem);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return savedItems;
};



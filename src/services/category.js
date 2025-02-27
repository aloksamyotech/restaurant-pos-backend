import { Category } from "../models/category.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import XLSX from "xlsx";

export const addCategory = async (req) => {
  const { categoryName, desc, isAvailable = true } = req.body;

  const isCategoryAlreadyExist = await Category.findOne({
    categoryName,
    isDeleted: false,
  });

  if (isCategoryAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }
  const categoryImage = req.file ? `/uploads/${req.file.filename}` : null;

  const category = await Category.create({
    categoryName,
    desc,
    isAvailable,
    categoryImage,
  });

  const createdCategory = await Category.findById(category._id);

  if (!createdCategory) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdCategory;
};

export const deleteCategory = async (req) => {
  const { id } = req.params;

  const category = await Category.findOneAndUpdate(
    { _id: id, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );
  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return {
    message: Message?.deletedSuccessfully,
    categoryId: id,
  };
};

export const getCategory = async () => {
  const category = await Category.find({
    isDeleted: false,
    isAvailable: true,
  }).sort({ createdAt: -1 });
  return category;
};

export const updateCategory = async (id, updatedData) => {
  const category = await Category.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      "Category not found",
      errorCodes?.not_found,
    );
  }

  return category;
};

export const bulkUploadCategory = async (req) => {
  const file = req?.file?.path;
  const workbook = XLSX.readFile(file);
  const sheetName = workbook.SheetNames[0];
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const categories = data.map((row) => ({
    ...row,
  }));
  const keysToCheck = ["categoryName"];
  const checkAllKeys = categories.every((obj) =>
    keysToCheck.every((key) => key in obj),
  );
  if (!checkAllKeys) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValidData,
      errorCodes?.invalid_format,
    );
  }
  categories.map(async (category) => {
    try {
      const newCategory = await Category.create(category);
      if (!newCategory) {
        throw new CustomError(
          statusCodes?.badRequest,
          Message?.notCreated,
          errorCodes?.not_created,
        );
      }
    } catch (error) {
      console.log(error);
    }
  });
  return;
};

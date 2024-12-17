import * as modifierService from "../services/modifier.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const addModifier = async (req, res, next) => {
  const modifierData = await modifierService.addModifier(req, res, next);
  res.status(statusCodes?.created).send(modifierData);
};

const deleteModifier = async (req, res, next) => {
  const modifierData = await modifierService.deleteModifier(req, res, next);
  res.status(statusCodes?.ok).send(modifierData);
};

const getModifiers = async (req, res, next) => {
  const modifiers = await modifierService.getModifiers(req, res, next);
  res.status(statusCodes?.ok).send(modifiers);
};

const updateModifier = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedModifier = await modifierService.updateModifier(id, updatedData);
  res.status(statusCodes?.ok).send(updatedModifier);
};

export default {
  addModifier,
  deleteModifier,
  getModifiers,
  updateModifier,
};

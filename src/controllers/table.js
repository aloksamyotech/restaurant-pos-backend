import { statusCodes } from "../core/common/constant.js";
import * as tableService from "../services/table.js";

const addTable = async (req, res) => {
  const tableData = await tableService.addTable(req);
  res.status(statusCodes?.created).send(tableData);
};

const updateTable = async (req, res) => {
  const tableData = await tableService.updateTable(req);
  res.status(statusCodes?.created).send(tableData);
};
const getTable = async (req, res, next) => {
  const tableData = await tableService.getTable(req, res, next);
  res.status(statusCodes?.ok).send(tableData);
};
const deleteTable = async (req, res, next) => {
  const tableData = await tableService.deleteTable(req, res, next);
  res.status(statusCodes?.ok).send(tableData);
};

export default {
  addTable,
  updateTable,
  getTable,
  deleteTable
};

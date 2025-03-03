
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

export default {
    addTable,
    updateTable
};
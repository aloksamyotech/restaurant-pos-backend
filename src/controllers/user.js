import * as userService from "../services/user.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";
import { log } from "console";

const addEmployee = async (req, res, next) => {
  const userData = await userService.addEmployee(req, res, next);
  res.status(statusCodes?.created).send(userData);
};

const loginEmployee = async (req, res, next) => {
  const data = await userService.loginEmployee(req, res, next);
  res
    .status(statusCodes?.ok)

    .send({
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      loginEmployee: data?.loginEmployee,
    });
};

const deleteEmployee = async (req, res, next) => {
  const employeeData = await userService.deleteEmployee(req, res, next);
  res.status(statusCodes?.ok).send(employeeData);
};

const getEmployee = async (req, res, next) => {
  const employee = await userService.getEmployee(req, res, next);
  res.status(statusCodes?.ok).send(employee);
};
const fetchEmployee = async (req, res, next) => {
  const employee = await userService?.getEmployeebyId(req, res, next);
  res.status(statusCodes?.ok).send(employee);
};

const updateEmployee = async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body;

  const updatedEmployee = await userService.updateEmployee(id, updatedData);

  res.status(statusCodes?.ok).send(updatedEmployee);
};

const updateEmployeePermission = async (req, res, next) => {
  const updatedEmployeePermission = await userService.updateEmployeePermission(
    req,
    res,
    next,
  );

  res.status(statusCodes?.ok).send(updatedEmployeePermission);
};

export default {
  addEmployee,
  loginEmployee,
  updateEmployee,
  getEmployee,
  fetchEmployee,
  deleteEmployee,
  updateEmployeePermission,
};

import { Employee } from "../models/user.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addEmployee = async (req) => {
  const {
    firstName,
    lastName,
    role,
    email,
    password,
    gender,
    address,
    phoneNumber,
  } = req.body;

  // TODO: Validation

  const isEmployeeAlreadyExist = await Employee.findOne({ email });

  if (isEmployeeAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const employee = await Employee.create({
    firstName,
    lastName,
    role,
    email,
    password,
    gender,
    address,
    phoneNumber,
  });

  const createdEmployee = await Employee.findById(employee._id).select(
    "-password -refreshToken",
  );

  if (!createdEmployee) {
    return new CustomError(
      statusCodes?.serviceUnavailable,
      Message?.serverError,
      errorCodes?.service_unavailable,
    );
  }

  return createdEmployee;
};

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await Employee.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new CustomError(
      statusCodes?.internalServerError,
      "Something went wrong while generating refresh and access tokens.",
      errorCodes?.server_error,
    );
  }
};

export const loginEmployee = async (req) => {
  const { email, password } = req.body;

  // TODO: Validation

  const user = await Employee.findOne({ email });
  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.userNotFound,
      errorCodes?.not_found,
    );
  }

  const passwordVerify = await user.isPasswordCorrect(password);

  if (!passwordVerify) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.invalid_credentials,
    );
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  const loginEmployee = await Employee.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return {
    accessToken,
    refreshToken,
    options,
    loginEmployee,
  };
};

export const deleteEmployee = async (req) => {
  const { id } = req.params;

  const employee = await Employee.findById(id);
  if (!employee) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  await Employee.findByIdAndDelete(id);

  return {
    message: Message?.deletedSuccessfully,
    employeeId: id,
  };
};

export const getEmployee = async () => {
  const employee = await Employee.find().sort({ createdAt: -1 });
  return employee;
};
export const getEmployeebyId = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.idRequired,
      errorCodes?.id_required,
    );
  }
  const employee = await Employee.findOne({ _id: id });

  if (!employee) {
    throw new CustomError(
      statusCodes?.notFound,
      "Employee not found",
      errorCodes?.not_found,
    );
  }

  return employee;
};

export const updateEmployee = async (id, updatedData) => {
  const employee = await Employee.findByIdAndUpdate(id, updatedData, {
    new: true,
  });

  if (!employee) {
    throw new CustomError(
      statusCodes?.notFound,
      "Employee not found",
      errorCodes?.not_found,
    );
  }

  return employee;
};

export const updateEmployeePermission = async (req) => {
  const { id } = req.params;

  const { permissions } = req.body;
  if (!id || !permissions) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.bad_request,
    );
  }
  const updatedUser = await Employee.findOneAndUpdate(
    { _id: id },
    { permissions: permissions },
    { new: true },
  );
  if (!updatedUser) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notUpdate,
      errorCodes?.action_failed,
    );
  }
  return updatedUser;
};

import { User } from "../models/user.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const addEmployee = async (req) => {
  const { firstName,lastName, role, email, password,gender,address,phoneNumber } = req.body;

  // TODO: Validation

  const isEmployeeAlreadyExist = await User.findOne({ email });

  if (isEmployeeAlreadyExist) {
    throw new CustomError(
      statusCodes?.conflict,
      Message?.alreadyExist,
      errorCodes?.already_exist,
    );
  }

  const employee = await User.create({
    firstName,lastName, role, email, password,gender,address,phoneNumber
  });

  const createdEmployee = await User.findById(employee._id).select(
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
    const user = await User.findById(userId);
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

export const loginUser = async (req) => {
  const { email, password } = req.body;

  // TODO: Validation

  const user = await User.findOne({ email });
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

  const loginUser = await User.findById(user._id).select(
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
    loginUser,
  };
};

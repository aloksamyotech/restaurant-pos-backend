import * as userService from "../services/user.js";
import { Message, statusCodes } from "../core/common/constant.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import CustomError from "../utils/exception.js";

const userRegistration = async (req, res, next) => {
  const userData = await userService.registerUser(req, res, next);
  res.status(statusCodes?.created).send(userData);
};

const userLogin = async (req, res, next) => {
  const data = await userService.loginUser(req, res, next);
  res
    .status(statusCodes?.ok)

    .send({
      accessToken: data?.accessToken,
      refreshToken: data?.refreshToken,
      loginUser: data?.loginUser,
    });
};

export default {
  userRegistration,
  userLogin,
};

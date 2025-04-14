import jwt from "jsonwebtoken";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const userAuth = (req, res, next) => {
    const { authorization } = req?.headers || {}
    const token = authorization && authorization.split(' ')[1]
    const verfifyToken = process.env?.ACCESS_TOKEN_SECRET
   
    if (!token) {
      throw new CustomError(
        statusCodes?.unauthorized,
        Message?.notFound,
        errorCodes?.missing_auth_token
      )
    }
    jwt.verify(token, verfifyToken, (err, user) => {
      if (err) {
        throw new CustomError(
          statusCodes?.unauthorized,
          Message?.inValid,
          errorCodes?.invalid_authentication
        )
      }
      req.user = user?.payload 
      next()
    })
  }
   
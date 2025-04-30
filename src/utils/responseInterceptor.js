import { key } from "../core/common/constant.js";
import { encrypt, encryptResponse, encryptWithAESKey } from "../core/common/crypto.js";
import { generateRandomString } from "../core/crypto/cr.js";

const responseInterceptor = (req, res, next) => {
  const oldSend = res.json;

  res.json = (data) => {
    
if (data && data.status && data.status === "error") {
      const formattedResponse = {
        success: false,
        data: {},
        message: data.message || "Error occurred",
        error: data.errorCode || data.message || "Unknown Error",
        timestamp: new Date().toISOString(),
      };
 
      const encryptedResponseData = encryptResponse(formattedResponse);
      oldSend.call(res, encryptedResponseData);
    } else {
      const formattedResponse = {
        success: true,
        data: data || {},
        message: data.message || "Success",
        error: null,
        timestamp: new Date().toISOString(),
      };
      const encryptedResponseData = encryptResponse(formattedResponse);
      oldSend.call(res, encryptedResponseData);
    }
  };

  res.error = (error, statusCode = 500, message = "Internal Server Error") => {
    const formattedResponse = {
      success: false,
      data: {},
      message,
      error: error || message,
      timestamp: new Date().toISOString(),
    };
    const encryptedResponseData = encryptResponse(formattedResponse);
    res.status(statusCode).json(encryptedResponseData);
  };

  next();
};

export default responseInterceptor;



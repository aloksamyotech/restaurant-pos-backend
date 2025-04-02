import mongoose from "mongoose";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { Kitchen } from "../models/kitchen.js";
import CustomError from "../utils/exception.js";
import BlockedRole from "../models/email.js";
import { sendEmail } from "../core/common/nodeMailer.js";
import { Employee } from "../models/user.js";
import getChefAssignmentEmailTemplate from "../core/Template/getChefAssignmentEmailTemplate.js";

export const addKitchenOrder = async (req) => {
    let { order, table } = req?.body;
    order = new mongoose.Types.ObjectId(order);
    const kitchenOrder = await Kitchen.create({
        order: order,
        status: 'pending',
        table
    });
    const createdKitchenOrder = await Kitchen.findById(kitchenOrder._id).lean();
    if (!createdKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }
    return createdKitchenOrder;
};

export const updateKitchenOrder = async (req) => {
    const kitchenOrderId = req?.params?.id
    const { ...updatedValues } = req?.body;

const isKitchenOrder = await Kitchen.findById(kitchenOrderId);
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }
    const updatedData = await Kitchen.findOneAndUpdate({
        _id: kitchenOrderId,

    },
        updatedValues
    );
  const chefId=updatedValues?.chef;
 const chefData = await Employee.findById(chefId);
  
   
   const fetchChefData = {
      email: chefData?.email,
      name: chefData?.firstName,
      
    };
    
      const isBlocked = await BlockedRole.findOne({ role: "chef Assign" });
      if (isBlocked?.isBlocked) {
        await sendEmail(
            fetchChefData?.email,
          "Welcome to Our Company",
          "",
          getChefAssignmentEmailTemplate(fetchChefData?.name),
        );
      } else {
        console.log("Email not sent as 'client' role is blocked.");
      }

    return updatedData;
};

export const findKitchenOrderById = async (req) => {
    let kitchenOrderId = req?.params?.id

    kitchenOrderId = new mongoose.Types.ObjectId(kitchenOrderId)
    const isKitchenOrder = await Kitchen.findById(kitchenOrderId).populate("chef", "firstName").populate("order", "type");
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }

    return isKitchenOrder;
};

export const findAllKitchenOrder = async (req) => {
    const isKitchenOrder = await Kitchen.find().populate("order", "type").sort({ createdAt: -1 });
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }

    return isKitchenOrder;
};



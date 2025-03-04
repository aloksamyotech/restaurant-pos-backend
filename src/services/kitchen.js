import mongoose from "mongoose";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { Kitchen } from "../models/kitchen.js";
import CustomError from "../utils/exception.js";

export const addKitchenOrder = async (req) => {
    const { order, status } = req?.body;
    const kitchenOrder = await Kitchen.create({
        order: order,
        status: 'pending',
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
    const { ...udpatedValues } = req?.body;
    const isKitchenOrder = await Kitchen.findById(kitchenOrderId).lean();
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }
    const updatedData = await Kitchen.findOneAndUpdate({
        _id: kitchenOrderId
    }, udpatedValues);

    return updatedData;
};

export const findKitchenOrderById = async (req) => {
    let kitchenOrderId = req?.params?.id
    console.log("kitchenOrderId=====>>>>>>>",kitchenOrderId)
    kitchenOrderId = new mongoose.Types.ObjectId(kitchenOrderId)
    const isKitchenOrder = await Kitchen.findById(kitchenOrderId).lean();
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
    const isKitchenOrder = await Kitchen.find().lean();
    if (!isKitchenOrder) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }

    return isKitchenOrder;
};



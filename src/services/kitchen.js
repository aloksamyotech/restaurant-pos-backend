import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import { Kitchen } from "../models/kitchen.js";

export const addKitchenOrder = async (req) => {
    const { order } = req?.body;
    const kitchenOrder = await Kitchen.create({
        order: order,
        status: 'pending',
    });
    const createdKitchenOrder = await Kitchen.findById(kitchenOrder._id).lean();
    if (!createdItem) {
        return new CustomError(
            statusCodes?.serviceUnavailable,
            Message?.serverError,
            errorCodes?.service_unavailable,
        );
    }
    return createdKitchenOrder;
};



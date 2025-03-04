import { statusCodes } from "../core/common/constant.js";
import * as kitchenService from "../services/kitchen.js";

const addKitchenOrder = async (req, res) => {
    const kitchenOrderData = await kitchenService.addKitchenOrder(req);
    res.status(statusCodes?.created).send(kitchenOrderData);
};

const updateKitchenOrderById = async (req, res) => {
    const kitchenOrderData = await kitchenService.updateKitchenOrder(req);
    res.status(statusCodes?.created).send(kitchenOrderData);
};

export default {
    addKitchenOrder,
    updateKitchenOrderById
};

import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();


import { orderController } from "../controllers/controllers.js";


router.post("/addOrder", asyncHandler(orderController.addOrder));

router.delete("/deleteOrder/:id", asyncHandler(orderController.deleteOrder));
router.get("/getOrders/", asyncHandler(orderController.getOrder));
router.get("/fetchOrder/:id", asyncHandler(orderController.fetchOrder));
router.put("/updateOrder/:id", asyncHandler(orderController.updateOrder));



export default router;

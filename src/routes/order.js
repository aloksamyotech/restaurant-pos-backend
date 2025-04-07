import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

import { orderController } from "../controllers/controllers.js";

router.post("/addOrder", asyncHandler(orderController.addOrder));

router.delete("/deleteOrder/:id", asyncHandler(orderController.deleteOrder));
router.get("/getOrders/", asyncHandler(orderController.getOrder));
router.get("/getTotalQty/", asyncHandler(orderController.getTotalQty));
router.get("/getTotalSales/", asyncHandler(orderController.getTotalSales));
router.get("/fetchOrder/:id", asyncHandler(orderController.fetchOrder));
router.get(
  "/getorderbycustomerid/:id",
  asyncHandler(orderController.getOrderByCustomerId),
);
router.put("/updateOrder/:id", asyncHandler(orderController.updateOrder));
router.put("/updateOrderStatus/:id", asyncHandler(orderController.updateOrderStatus));

export default router;

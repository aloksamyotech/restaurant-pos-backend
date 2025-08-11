import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import { orderController } from "../controllers/controllers.js";

router.post("/addOrder", asyncHandler(orderController.addOrder));
router.post("/placeOrder", asyncHandler(orderController.placeOrder));
router.delete("/deleteOrder/:id", 
  asyncHandler(userAuth),
  asyncHandler(orderController.deleteOrder));
router.get("/getOrders/", 
  asyncHandler(userAuth),
  asyncHandler(orderController.getOrder));
router.get("/getTotalQty/", 
  asyncHandler(userAuth),
  asyncHandler(orderController.getTotalQty));
router.get("/getTotalSales/",
  asyncHandler(userAuth),
  asyncHandler(orderController.getTotalSales));
router.get("/fetchOrder/:id",
  asyncHandler(userAuth),
  asyncHandler(orderController.fetchOrder));
router.get(
  "/getorderbycustomerid/:id",
  asyncHandler(userAuth),
  asyncHandler(orderController.getOrderByCustomerId),
);
router.put("/updateOrder/:id",
  asyncHandler(userAuth),
  asyncHandler(orderController.updateOrder));
router.put("/updateOrderStatus/:id", 
  asyncHandler(userAuth),
  asyncHandler(orderController.updateOrderStatus));

export default router;

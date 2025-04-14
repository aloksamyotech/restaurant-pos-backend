import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import { paymentController } from "../controllers/controllers.js";

router.post("/addPayment",
  asyncHandler(userAuth),
  asyncHandler(paymentController.addPayment));

router.delete(
  "/deletePayment/:id",
  asyncHandler(userAuth),
  asyncHandler(paymentController.deletePayment),
);
router.get("/getPayments/",
  asyncHandler(userAuth),
  asyncHandler(paymentController.getPayment));
router.get("/fetchPayment/:id",
  asyncHandler(userAuth),
  asyncHandler(paymentController.fetchPayment));
router.put("/updatePayment/:id",
  asyncHandler(userAuth),
  asyncHandler(paymentController.updatePayment));

export default router;

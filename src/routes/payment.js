import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();


import { paymentController } from "../controllers/controllers.js";


router.post("/addPayment", asyncHandler(paymentController.addPayment));

router.delete("/deletePayment/:id", asyncHandler(paymentController.deletePayment));
router.get("/getPayments/", asyncHandler(paymentController.getPayment));
router.get("/fetchPayment/:id", asyncHandler(paymentController.fetchPayment));
router.put("/updatePayment/:id", asyncHandler(paymentController.updatePayment));



export default router;

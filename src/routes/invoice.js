import { Router } from "express";
import { upload } from "../middlewares/multerConfig.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import { invoiceController } from "../controllers/controllers.js";

router.post("/addInvoice",
  asyncHandler(userAuth),
  upload.single("file"), asyncHandler(invoiceController.addInvoice));
router.get("/fetchInvoice/:id", 
  asyncHandler(userAuth),
  asyncHandler(invoiceController.fetchInvoice));
router.get(
  "/fetchInvoiceByOrderId/:id",
  asyncHandler(userAuth),
  asyncHandler(invoiceController.fetchInvoiceByOrderId),
);

export default router;

import { Router } from "express";
import { upload } from "../middlewares/multerConfig.js";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

import { invoiceController } from "../controllers/controllers.js";

router.post("/addInvoice", upload.single("file"), asyncHandler(invoiceController.addInvoice));
router.get("/fetchInvoice/:id", asyncHandler(invoiceController.fetchInvoice));
router.get(
  "/fetchInvoiceByOrderId/:id",
  asyncHandler(invoiceController.fetchInvoiceByOrderId),
);

export default router;

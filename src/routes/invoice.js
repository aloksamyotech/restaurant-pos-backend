import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();


import { invoiceController } from "../controllers/controllers.js";


router.post("/addInvoice", asyncHandler(invoiceController.addInvoice));
router.get("/fetchInvoice/:id", asyncHandler(invoiceController.fetchInvoice));




export default router;

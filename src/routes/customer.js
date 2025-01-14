import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

import { customerController } from "../controllers/controllers.js";

router.post("/addCustomer", asyncHandler(customerController.addCustomer));

router.delete(
  "/deleteCustomer/:id",
  asyncHandler(customerController.deleteCustomer),
);
router.get("/getCustomers/", asyncHandler(customerController.getCustomer));
router.get(
  "/fetchCustomer/:id",
  asyncHandler(customerController.fetchCustomer),
);
router.put(
  "/updateCustomer/:id",
  asyncHandler(customerController.updateCustomer),
);

export default router;

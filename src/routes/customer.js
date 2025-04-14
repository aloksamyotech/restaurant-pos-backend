import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import { customerController } from "../controllers/controllers.js";

router.post("/addCustomer", 
  asyncHandler(userAuth),
  asyncHandler(customerController.addCustomer));

router.delete(
  "/deleteCustomer/:id",
  asyncHandler(userAuth),
  asyncHandler(customerController.deleteCustomer),
);
router.get("/getCustomers/", 
  asyncHandler(userAuth),
  asyncHandler(customerController.getCustomer));
router.get(
  "/getCustomerByPhone/:id",
  asyncHandler(userAuth),
  asyncHandler(customerController.getCustomerByPhone),
);
router.get(
  "/fetchCustomer/:id",
  asyncHandler(userAuth),
  asyncHandler(customerController.fetchCustomer),
);
router.put(
  "/updateCustomer/:id",
  asyncHandler(userAuth),
  asyncHandler(customerController.updateCustomer),
);

export default router;

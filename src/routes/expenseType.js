import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

// controller
import { expenseTypeController } from "../controllers/controllers.js";

router.post(
  "/addExpenseType",
  asyncHandler(userAuth),
  asyncHandler(expenseTypeController.addExpenseType),
);

router.delete(
  "/softDeleteExpenseType/:id",
  asyncHandler(userAuth),
  asyncHandler(expenseTypeController.softDeleteExpenseType),
);

router.get(
  "/getExpenseTypes",
  asyncHandler(userAuth),
  asyncHandler(expenseTypeController.getExpenseTypes),
);

router.put(
  "/updateExpenseType/:id",
  asyncHandler(userAuth),
  asyncHandler(expenseTypeController.updateExpenseType),
);

export default router;

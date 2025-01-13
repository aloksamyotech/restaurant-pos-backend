import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { expenseTypeController } from "../controllers/controllers.js";

router.post(
  "/addExpenseType",
  asyncHandler(expenseTypeController.addExpenseType),
);

router.delete(
  "/softDeleteExpenseType/:id",
  asyncHandler(expenseTypeController.softDeleteExpenseType),
);

router.get(
  "/getExpenseTypes",
  asyncHandler(expenseTypeController.getExpenseTypes),
);

router.put(
  "/updateExpenseType/:id",
  asyncHandler(expenseTypeController.updateExpenseType),
);

export default router;

import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

import expenseController from "../controllers/expense.js";

router.post("/addExpense", asyncHandler(expenseController.addExpense));
router.delete(
  "/deleteExpense/:id",
  asyncHandler(expenseController.deleteExpense),
);
router.get("/getExpenses", asyncHandler(expenseController.getExpenses));
router.put("/updateExpense/:id", asyncHandler(expenseController.updateExpense));

export default router;

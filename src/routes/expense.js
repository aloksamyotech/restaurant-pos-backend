import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import expenseController from "../controllers/expense.js";

router.post("/addExpense", 
  asyncHandler(userAuth),
  asyncHandler(expenseController.addExpense));
router.delete(
  "/deleteExpense/:id",
  asyncHandler(userAuth),
  asyncHandler(expenseController.deleteExpense),
);
router.get("/getExpenses", 
  asyncHandler(userAuth),
  asyncHandler(expenseController.getExpenses));
  
router.put("/updateExpense/:id", 
  asyncHandler(userAuth),
  asyncHandler(expenseController.updateExpense));

export default router;

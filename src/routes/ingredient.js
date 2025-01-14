import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { ingredientController } from "../controllers/controllers.js";

router.post("/addIngredient", asyncHandler(ingredientController.addIngredient));

router.delete(
  "/deleteIngredient/:id",
  asyncHandler(ingredientController.deleteIngredient),
);
router.get(
  "/getIngredients/",
  asyncHandler(ingredientController.getIngredients),
);
router.put(
  "/updateIngredient/:id",
  asyncHandler(ingredientController.updateIngredient),
);

export default router;

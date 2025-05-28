import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

// controller
import { ingredientController } from "../controllers/controllers.js";

router.post("/addIngredient", 
  asyncHandler(userAuth),
  asyncHandler(ingredientController.addIngredient));

router.delete(
  "/deleteIngredient/:id",
  asyncHandler(userAuth),
  asyncHandler(ingredientController.deleteIngredient),
);
router.get(
  "/getIngredients/",
  asyncHandler(userAuth),
  asyncHandler(ingredientController.getIngredients),
);
router.put(
  "/updateIngredient/:id",
  asyncHandler(userAuth),
  asyncHandler(ingredientController.updateIngredient),
);

export default router;

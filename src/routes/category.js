import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { categoryController } from "../controllers/controllers.js";


router.post("/addCategory", asyncHandler(categoryController.addCategory));

router.delete("/deleteCategory/:id", asyncHandler(categoryController.deleteCategory));
router.get("/getCategory/", asyncHandler(categoryController.getCategory));
router.put("/updateCategory/:id", asyncHandler(categoryController.updateCategory));



export default router;

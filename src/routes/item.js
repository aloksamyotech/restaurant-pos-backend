import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { itemController } from "../controllers/controllers.js";


router.post("/addItem", asyncHandler(itemController.addItem));

router.delete("/deleteItem/:id", asyncHandler(itemController.deleteItem));
router.get("/getItem/", asyncHandler(itemController.getItem));
router.put("/updateItem/:id", asyncHandler(itemController.updateItem));



export default router;

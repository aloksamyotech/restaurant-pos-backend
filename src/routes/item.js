import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();


import { itemController } from "../controllers/controllers.js";


router.post("/addItem", asyncHandler(itemController.addItem));

router.delete("/deleteItem/:id", asyncHandler(itemController.deleteItem));
router.get("/getItems/", asyncHandler(itemController.getItem));
router.put("/updateItem/:id", asyncHandler(itemController.updateItem));



export default router;

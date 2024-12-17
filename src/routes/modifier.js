import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { modifierController } from "../controllers/controllers.js";

router.post("/addModifier", asyncHandler(modifierController.addModifier));

router.delete("/deleteModifier/:id", asyncHandler(modifierController.deleteModifier));
router.get("/getModifiers/", asyncHandler(modifierController.getModifiers));
router.put("/updateModifier/:id", asyncHandler(modifierController.updateModifier));

export default router;

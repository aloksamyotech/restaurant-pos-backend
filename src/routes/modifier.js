import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();


import { modifierController } from "../controllers/controllers.js";

router.get("/getModifiers/", asyncHandler(modifierController.getModifiers));
router.post("/addModifier", asyncHandler(modifierController.addModifier));
router.put("/updateModifier/:id", asyncHandler(modifierController.updateModifier));
router.delete("/deleteModifier/:id", asyncHandler(modifierController.deleteModifier));



export default router;

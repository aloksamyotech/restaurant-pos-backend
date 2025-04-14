import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import { modifierController } from "../controllers/controllers.js";

router.get("/getModifiers/", 
  asyncHandler(userAuth),
  asyncHandler(modifierController.getModifiers));
router.post("/addModifier", 
  asyncHandler(userAuth),
  asyncHandler(modifierController.addModifier));
router.put(
  "/updateModifier/:id",
  asyncHandler(userAuth),
  asyncHandler(modifierController.updateModifier),
);
router.delete(
  "/deleteModifier/:id",
  asyncHandler(userAuth),
  asyncHandler(modifierController.deleteModifier),
);

export default router;

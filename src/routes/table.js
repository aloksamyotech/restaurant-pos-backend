import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();
import { tableController } from "../controllers/controllers.js";

// table routes 

router.post("/addTable", asyncHandler(tableController.addTable));

export default router;

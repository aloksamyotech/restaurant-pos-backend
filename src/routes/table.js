import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();
import { tableController } from "../controllers/controllers.js";

// table routes 

router.post("/addTable", asyncHandler(tableController.addTable));
router.get("/getTable", asyncHandler(tableController.getTable));
router.put("/updateTable/:id",asyncHandler(tableController.updateTable));
router.delete("/deleteTable/:id",asyncHandler(tableController.deleteTable));

export default router;

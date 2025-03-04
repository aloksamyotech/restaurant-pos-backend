import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();
import { kitchenController } from "../controllers/controllers.js";

// table routes 

router.post("/addKitchenOrder", asyncHandler(kitchenController.addKitchenOrder));
router.patch("/updateKitchenOrder/:id", asyncHandler(kitchenController.updateKitchenOrderById));

export default router;

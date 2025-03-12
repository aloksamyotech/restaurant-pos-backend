import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();
import { kitchenController } from "../controllers/controllers.js";

// table routes 

router.post("/addKitchenOrder", asyncHandler(kitchenController.addKitchenOrder));
router.patch("/updateKitchenOrder/:id", asyncHandler(kitchenController.updateKitchenOrderById));
router.get("/findAllKitchenOrder", asyncHandler(kitchenController.findAllKitchenOrder));
router.get("/findAllKitchenOrderById/:id", asyncHandler(kitchenController.findKitchenOrderById));
router.get("/findAllKitchenOrderById/:id", asyncHandler(kitchenController.findKitchenOrderById));

export default router;

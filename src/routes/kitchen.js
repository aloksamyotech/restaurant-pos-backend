import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();
import { kitchenController } from "../controllers/controllers.js";

// table routes 

router.post("/addKitchenOrder", 
    asyncHandler(userAuth),
    asyncHandler(kitchenController.addKitchenOrder));
router.patch("/updateKitchenOrder/:id", 
    asyncHandler(userAuth),
    asyncHandler(kitchenController.updateKitchenOrderById));
router.get("/findAllKitchenOrder", 
    asyncHandler(userAuth),
    asyncHandler(kitchenController.findAllKitchenOrder));
router.get("/findAllKitchenOrderById/:id", 
    asyncHandler(userAuth),
    asyncHandler(kitchenController.findKitchenOrderById));
router.get("/findAllKitchenOrderById/:id", 
    asyncHandler(userAuth),
    asyncHandler(kitchenController.findKitchenOrderById));
router.patch("/updateOrderStatus/:id", 
    asyncHandler(userAuth),
    asyncHandler(kitchenController.updateOrderStatusById));

export default router;

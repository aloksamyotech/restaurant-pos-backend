import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();
import { tableController } from "../controllers/controllers.js";

// table routes 

router.post("/addTable",
    asyncHandler(userAuth),
    asyncHandler(tableController.addTable));
router.get("/getTable", 
    asyncHandler(userAuth),
    asyncHandler(tableController.getTable));
router.put("/updateTable/:id",
    asyncHandler(userAuth),
    asyncHandler(tableController.updateTable));
router.delete("/deleteTable/:id",
    asyncHandler(userAuth),
    asyncHandler(tableController.deleteTable));

export default router;

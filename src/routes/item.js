import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { upload } from "../middlewares/multerConfig.js";
import {userAuth} from '../middlewares/tokenFuction.js';

const router = Router();

import { itemController } from "../controllers/controllers.js";

router.post(
  "/addItem",
  asyncHandler(userAuth),
  upload.single("itemImage"),
  asyncHandler(itemController.addItem),
);

router.delete("/deleteItem/:id", 
  asyncHandler(userAuth),
  asyncHandler(itemController.deleteItem));
router.get("/getItems/", 
  asyncHandler(userAuth),
  asyncHandler(itemController.getItem));
router.get("/fetchItem/:id", 
  asyncHandler(userAuth),
  asyncHandler(itemController.fetchItem));
router.put(
  "/updateItem/:id",
  asyncHandler(userAuth),
  upload.single("itemImage"),
  asyncHandler(itemController.updateItem),
);
router.post(
  "/bulkUploadItem",
  asyncHandler(userAuth),
  upload.single("file"),
  asyncHandler(itemController.bulkUploadItem),
);

export default router;

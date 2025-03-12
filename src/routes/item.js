import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { upload } from "../middlewares/multerConfig.js";

const router = Router();

import { itemController } from "../controllers/controllers.js";

router.post(
  "/addItem",
  upload.single("itemImage"),
  asyncHandler(itemController.addItem),
);

router.delete("/deleteItem/:id", asyncHandler(itemController.deleteItem));
router.get("/getItems/", asyncHandler(itemController.getItem));
router.get("/fetchItem/:id", asyncHandler(itemController.fetchItem));
router.put(
  "/updateItem/:id",
  upload.single("itemImage"),
  asyncHandler(itemController.updateItem),
);

export default router;

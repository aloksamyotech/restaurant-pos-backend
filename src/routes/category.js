import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { upload } from "../middlewares/multerConfig.js";
import {userAuth} from '../middlewares/tokenFuction.js';
const router = Router();

import { categoryController } from "../controllers/controllers.js";

router.post(
  "/addCategory",
  asyncHandler(userAuth),
  upload.single("categoryImage"),
  asyncHandler(categoryController.addCategory),
);

router.delete(
  "/deleteCategory/:id",
  asyncHandler(userAuth),
  asyncHandler(categoryController.deleteCategory),
);

router.get("/getCategory/", 
  asyncHandler(userAuth),
  asyncHandler(categoryController.getCategory));

router.put(
  "/updateCategory/:id",
  asyncHandler(userAuth),
  upload.single("categoryImage"),
  asyncHandler(categoryController.updateCategory),
);
router.post(
  "/bulkUploadCategory",
  asyncHandler(userAuth),
  upload.single("file"),
  asyncHandler(categoryController.bulkUploadCategory),
);

export default router;

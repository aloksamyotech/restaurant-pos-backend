import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
import { upload } from "../middlewares/multerConfig.js";
const router = Router();

import { categoryController } from "../controllers/controllers.js";

router.post(
  "/addCategory",
  upload.single("categoryImage"),
  asyncHandler(categoryController.addCategory),
);

router.delete(
  "/deleteCategory/:id",
  asyncHandler(categoryController.deleteCategory),
);

router.get("/getCategory/", asyncHandler(categoryController.getCategory));

router.put(
  "/updateCategory/:id",
  upload.single("categoryImage"),
  asyncHandler(categoryController.updateCategory),
);
router.post(
  "/bulkUploadCategory",
  upload.single("file"),
  asyncHandler(categoryController.bulkUploadCategory),
);

export default router;

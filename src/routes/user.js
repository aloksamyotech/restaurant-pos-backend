import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { userController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JwtAuth.js";
import { upload } from "../middlewares/multerConfig.js";

router.post("/login", asyncHandler(userController.loginEmployee));
router.get("/getEmployees/", asyncHandler(userController.getEmployee));
router.get("/fetchEmployee/:id", asyncHandler(userController.fetchEmployee));
router.post("/addEmployee", asyncHandler(userController.addEmployee));
router.put("/updateEmployee/:id", asyncHandler(userController.updateEmployee));
router.put(
  "/updateEmployeePermissions/:id",
  asyncHandler(userController.updateEmployeePermission),
);
router.put("/updateLogo",upload.single("image"),jwtMiddleware, asyncHandler(userController.updateLogo));
router.put("/updatePassword",jwtMiddleware, asyncHandler(userController.updatePassword));
router.delete(
  "/deleteEmployee/:id",
  asyncHandler(userController.deleteEmployee),
);

export default router;

import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();
import {userAuth} from '../middlewares/tokenFuction.js';

// controller
import { userController } from "../controllers/controllers.js";
import { jwtMiddleware } from "../middlewares/JwtAuth.js";
import { upload } from "../middlewares/multerConfig.js";

router.post("/login", asyncHandler(userController.loginEmployee));
router.get("/getEmployees/", 
  asyncHandler(userAuth),
  asyncHandler(userController.getEmployee));
router.get("/fetchEmployee/:id", 
  asyncHandler(userAuth),
  asyncHandler(userController.fetchEmployee));
router.post("/addEmployee",
  asyncHandler(userAuth),
  asyncHandler(userController.addEmployee));
router.put("/updateEmployee/:id", 
  asyncHandler(userAuth),
  asyncHandler(userController.updateEmployee));
router.put(
  "/updateEmployeePermissions/:id",
  asyncHandler(userAuth),
  asyncHandler(userController.updateEmployeePermission),
);
router.put("/updateLogo",upload.single("image"),jwtMiddleware, asyncHandler(userController.updateLogo));
router.put("/updatePassword",jwtMiddleware, asyncHandler(userController.updatePassword));
router.delete(
  "/deleteEmployee/:id",
  asyncHandler(userAuth),
  asyncHandler(userController.deleteEmployee),
);

export default router;

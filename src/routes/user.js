import { Router } from "express";
import { asyncHandler } from "../utils/asyncWrapper.js";
const router = Router();

// controller
import { userController } from "../controllers/controllers.js";

router.post("/login", asyncHandler(userController.loginEmployee));
router.get("/getEmployees/", asyncHandler(userController.getEmployee));
router.post("/addEmployee", asyncHandler(userController.addEmployee));
router.put("/updateEmployee/:id", asyncHandler(userController.updateEmployee));
router.delete(
  "/deleteEmployee/:id",
  asyncHandler(userController.deleteEmployee),
);

export default router;

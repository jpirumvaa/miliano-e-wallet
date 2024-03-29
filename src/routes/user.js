import Router from "express";
import UserController from "../controller/User.js";
import {
  hashSignupData,
  setActivation,
  setDisactivation,
} from "../middleware/data_manipulators/user.js";
import { userValidation } from "../middleware/validations/user.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = Router();

const userController = new UserController();

router.get("/", checkAuth.verifyUser, userController.getAll);
router.get("/:id", checkAuth.verifyUser, userController.getOne);
router.post(
  "/",
  checkAuth.verifyUser,
  userValidation,
  hashSignupData,
  userController.createOne
);
router.post("/login", userController.login);
router.post("/logout", checkAuth.verifyUser, userController.logout);
router.put(
  "/activate/:id",
  checkAuth.verifyUser,
  setActivation,
  userController.updateOne
);
router.put(
  "/disactivate/:id",
  checkAuth.verifyUser,
  setDisactivation,
  userController.updateOne
);

export default router;

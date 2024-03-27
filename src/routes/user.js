import Router from "express";
import UserController from "../controller/User.js";
import { hashSignupData } from "../middleware/hashSignupData.js";
import { userValidation } from "../middleware/validations/user.js";
import { checkAuth } from "../middleware/checkAuth.js";

const router = Router();

const userController = new UserController();

router.get("/", checkAuth.verifyUser, userController.getAll);
router.post("/", userValidation, hashSignupData, userController.createOne);
router.post("/login", userController.login);
router.post("/logout", checkAuth.verifyUser, userController.logout);
router.post("/activate", checkAuth.verifyUser, userController.activateUser);
router.post(
  "/disactivate",
  checkAuth.verifyUser,
  userController.disactivateUser
);

export default router;

import Router from "express";
import UserController from "../controller/User.js";

const router = Router();

const userController = new UserController();

router.get("/", userController.getAll);
router.post("/", userController.createOne);
router.post("/login", userController.login);

export default router;

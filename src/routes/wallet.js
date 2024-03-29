import Router from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import WalletController from "../controller/Wallet.js";
import {
  updateWalletValidation,
  walletValidation,
} from "../middleware/validations/wallet.js";
import { addWalletCreationData } from "../middleware/data_manipulators/wallet.js";

const router = Router();

const walletController = new WalletController();

router.get("/", checkAuth.verifyUser, walletController.getAll);
router.get("/:id", checkAuth.verifyUser, walletController.getOne);
router.post(
  "/",
  checkAuth.verifyUser,
  walletValidation,
  addWalletCreationData,
  walletController.createOne
);
router.put(
  "/",
  checkAuth.verifyUser,
  updateWalletValidation,
  walletController.updateOne
);

export default router;

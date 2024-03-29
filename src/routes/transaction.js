import Router from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import TransactionController from "../controller/Transaction.js";
import { transactValidation } from "../middleware/validations/transaction.js";
import db from "../database/models";
import { transact } from "../middleware/transact.js";

const router = Router();

const transactionController = new TransactionController(db.sequelize);

router.get("/", checkAuth.verifyUser, transactionController.getAll);
router.get("/:id", checkAuth.verifyUser, transactionController.getOne);
router.post(
  "/",
  checkAuth.verifyUser,
  transactValidation,
  transact,
  transactionController.createOne
);

export default router;

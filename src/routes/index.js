import { Router } from "express";
import user from "./user";
import wallet from "./wallet";
import transaction from "./transaction";

const router = new Router();
router.use("/user", user);
router.use("/wallet", wallet);
router.use("/transaction", transaction);

export default router;

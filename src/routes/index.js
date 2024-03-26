import { Router } from "express";
import user from "./user";

const router = new Router();
router.use("/users", user);

// router.post('/', (_req, res) => {
//   res.status(200).json({ message: 'Hello from eWallet' });
// });

export default router;

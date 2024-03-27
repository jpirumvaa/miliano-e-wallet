import fs from "fs";
import bcrypt from "bcryptjs";
import { sendMessage } from "../utils/sendMessage";

export const hashSignupData = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const hashedNid = await bcrypt.hash(req.body.nid, 10);
    req.body.password = hashedPassword;
    req.body.nid = hashedNid;
    next();
  } catch (error) {
    console.error("Error in hashPasswordMiddleware:", error);
    return sendMessage(res, 500, "Interal server error");
  }
};

import { sendMessage } from "../utils/sendMessage";

export const hashSignupData = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.roleName == "admin") {
      next();
    } else {
      return sendMessage(res, 403, "Unauthorized");
    }
  } catch (error) {
    return sendMessage(res, 500, "Interal server error", error);
  }
};

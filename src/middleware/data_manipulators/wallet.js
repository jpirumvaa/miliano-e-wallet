import generateAccountNumber from "../../utils/generateAccountNumber";
import { Wallet } from "../../database/models";
import { sendMessage } from "../../utils/sendMessage";

export const addWalletCreationData = async (req, res, next) => {
  req.body.accountNumber = generateAccountNumber();
  req.body.balance = 0;
  try {
    const userWallets = await Wallet.findAll({
      where: { userId: req.body.userId },
      raw: true,
    });
    if (userWallets?.length >= 5) {
      return sendMessage(res, 400, "User is allowed upto 5 accounts");
    }
    next();
  } catch (error) {
    return sendMessage(res, 500, "Error creating a wallet");
  }
};

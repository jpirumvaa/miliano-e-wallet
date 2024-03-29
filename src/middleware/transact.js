import db from "../database/models";

import { Wallet } from "../database/models";
import { sendMessage } from "../utils/sendMessage";

export const transact = async (req, res, next) => {
  const { originWalletId, destinationWalletId, amount } = req.body;

  const transaction = await db.sequelize.transaction();

  const originAcc = await Wallet.findByPk(originWalletId, { transaction });
  const destinationAcc = await Wallet.findByPk(destinationWalletId, {
    transaction,
  });

  if (!originAcc || !destinationAcc) {
    return sendMessage(res, 404, "Wallet not found");
  }
  if (Number(originAcc.balance) < Number(amount)) {
    return sendMessage(res, 424, "Insufficient balance");
  }

  try {
    originAcc.balance -= Number(amount);
    await originAcc.save({ transaction });

    destinationAcc.balance += Number(amount);
    await destinationAcc.save({ transaction });
    await transaction.commit();
    next();
  } catch (error) {
    await transaction.rollback();
    return sendMessage(res, 500, "Error transfering funds");
  }
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Wallet, {
        foreignKey: "originWalletId",
        as: "originWallet",
      });
      Transaction.belongsTo(models.Wallet, {
        foreignKey: "destinationWalletId",
        as: "destinationWallet",
      });
    }
  }
  Transaction.init(
    {
      originWalletId: DataTypes.INTEGER,
      destinationWalletId: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

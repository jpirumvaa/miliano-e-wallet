"use strict";
const { Model } = require("sequelize");
/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Model for wallets
 * @lastUpdated: Mar 29, 2023
 */
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations
      Wallet.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user",
      });
    }
  }
  Wallet.init(
    {
      userId: DataTypes.INTEGER,
      accountName: DataTypes.STRING,
      accountNumber: DataTypes.STRING,
      balance: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};

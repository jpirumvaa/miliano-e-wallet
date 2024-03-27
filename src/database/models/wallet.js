"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
      balance: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};

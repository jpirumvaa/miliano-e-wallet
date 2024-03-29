"use strict";
/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Model for users
 * @lastUpdated: Mar 29, 2023
 */
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // associations to go here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      nid: DataTypes.STRING,
      validated: DataTypes.BOOLEAN,
      active: DataTypes.BOOLEAN,
      roleName: DataTypes.ENUM("admin", "customer"),
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      password: DataTypes.STRING,
      profilePhoto: DataTypes.STRING,
      lastSession: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

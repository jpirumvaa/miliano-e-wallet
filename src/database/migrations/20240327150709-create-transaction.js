"use strict";
/** @type {import('sequelize-cli').Migration} */
/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: handles migration of Transactions table
 * @lastUpdated: Mar 29, 2023
 */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      originWalletId: {
        type: Sequelize.INTEGER,
      },
      destinationWalletId: {
        type: Sequelize.INTEGER,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};

/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Seeder for wallet that creates a super wallet that controllers how much money has to circulate on users' accounts
 * @lastUpdated: Mar 29, 2023
 */

const generateAccountNumber = require("../../utils/generateAccountNumber");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const acc = generateAccountNumber();

    queryInterface.bulkInsert(
      "Wallets",
      [
        {
          userId: 1,
          accountName: "Super Account",
          accountNumber: acc,
          balance: 50000000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Wallets", null, {}),
};

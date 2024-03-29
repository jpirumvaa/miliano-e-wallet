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

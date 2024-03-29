const bcrypt = require("bcryptjs");
/**
 * @author: Jean Pierre
 * @contact: jimaniru@andrew.cmu.edu
 * @description: Seeder for users that creates a super account that acts as a superadmin of the system
 * @lastUpdated: Mar 29, 2023
 */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("Password@123$#", 10);
    const hashedNid = await bcrypt.hash("119999999999999999", 10);

    queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Jean Pierre",
          nid: hashedNid,
          validated: true,
          active: true,
          roleName: "admin",
          email: "email@gmail.com",
          phoneNumber: "078888888",
          password: hashedPassword,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete("Users", null, {}),
};

"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("KARan,@,123", 14);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          user_name: "karan",
          first_name: "Karan",
          full_name: "Karan Galiya",
          email: "galiyak611@gmail.com",
          password: hashedPassword,
          google_id: null,
          profile_picture: null,
          auth_provider: "local",
          referral_code: null,
          referral_points: 0,
          status: "active",
          role: "admin",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "users",
      { email: "galiyak611@gmail.com" },
      {}
    );
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("credential_access", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      credential_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "credentials" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      access_level: {
        type: Sequelize.ENUM("Read", "Write", "Admin"),
        allowNull: false,
      },
      granted_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });

    // 🔹 Indexes
    await queryInterface.addIndex("credential_access", ["credential_id"], {
      name: "idx_credential_access_credential",
    });
    await queryInterface.addIndex("credential_access", ["user_id"], {
      name: "idx_credential_access_user",
    });
    await queryInterface.addIndex("credential_access", ["access_level"], {
      name: "idx_credential_access_level",
    });
    await queryInterface.addIndex(
      "credential_access",
      ["credential_id", "user_id"],
      {
        unique: true,
        name: "uniq_credential_user_access",
      }
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("credential_access");
  },
};

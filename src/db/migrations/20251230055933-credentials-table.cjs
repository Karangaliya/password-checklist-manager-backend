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
    await queryInterface.createTable("credentials", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      organization_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "organizations" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      project_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: { tableName: "projects" },
          key: "id",
        },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      created_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secret_encrypted: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      encrypted_metadata: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      notes: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM(
          "password",
          "api_key",
          "ssh_key",
          "token",
          "other"
        ),
        allowNull: false,
        defaultValue: "password",
      },
      status: {
        type: Sequelize.ENUM("Active", "Archived"),
        allowNull: false,
        defaultValue: "Active",
      },
      rotation_interval_days: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      last_rotated_at: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.addIndex("credentials", ["organization_id"], {
      name: "idx_credentials_org",
    });
    await queryInterface.addIndex("credentials", ["project_id"], {
      name: "idx_credentials_project",
    });
    await queryInterface.addIndex("credentials", ["created_by"], {
      name: "idx_credentials_created_by",
    });
    await queryInterface.addIndex("credentials", ["type"], {
      name: "idx_credentials_type",
    });
    await queryInterface.addIndex("credentials", ["status"], {
      name: "idx_credentials_status",
    });
    await queryInterface.addIndex("credentials", ["rotation_interval_days"], {
      name: "idx_credentials_rotation_interval",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("credentials");
  },
};

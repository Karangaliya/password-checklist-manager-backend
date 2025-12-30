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
    await queryInterface.createTable("checklist_item_status", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      checklist_item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "checklist_items" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      checklist_assignment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: { tableName: "checklist_assignments" },
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      status: {
        type: Sequelize.ENUM("Pending", "Completed"),
        allowNull: false,
        defaultValue: "Pending",
      },
      completed_at: {
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
    await queryInterface.addIndex(
      "checklist_item_status",
      ["checklist_item_id"],
      { name: "idx_item_status_item" }
    );

    await queryInterface.addIndex(
      "checklist_item_status",
      ["checklist_assignment_id"],
      { name: "idx_item_status_assignment" }
    );

    await queryInterface.addIndex("checklist_item_status", ["status"], {
      name: "idx_item_status_status",
    });

    await queryInterface.addIndex(
      "checklist_item_status",
      ["checklist_item_id", "checklist_assignment_id"],
      {
        unique: true,
        name: "uniq_item_assignment_status",
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
    await queryInterface.dropTable("checklist_item_status");
  },
};

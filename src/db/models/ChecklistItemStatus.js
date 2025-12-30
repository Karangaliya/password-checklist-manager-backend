"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ChecklistItemStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChecklistItemStatus.belongsTo(models.ChecklistItem, {
        foreignKey: "checklist_item_id",
        as: "checklist_item",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      ChecklistItemStatus.belongsTo(models.ChecklistAssignment, {
        foreignKey: "checklist_assignment_id",
        as: "checklist_assignment",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  ChecklistItemStatus.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      checklist_item_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      checklist_assignment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Pending", "Completed"),
        allowNull: false,
        defaultValue: "Pending",
      },
      completed_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "ChecklistItemStatus",
      tableName: "checklist_item_status",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return ChecklistItemStatus;
};

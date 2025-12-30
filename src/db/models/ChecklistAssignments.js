"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ChecklistAssignment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChecklistAssignment.belongsTo(models.Checklist, {
        foreignKey: "checklist_id",
        as: "checklist",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      ChecklistAssignment.belongsTo(models.User, {
        foreignKey: "assigned_to",
        as: "assignee",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      ChecklistAssignment.belongsTo(models.User, {
        foreignKey: "assigned_by",
        as: "assigner",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
      ChecklistAssignment.hasMany(models.ChecklistItemStatus, {
        foreignKey: "checklist_assignment_id",
        as: "statuses",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  ChecklistAssignment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      checklist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assigned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Active", "Completed", "Revoked"),
        allowNull: false,
        defaultValue: "Active",
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      assigned_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
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
      modelName: "ChecklistAssignment",
      tableName: "checklist_assignments",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return ChecklistAssignment;
};

"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class ChecklistCredentialMerge extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ChecklistCredentialMerge.belongsTo(models.Checklist, {
        foreignKey: "checklist_id",
        as: "checklist",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      ChecklistCredentialMerge.belongsTo(models.Credential, {
        foreignKey: "credential_id",
        as: "credential",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      ChecklistCredentialMerge.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "creator",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  ChecklistCredentialMerge.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      checklist_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      credential_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
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
      modelName: "ChecklistCredentialMerge",
      tableName: "checklist_credential_merge",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return ChecklistCredentialMerge;
};

"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Credential extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Credential.belongsTo(models.Organization, {
        foreignKey: "organization_id",
        as: "organization",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Credential.belongsTo(models.Project, {
        foreignKey: "project_id",
        as: "project",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Credential.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "created_by_user",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  Credential.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      organization_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secret_encrypted: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      encrypted_metadata: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      type: {
        type: DataTypes.ENUM(
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
        type: DataTypes.ENUM("Active", "Archived"),
        allowNull: false,
        defaultValue: "Active",
      },
      rotation_interval_days: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      last_rotated_at: {
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
      modelName: "Credential",
      tableName: "credentials",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return Credential;
};

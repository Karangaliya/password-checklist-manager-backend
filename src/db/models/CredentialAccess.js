"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class CredentialAccess extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CredentialAccess.belongsTo(models.Credential, {
        foreignKey: "credential_id",
        as: "credential",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      CredentialAccess.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      CredentialAccess.belongsTo(models.User, {
        foreignKey: "granted_by",
        as: "granted_by_user",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
    }
  }
  CredentialAccess.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      credential_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      access_level: {
        type: DataTypes.ENUM("Read", "Write", "Admin"),
        allowNull: false,
      },
      granted_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      modelName: "CredentialAccess",
      tableName: "credential_access",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return CredentialAccess;
};

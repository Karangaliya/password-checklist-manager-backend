"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Organization.belongsTo(models.User, {
        foreignKey: "owner_id",
        as: "owner",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });

      Organization.hasMany(models.OrganizationMember, {
        foreignKey: "organization_id",
        as: "members",
      });
      Organization.hasMany(models.Project, {
        foreignKey: "organization_id",
        as: "projects",
      });
      Organization.hasMany(models.Credential, {
        foreignKey: "organization_id",
        as: "credentials",
      });
      Organization.hasMany(models.Chat, {
        foreignKey: "organization_id",
        as: "chats",
      });
    }
  }
  Organization.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      logo_url: {
        type: DataTypes.STRING,
      },
      owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("Active", "Suspended"),
        defaultValue: "Active",
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
      modelName: "Organization",
      tableName: "organizations",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return Organization;
};

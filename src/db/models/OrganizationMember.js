"use strict";
import { Model } from "sequelize";
export default (sequelize, DataTypes) => {
  class OrganizationMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrganizationMember.belongsTo(models.Organization, {
        foreignKey: "organization_id",
        as: "organization",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      OrganizationMember.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  OrganizationMember.init(
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
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("Owner", "Admin", "Member", "Viewer"),
        allowNull: false,
        defaultValue: "Member",
      },
      status: {
        type: DataTypes.ENUM("Active", "Invited", "Removed"),
        allowNull: false,
        defaultValue: "Active",
      },
      joined_at: {
        type: DataTypes.DATE,
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
      modelName: "OrganizationMember",
      tableName: "organization_members",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return OrganizationMember;
};

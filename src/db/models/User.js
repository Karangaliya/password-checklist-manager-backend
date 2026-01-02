"use strict";

import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index.js` file will call this method automatically.
     */
    static associate(models) {
      // Self-referential association for referrals (optional)
      User.belongsTo(models.User, {
        foreignKey: "referred_by",
        as: "referrer",
      });

      User.hasMany(models.User, {
        foreignKey: "referred_by",
        as: "referrals",
      });
      User.hasMany(models.RefreshToken, {
        foreignKey: "user_id",
        as: "refresh_tokens",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Organization, {
        foreignKey: "owner_id",
        as: "owned_organizations",
      });
      User.hasMany(models.OrganizationMember, {
        foreignKey: "user_id",
        as: "organization_memberships",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Project, {
        foreignKey: "created_by",
        as: "created_projects",
      });
      User.hasMany(models.ProjectMember, {
        foreignKey: "user_id",
        as: "project_memberships",
        onDelete: "CASCADE",
      });
      User.hasMany(models.Checklist, {
        foreignKey: "created_by",
        as: "created_checklists",
      });
      User.hasMany(models.ChecklistAssignment, {
        foreignKey: "assigned_to",
        as: "checklist_assignments",
      });
      User.hasMany(models.ChecklistAssignment, {
        foreignKey: "assigned_by",
        as: "checklist_assigned",
      });
      User.hasMany(models.Credential, {
        foreignKey: "created_by",
        as: "created_credentials",
      });
      User.hasMany(models.CredentialAccess, {
        foreignKey: "user_id",
        as: "credential_accesses",
      });
      User.hasMany(models.CredentialAccess, {
        foreignKey: "granted_by",
        as: "credential_grants",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      google_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      auth_provider: {
        type: DataTypes.ENUM("local", "google"),
        defaultValue: "local",
        allowNull: false,
      },
      referral_code: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      referral_points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      referred_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM("active", "inactive", "banned"),
        defaultValue: "active",
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        allowNull: false,
        defaultValue: "user",
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
      modelName: "User",
      tableName: "users",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );

  return User;
};

"use strict";
const { Model } = require("sequelize");
export default (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.Organization, {
        foreignKey: "organization_id",
        as: "organization",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      Project.belongsTo(models.User, {
        foreignKey: "created_by",
        as: "creator",
        onDelete: "RESTRICT",
        onUpdate: "CASCADE",
      });
      Project.hasMany(models.ProjectMember, {
        foreignKey: "project_id",
        as: "members",
        onDelete: "CASCADE",
      });
    }
  }
  Project.init(
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      visibility: {
        type: DataTypes.ENUM("Public", "Private"),
        allowNull: false,
        defaultValue: "Private",
      },
      status: {
        type: DataTypes.ENUM("Active", "Archived"),
        allowNull: false,
        defaultValue: "Active",
      },
      created_by: {
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
      modelName: "Project",
      tableName: "projects",
      timestamps: false,
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
      paranoid: true,
      underscored: true,
    }
  );
  return Project;
};

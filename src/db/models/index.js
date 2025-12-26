"use strict";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize";
import dbConfig from "../../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

// Initialize Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  dbConfig
);

// Test connection
try {
  await sequelize.authenticate();
  console.log(`✅ Database connected: ${dbConfig.database}`);
} catch (err) {
  console.error("❌ Unable to connect to the database:", err);
}

// Dynamically import all models in this folder (except index.js itself)
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== path.basename(__filename) &&
      file.slice(-3) === ".js" &&
      !file.endsWith(".test.js")
  );

// Use dynamic `import()` for ESM instead of require()
for (const file of modelFiles) {
  const modelModule = await import(path.join(__dirname, file));
  // Each model file should export default (sequelize, DataTypes) => model
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

// Handle associations
Object.keys(db).forEach((modelName) => {
  if (typeof db[modelName].associate === "function") {
    db[modelName].associate(db);
  }
});

// Export ESM style
export { sequelize };
export default db;

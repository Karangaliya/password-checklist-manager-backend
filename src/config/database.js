import fs from "fs";
import { configDotenv } from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

configDotenv({
  path: path.resolve(__dirname, "../../.env"),
});

const dbConfig = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "mysql",
  port: process.env.DB_PORT || 19912,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync(path.resolve(__dirname, "../../src/certs/ca.pem")),
      rejectUnauthorized: true,
    },
  },
  logging: console.log,
};

export default dbConfig;

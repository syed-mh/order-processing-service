import { Dialect, Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE_SCHEMA || "OrderProcessingService",
  process.env.DATABASE_USERNAME || "root",
  process.env.DATABASE_PASSWORD || "password",
  {
    host: process.env.DATABASE_HOST || "localhost",
    dialect: (process.env.DATABASE_DIALECT as Dialect) || "mysql",
  }
);

export default sequelize;

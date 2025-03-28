require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dialect: "postgres",
    dialectModule: pg,
    logging: false, // Disable logging; set to true for debugging
  }
);

module.exports = sequelize;

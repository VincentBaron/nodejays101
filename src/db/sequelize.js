require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

// Use individual parameters for the database connection
const sequelize = new Sequelize(
  process.env.DATABASE_NAME, // Database name
  process.env.DATABASE_USER, // Username
  process.env.DATABASE_PASSWORD, // Password
  {
    host: process.env.DATABASE_HOST, // Hostname
    port: process.env.DATABASE_PORT, // Port
    dialect: "postgres",
    dialectModule: pg,
    logging: false, // Disable logging; set to true for debugging
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    },
  }
);

module.exports = sequelize;

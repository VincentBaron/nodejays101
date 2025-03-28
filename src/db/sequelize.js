require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

// Use individual parameters for the database connection
const sequelize = new Sequelize(
  process.env.POSTGRES_DATABASE, // Database name
  process.env.POSTGRES_USER, // Username
  process.env.POSTGRES_PASSWORD, // Password
  {
    host: process.env.POSTGRES_HOST, // Hostname
    port: process.env.POSTGRES_PORT, // Port
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

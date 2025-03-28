require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

// Use a connection string from the environment variable
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false, // Disable logging; set to true for debugging
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Allow self-signed certificates
    },
  },
});

module.exports = sequelize;

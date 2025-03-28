require("dotenv").config();
const { Sequelize } = require("sequelize");
const pg = require("pg");

// Use a connection string from the environment variable
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});

module.exports = sequelize;

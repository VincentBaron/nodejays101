const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const User = sequelize.define("User", {
  username: { type: DataTypes.STRING, allowNull: false },
  profilePicURL: { type: DataTypes.STRING },
  genres: { type: DataTypes.ARRAY(DataTypes.STRING) }, // Array of genre names
});

module.exports = User;

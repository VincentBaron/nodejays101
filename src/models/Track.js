const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");

const Track = sequelize.define("Track", {
  name: { type: DataTypes.STRING, allowNull: false },
  artist: { type: DataTypes.STRING, allowNull: false },
  uri: { type: DataTypes.STRING, allowNull: false },
  imgURL: { type: DataTypes.STRING },
});

module.exports = Track;

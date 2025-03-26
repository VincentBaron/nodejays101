const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const User = require("./User");
const Track = require("./Track");

const Like = sequelize.define("Like", {
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Like.belongsTo(User, { foreignKey: "userId" });
Like.belongsTo(Track, { foreignKey: "trackId" });

module.exports = Like;

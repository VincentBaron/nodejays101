const { DataTypes } = require("sequelize");
const sequelize = require("../db/sequelize");
const User = require("./User");

const Set = sequelize.define("Set", {
  name: { type: DataTypes.STRING, allowNull: false },
  link: { type: DataTypes.STRING },
  dummy: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

Set.belongsTo(User, { foreignKey: "userId" });

module.exports = Set;

const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const Idea = db.define("idea", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  category: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  description: {
        type: DataTypes.STRING(2500),
        allowNull: false,
    }

});

module.exports = Idea;
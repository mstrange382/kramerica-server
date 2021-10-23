const { DataTypes } = require("sequelize");
const db = require("../db");
// Example UserTable Build this out Need more columns add it here
const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  passwordhash: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  admin:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: true
  }

});

module.exports = User;

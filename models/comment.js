const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define('comment', {
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
    },
    owner: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

})

module.exports = Comment
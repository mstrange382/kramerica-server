const { DataTypes } = require("sequelize");
const db = require("../db");

const Comment = db.define('comment', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
      description: {
        type: DataTypes.STRING(2500),
        allowNull: false,
    },
    

})

module.exports = Comment
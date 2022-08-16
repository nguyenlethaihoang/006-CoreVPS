const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../database/sequelize')

class User extends Model {}

User.init({
    Username: {
        type: DataTypes.TEXT,
        require: true
    },
    Password: {
        type: DataTypes.TEXT
    },
    Permission:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    Email: {
        type: DataTypes.TEXT
    }
}, {sequelize, modelName:'USER'})

module.exports = User
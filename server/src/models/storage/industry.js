const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Industry extends Model {}

Industry.init({
    Name: DataTypes.TEXT,
    Code: DataTypes.TEXT
}, {sequelize, modelName:'INDUSTRY'})

module.exports = Industry
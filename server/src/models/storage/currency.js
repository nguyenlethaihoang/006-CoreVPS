const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Currency extends Model {}

Currency.init({
    Name: DataTypes.TEXT,
    Value: DataTypes.INTEGER
}, {sequelize, modelName:'CURRENCY', timestamps: false})

module.exports = Currency
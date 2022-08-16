const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CustomerType extends Model {}

CustomerType.init({
    Name: DataTypes.TEXT,
}, {sequelize, modelName:'CUSTOMERTYPE'})

module.exports = CustomerType
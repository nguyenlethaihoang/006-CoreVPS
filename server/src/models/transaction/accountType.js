const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class AccountType extends Model {}

AccountType.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'ACCOUNTTYPE'})

module.exports = AccountType
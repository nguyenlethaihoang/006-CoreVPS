const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class AccountOfficer extends Model {}

AccountOfficer.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'ACCOUNTOFFICER'})

module.exports = AccountOfficer
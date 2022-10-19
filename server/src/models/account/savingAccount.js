const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class SavingAccount extends Model {}

SavingAccount.init({
    Account:{
        type: DataTypes.TEXT,
        require: true
    },
    AccountStatus: {
        type: DataTypes.ENUM('Active', 'Closed'),
        defaultValue: 'Active'
    }
}, {sequelize, modelName:'SAVINGACCOUNT'})

module.exports = SavingAccount
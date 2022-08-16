const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CreditAccount extends Model {}

CreditAccount.init({
    Account: {
        type: DataTypes.TEXT,
        require: true
    },
    CardNumber: {
        type: DataTypes.TEXT,
        require: true
    }
}, {sequelize, modelName:'CREDITACCOUNT'})

module.exports = CreditAccount
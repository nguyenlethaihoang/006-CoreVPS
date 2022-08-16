const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class TransactionType extends Model {}

TransactionType.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'TRANSACTIONTYPE'})

module.exports = TransactionType
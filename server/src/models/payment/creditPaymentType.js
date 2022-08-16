const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CreditPaymentType extends Model {}

CreditPaymentType.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'CREDITPAYMENTTYPE'})

module.exports = CreditPaymentType
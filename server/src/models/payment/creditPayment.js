const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CreditPayment extends Model {}

CreditPayment.init({
}, {sequelize, modelName:'CREDITPAYMENT'})

module.exports = CreditPayment
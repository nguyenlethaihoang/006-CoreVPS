const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Closure extends Model {}

Closure.init({
    CloseDate: DataTypes.DATEONLY,
    Notes: DataTypes.TEXT,
    PaymentType: DataTypes.TEXT,
    // PaymentType: Cash => Account: null
    // PaymentType: intermediaryAccount
    // PaymentType: Account
    RemainingAmount: DataTypes.INTEGER
}, {sequelize, modelName:'CLOSURE'})

module.exports = Closure

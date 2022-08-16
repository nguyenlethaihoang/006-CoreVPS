const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class SalaryPayment extends Model {}

SalaryPayment.init({
    TotalDebitAmt: DataTypes.INTEGER,
    Frequency: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY,
    OrderingCust: DataTypes.TEXT
}, {sequelize, modelName:'SALARYPAYMENT'})

module.exports = SalaryPayment
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class SalaryPaymentTerm extends Model {}

SalaryPaymentTerm.init({
    Name: DataTypes.TEXT,
    Value: DataTypes.INTEGER
}, {sequelize, modelName:'SALARYPAYMENTTERM'})

module.exports = SalaryPaymentTerm
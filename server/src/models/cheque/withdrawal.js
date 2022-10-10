const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChequeWithdrawal extends Model {}

ChequeWithdrawal.init({
    
}, {sequelize, modelName:'CHEQUEWITHDRAWAL'})

module.exports = ChequeWithdrawal
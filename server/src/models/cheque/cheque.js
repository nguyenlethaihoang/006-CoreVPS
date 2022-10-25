const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Cheque extends Model {}

Cheque.init({
    ChequeID: {
        type: DataTypes.TEXT
    },
    ChequeStatus: {
        type: DataTypes.TEXT,
        defaultValue: '10 - ISSUED'
    },
    IssueDate: DataTypes.DATEONLY,
    IssuedQuantity: DataTypes.INTEGER,
    ChequeNoStart: DataTypes.INTEGER,
    ChequeNoEnd: DataTypes.INTEGER,

}, {sequelize, modelName:'CHEQUE'})

module.exports = Cheque
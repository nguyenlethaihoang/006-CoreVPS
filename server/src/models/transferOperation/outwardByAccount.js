const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class OutWardByAccount extends Model {}

OutWardByAccount.init({
    RefID: DataTypes.TEXT,
    ProductID: DataTypes.INTEGER,
    Currency: DataTypes.INTEGER,
    BenCom: DataTypes.INTEGER,
    CreditAccount: DataTypes.TEXT,
    DebitAccount: DataTypes.TEXT, // REFID 
    Amount: DataTypes.FLOAT,
    SendingName: DataTypes.TEXT,
    SendingAddress: DataTypes.TEXT,
    TaxCode: DataTypes.TEXT,
    ReceiveName: DataTypes.TEXT,
    BenAccount: DataTypes.TEXT,
    IDCard: DataTypes.TEXT,
    ReceiveIssueDate: DataTypes.DATEONLY,
    ReceiveIssuePlace: DataTypes.TEXT,
    ReceivePhone: DataTypes.TEXT,
    BankCode: DataTypes.INTEGER,
    BankName: DataTypes.TEXT,
    TellerID: DataTypes.TEXT,
    Narrative: DataTypes.TEXT,
    WaiveCharge: DataTypes.BOOLEAN
}, {sequelize, modelName:'OUTWARD_ACCOUNT'})

module.exports = OutWardByAccount
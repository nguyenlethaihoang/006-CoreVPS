const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class OutWardByCash extends Model {}

OutWardByCash.init({
    RefID: DataTypes.TEXT,
    ProductID: DataTypes.INTEGER,
    Currency: DataTypes.INTEGER,
    BenCom: DataTypes.INTEGER,
    CreditAccount: DataTypes.TEXT,
    CashAccount: DataTypes.TEXT,
    Amount: DataTypes.FLOAT,
    SendingName: DataTypes.TEXT,
    SendingAddress: DataTypes.TEXT,
    SendingPhone: DataTypes.TEXT,
    ReceiveName: DataTypes.TEXT,
    ReceiveBenAccount: DataTypes.TEXT,
    BankCode: DataTypes.INTEGER,
    IdentityCard: DataTypes.TEXT,
    ReceiveIssueDate: DataTypes.DATEONLY,
    ReceiveIssuePlace: DataTypes.TEXT,
    Teller: DataTypes.TEXT,
    Narrative1: DataTypes.TEXT,
    Narrative2: DataTypes.TEXT,
    Narrative3: DataTypes.TEXT,
    WaiveCharges: DataTypes.BOOLEAN
}, {sequelize, modelName:'OUTWARD_CASH'})

module.exports = OutWardByCash
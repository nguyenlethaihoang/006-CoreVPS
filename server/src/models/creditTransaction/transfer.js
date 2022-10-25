const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CreditTransfer extends Model {}

CreditTransfer.init({
    RefID: DataTypes.TEXT,
    DebitCurrency: DataTypes.INTEGER,
    DebitAmt: DataTypes.FLOAT,
    CustomerID: DataTypes.INTEGER,
    CustomerName: DataTypes.TEXT,
    NextTransCom: DataTypes.TEXT,
    OldBalance: DataTypes.FLOAT,
    NewBalance: DataTypes.FLOAT,
    ValueDate: DataTypes.DATEONLY,
    CreditAccount: DataTypes.TEXT,
    CreditCurrency: DataTypes.INTEGER,
    AmtCreditforCust: DataTypes.FLOAT,
    ValueDateCredit: DataTypes.DATEONLY,
    CreditCardNumber: DataTypes.TEXT,
    WaiveCharges: DataTypes.BOOLEAN,
    Narrative: DataTypes.TEXT
}, {sequelize, modelName:'CREDITTRANSFER'})

module.exports = CreditTransfer
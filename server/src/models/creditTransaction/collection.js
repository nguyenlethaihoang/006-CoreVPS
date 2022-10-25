const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CreditCollection extends Model {}

CreditCollection.init({
    RefID: DataTypes.TEXT,
    TellerID: DataTypes.TEXT,
    DebitCurrency: DataTypes.INTEGER,
    DebitAccount: DataTypes.TEXT,
    DebitAmt: DataTypes.FLOAT,
    CreditAccount: DataTypes.TEXT,
    CreditCurrency: DataTypes.INTEGER,
    DealRate: DataTypes.FLOAT,
    CreditAmount: DataTypes.FLOAT,
    CreditCardNumber: DataTypes.TEXT,
    WaiveCharges: DataTypes.BOOLEAN,
    Narrative: DataTypes.TEXT
}, {sequelize, modelName:'CREDITCOLLECTION'})

module.exports = CreditCollection
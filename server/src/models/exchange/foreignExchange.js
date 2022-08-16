const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ForeignExchange extends Model {}

ForeignExchange.init({
    CustomerName: DataTypes.TEXT,
    Address: DataTypes.TEXT,
    PhoneNo: DataTypes.TEXT,
    TellerIDst: DataTypes.TEXT,
    DebitAmtLCY: DataTypes.FLOAT,
    DebitAmtFCY: DataTypes.FLOAT,
    DebitDealRate: DataTypes.FLOAT,
    TellerIDnd: DataTypes.TEXT,
    CreditDealRate: DataTypes.FLOAT,
    AmountPaidToCust: DataTypes.FLOAT,
    Narrative: DataTypes.TEXT
}, {sequelize, modelName:'FOREIGNEXCHANGE'})

module.exports = ForeignExchange
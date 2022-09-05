const { Sequelize, Model, DataTypes, DATE } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class TransferTrans extends Model {}


//DEBIT ACCOUNT
TransferTrans.init({
    DebitAccount: DataTypes.TEXT,
    CreditAccount: DataTypes.TEXT,
    InitialAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    TransferAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }, 
    NewAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }, 
    ValueDate:{
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    DealRate: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    CreditAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    WaiveCharges: {
        type: DataTypes.BOOLEAN
    },
    Narrative: DataTypes.TEXT
}, {sequelize, modelName:'TRANSFERTRANS'})

module.exports = TransferTrans
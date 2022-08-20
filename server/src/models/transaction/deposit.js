const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class DepositTrans extends Model {}

DepositTrans.init({
    Account: DataTypes.TEXT,
    InitialAmount: DataTypes.INTEGER,
    DepositAmount: DataTypes.INTEGER,
    NewAmount: DataTypes.INTEGER,
    DealRate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    WaiveCharges: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1
    },
    Narrative: DataTypes.TEXT,
    TellerID: {
        type: DataTypes.TEXT,
        defaultValue: 'VietVictory'
    }
}, {sequelize, modelName:'DEPOSITTRANS'})

module.exports = DepositTrans
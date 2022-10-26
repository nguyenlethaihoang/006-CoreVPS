const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class WithdrawalTrans extends Model {}

WithdrawalTrans.init({
    Account: DataTypes.TEXT,
    RefID: DataTypes.TEXT,
    InitialAmount: DataTypes.INTEGER,
    WithdrawalAmount: DataTypes.INTEGER,
    PaidAmount: DataTypes.INTEGER,
    NewAmount: DataTypes.INTEGER,
    CashAccount: DataTypes.INTEGER,
    DealRate: {
        type: DataTypes.FLOAT,
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
    },
    ChargeCollectionID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'CHARGECOLLECTION',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'WITHDRAWALTRANS'})

module.exports = WithdrawalTrans
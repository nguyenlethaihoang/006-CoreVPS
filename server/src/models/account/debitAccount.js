const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class DebitAccount extends Model {}

DebitAccount.init({
    Account:{
        type: DataTypes.TEXT,
        require: true
    },
    CardNumber: {
        type: DataTypes.TEXT,
        require: true
    },
    AccountTitle: DataTypes.TEXT,
    ShortTitle: DataTypes.TEXT,
    JoinNotes: DataTypes.TEXT,
    Status: DataTypes.TEXT,
    // blocked - active - closed
    WorkingAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ActualBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }, 
    BlockedAmount: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {sequelize, modelName:'DEBITACCOUNT', paranoid: true})

module.exports = DebitAccount
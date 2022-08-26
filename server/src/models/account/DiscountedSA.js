const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class DiscountedSA extends Model {}

DiscountedSA.init({
    Amount:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    ValueDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    FinalDate: {
        type: DataTypes.DATEONLY,
        require: true
    },
    InterestRate: DataTypes.INTEGER,
    TotalIntAmount: DataTypes.INTEGER,
    WorkingAccount: DataTypes.TEXT,
    AmountLCY: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    AmountFCY:{
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    AmountLCYInterest: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    AmountFCYInterest: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    NarrativeInterest: DataTypes.TEXT,
    Narrative: DataTypes.TEXT,
    DealRate: DataTypes.FLOAT,
    Teller: DataTypes.TEXT,
    EcxhRate: DataTypes.FLOAT,
    CustBal: DataTypes.FLOAT,
    AmtPaid: DataTypes.FLOAT
}, {sequelize, modelName:'DISCOUNTED_SA'})

module.exports = DiscountedSA
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class DiscountedSA extends Model {}

DiscountedSA.init({
    Amount: DataTypes.INTEGER,
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
    AmountLCY: DataTypes.INTEGER,
    AmountFCY: DataTypes.INTEGER,
    AmountLCYInterest: DataTypes.INTEGER,
    AmountFCYInterest: DataTypes.INTEGER,
    NarrativeInterest: DataTypes.TEXT,
    Narrative: DataTypes.TEXT,
    DealRate: DataTypes.FLOAT,
    Teller: DataTypes.TEXT,
    EcxhRate: DataTypes.FLOAT,
    CustBal: DataTypes.FLOAT,
    AmtPaid: DataTypes.FLOAT
}, {sequelize, modelName:'DISCOUNTED_SA'})

module.exports = DiscountedSA
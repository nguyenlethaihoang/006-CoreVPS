const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ArrearSA extends Model {}

ArrearSA.init({
    AccountTitle: {
        type: DataTypes.TEXT,
        require: true
    },
    ShortTitle: DataTypes.TEXT,
    Notes: DataTypes.TEXT,
    MaturityDate: DataTypes.DATEONLY,
    InterestRate: DataTypes.INTEGER,
    AccountNo: DataTypes.TEXT,
    PaymentNo: DataTypes.TEXT,
    Narrative: DataTypes.TEXT,
    RolloverPR: DataTypes.BOOLEAN,
    PrincipalAmount: DataTypes.INTEGER,
    ValueDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    Teller: DataTypes.TEXT,
    Product: DataTypes.INTEGER,
    Currency: DataTypes.INTEGER,
    PaymentCurrency: DataTypes.INTEGER
}, {sequelize, modelName:'ARREAR_SA'})

module.exports = ArrearSA
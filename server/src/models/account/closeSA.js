const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ArrearPeriodicClosure extends Model {}

ArrearPeriodicClosure.init({
    CustomerID: DataTypes.INTEGER,
    CustomerName: DataTypes.TEXT,
    ValueDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY,
    OriginPrincipal: DataTypes.FLOAT,
    Principal: DataTypes.FLOAT,
    InterestRate: DataTypes.FLOAT,
    TotalAmountLCY: DataTypes.FLOAT,
    TotalAmountFCY: DataTypes.FLOAT,
    Narrative: DataTypes.TEXT,
    CustomerBalance: DataTypes.FLOAT,
    NewCustomerBalance: DataTypes.FLOAT,
    DealRate: DataTypes.FLOAT,
    TellerID: DataTypes.TEXT,
    CreditCCY: DataTypes.INTEGER
}, {sequelize, modelName:'ARREAR_PERIODIC_CLOSURE'})

module.exports = ArrearPeriodicClosure
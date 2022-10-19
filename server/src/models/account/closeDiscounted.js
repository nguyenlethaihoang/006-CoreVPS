const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class DiscountedClosure extends Model {}

DiscountedClosure.init({
    DepositNo: DataTypes.TEXT,
    CustomerID: DataTypes.INTEGER,
    CustomerName: DataTypes.TEXT,  
    ValueDate: DataTypes.DATEONLY,
    NewMatDate: DataTypes.DATEONLY,
    IntPymtMethod: DataTypes.TEXT,
    InterestBasic: DataTypes.FLOAT,
    InterestRate: DataTypes.FLOAT,
    TotalIntAmount: DataTypes.FLOAT,
    EligibleInterest: DataTypes.FLOAT,
    IntRateVDate: DataTypes.DATEONLY,
    AmountLCY: DataTypes.FLOAT,
    AmountFCY: DataTypes.FLOAT,
    Narrative: DataTypes.TEXT,
    DealRate: DataTypes.FLOAT,
    Teller: DataTypes.TEXT,
    WaiveCharge: DataTypes.BOOLEAN,
    NewCustomerBalance: DataTypes.FLOAT,
    CustomerBalance: DataTypes.FLOAT,
    CreditAccount: DataTypes.INTEGER
}, {sequelize, modelName:'DISCOUNTED_CLOSURE'})

module.exports = DiscountedClosure
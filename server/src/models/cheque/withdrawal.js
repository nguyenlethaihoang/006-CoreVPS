const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class ChequeWithdrawal extends Model {}

ChequeWithdrawal.init({
    RefID: DataTypes.TEXT,
    ChequeID: DataTypes.TEXT,
    ChequeNo: DataTypes.INTEGER,
    AmountLCY: DataTypes.INTEGER,
    OldBalance: DataTypes.INTEGER,
    NewBalance: DataTypes.INTEGER,
    ChequeType: DataTypes.ENUM('CC', 'AB'),
    TellerID: DataTypes.TEXT,
    DealRate: DataTypes.FLOAT,
    PaidAmount: DataTypes.INTEGER, //Amt Paid to Cust
    WaiveCharges: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    Narrative: DataTypes.TEXT,
    BeneficiaryName: DataTypes.TEXT,
    BeneficiaryAddress: DataTypes.TEXT,
    BeneficiaryLegalID: DataTypes.TEXT,
    IssuedDate: DataTypes.DATEONLY,
    PlaceOfIssue: DataTypes.TEXT
}, {sequelize, modelName:'CHEQUEWITHDRAWAL'})

module.exports = ChequeWithdrawal
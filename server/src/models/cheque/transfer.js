const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChequeTransfer extends Model {}

ChequeTransfer.init({
    RefID: DataTypes.TEXT,
    ChequeID: DataTypes.TEXT,
    ChequeNo: DataTypes.INTEGER,
    DebitAmount: DataTypes.INTEGER,
    OldBalance: DataTypes.INTEGER,
    NewBalance: DataTypes.INTEGER,
    ChequeType: DataTypes.ENUM('CC', 'AB'),
    ValueDate: DataTypes.DATEONLY,
    DealRate: DataTypes.FLOAT,
    CreditAccount: DataTypes.TEXT,
    PaidAmount: DataTypes.INTEGER, //Amt Paid to Cust
    WaiveCharges: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    ExposureDate: DataTypes.DATEONLY,
    Narrative: DataTypes.TEXT,
    BeneficiaryName: DataTypes.TEXT,
    BeneficiaryAddress: DataTypes.TEXT,
    BeneficiaryLegalID: DataTypes.TEXT,
    IssuedDate: DataTypes.DATEONLY,
    PlaceOfIssue: DataTypes.TEXT
}, {sequelize, modelName:'CHEQUETRANSFER'})

module.exports = ChequeTransfer
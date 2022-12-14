const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Inward extends Model {}

Inward.init({
    RefID: DataTypes.TEXT,
    Type: DataTypes.INTEGER, // 1: CashWithdrawal.Cash 2: CashWithdrawal.Account 3: TransferAccount
    ClearingID: DataTypes.TEXT,
    DebitCurrency: DataTypes.INTEGER,
    DebitAccount: DataTypes.TEXT,
    DebitAmtLCY: DataTypes.FLOAT,
    DebitAmtFCY: DataTypes.FLOAT,
    DealRate: DataTypes.FLOAT,
    CreditCurrency: DataTypes.INTEGER,
    CreditAccount: DataTypes.TEXT,
    CreditAmtLCY: DataTypes.FLOAT,
    CreditAmtFCY: DataTypes.FLOAT,
    BOName: DataTypes.TEXT,
    FOName: DataTypes.TEXT,
    LegalID: DataTypes.TEXT,
    Telephone: DataTypes.TEXT,
    IssueDate: DataTypes.DATEONLY,
    IssuePlace: DataTypes.TEXT,
    Narrative: DataTypes.TEXT
}, {sequelize, modelName:'INWARD'})

module.exports = Inward
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ForeignExchange extends Model {}

ForeignExchange.init({
    RefID: DataTypes.TEXT,
    CustomerName: DataTypes.TEXT,
    Address: DataTypes.TEXT,
    PhoneNo: DataTypes.TEXT,
    TellerIDst: DataTypes.TEXT,
    DebitAmtLCY: DataTypes.FLOAT,
    DebitAmtFCY: DataTypes.FLOAT,
    DebitDealRate: DataTypes.FLOAT,
    TellerIDnd: DataTypes.TEXT,
    CreditDealRate: DataTypes.FLOAT,
    AmountPaidToCust: DataTypes.FLOAT,
    Narrative: DataTypes.TEXT,
    ChargeCollectionID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'CHARGECOLLECTION',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'FOREIGNEXCHANGE'})

module.exports = ForeignExchange
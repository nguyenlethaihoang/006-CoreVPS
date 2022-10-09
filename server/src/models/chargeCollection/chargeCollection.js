const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollection extends Model {}

ChargeCollection.init({
    ChargeAmountLCY: DataTypes.INTEGER,
    ChargeAmountFCY: DataTypes.INTEGER,
    ValueDate: DataTypes.DATEONLY,
    DealRate: DataTypes.FLOAT,
    VatAmountLCY: DataTypes.INTEGER,
    VatAmountFCY: DataTypes.INTEGER,
    TotalAmountLCY: DataTypes.INTEGER,
    TotalAmountFCY: DataTypes.INTEGER,
    VatSerialNo: DataTypes.STRING,
    Narrative: DataTypes.TEXT ,
    Category: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'CHARGECATEGORY',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    Account: DataTypes.TEXT,
    AccountType: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references:{
            model: 'ACCOUNTTYPE',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    Type: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'CHARGECOLLECTIONTYPE',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'STATUSTYPE',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'CHARGECOLLECTION'})


module.exports = ChargeCollection
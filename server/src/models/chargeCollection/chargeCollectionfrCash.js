const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollectionfrCash extends Model {}

ChargeCollectionfrCash.init({
    Teller: {
        type: DataTypes.TEXT,
        require: true
    },
    CustomerID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'CUSTOMER',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    CustomerName: DataTypes.TEXT,
    Address: DataTypes.TEXT,
    LegalID: DataTypes.TEXT,
    IssuedDate: DataTypes.DATEONLY,
    PlaceOfIssue: DataTypes.TEXT,
    Currency: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CURRENCY',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    chargeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CHARGECOLLECTION',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'CHARGECOLLECTION_CASH'})

module.exports = ChargeCollectionfrCash
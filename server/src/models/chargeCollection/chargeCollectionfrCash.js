const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollectionfrCash extends Model {}

ChargeCollectionTypefrCach.init({
    Teller: {
        type: DataTypes.TEXT,
        require: true
    },
    AccountType: {
        type: DataTypes.TEXT,
        require: true
    },
    Account: {
        type: DataTypes.TEXT,
        require: true
    }
}, {sequelize, modelName:'CHARGECOLLECTION_CASH'})

module.exports = ChargeCollectionfrCash
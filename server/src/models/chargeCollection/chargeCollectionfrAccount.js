const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollectionfrAccount extends Model {}

ChargeCollectionfrAccount.init({
    chargeID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'CHARGECOLLECTION',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {sequelize, modelName:'CHARGECOLLECTION_ACCOUNT'})

module.exports = ChargeCollectionfrAccount
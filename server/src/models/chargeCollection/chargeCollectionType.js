const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollectionType extends Model {}

ChargeCollectionType.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'CHARGECOLLECTIONTYPE', timestamps: false})

module.exports = ChargeCollectionType
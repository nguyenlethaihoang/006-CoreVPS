const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollectionfrAccount extends Model {}

ChargeCollectionfrAccount.init({
}, {sequelize, modelName:'CHARGECOLLECTION_ACCOUNT'})

module.exports = ChargeCollectionfrAccount
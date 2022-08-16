const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Signature extends Model {}

Signature.init({
    URL: DataTypes.TEXT,
    Description: DataTypes.TEXT
}, {sequelize, modelName:'SIGNATURE'})

module.exports = Signature
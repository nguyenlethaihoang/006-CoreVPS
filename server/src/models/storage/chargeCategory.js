const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCategory extends Model {}

ChargeCategory.init({
    Code: DataTypes.TEXT,
    Name: DataTypes.TEXT,
    Value: DataTypes.FLOAT
}, {sequelize, modelName:'CHARGECATEGORY', timestamps: false})

module.exports = ChargeCategory
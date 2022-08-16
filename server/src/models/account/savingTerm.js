const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class SavingTerm extends Model {}

SavingTerm.init({
    Name: DataTypes.TEXT,
    Value: DataTypes.INTEGER
}, {sequelize, modelName:'SAVINGTERM'})

module.exports = SavingTerm
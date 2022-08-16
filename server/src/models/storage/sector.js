const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Sector extends Model {}

Sector.init({
    Name: DataTypes.TEXT,
    Code: DataTypes.TEXT
}, {sequelize, modelName:'SECTOR'})

module.exports = Sector
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class SubSector extends Model {}

SubSector.init({
    Name: DataTypes.TEXT,
    Code: DataTypes.TEXT
}, {sequelize, modelName:'SUBSECTOR'})

module.exports = SubSector
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Relation extends Model {}

Relation.init({
    Name: DataTypes.TEXT,
    Code: DataTypes.TEXT
}, {sequelize, modelName:'RELATION'})

module.exports = Relation
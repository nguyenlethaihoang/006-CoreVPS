const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class StatusType extends Model {}

StatusType.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'STATUSTYPE'})

module.exports = StatusType
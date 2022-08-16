const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Blockage extends Model {}

Blockage.init({
    StartDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY,
    Amount: DataTypes.INTEGER,
    Status: DataTypes.TEXT,
    RelievedDate: DataTypes.DATEONLY,
    Notes: DataTypes.TEXT
}, {sequelize, modelName:'BLOCKAGE'})

module.exports = Blockage
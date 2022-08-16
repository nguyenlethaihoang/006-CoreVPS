const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ProductLine extends Model {}

ProductLine.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'PRODUCTLINE'})

module.exports = ProductLine
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Category extends Model {}

Category.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'CATEGORY'})

module.exports = Category
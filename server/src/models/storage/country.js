const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Country extends Model {}

Country.init({
    Name: DataTypes.TEXT,
    Code: DataTypes.TEXT
}, {sequelize, modelName:'COUNTRY'})

module.exports = Country
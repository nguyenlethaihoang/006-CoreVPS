const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class CityProvince extends Model {}

CityProvince.init({
    Name: DataTypes.TEXT
}, {sequelize, modelName:'CITYPROVINCE'})

module.exports = CityProvince
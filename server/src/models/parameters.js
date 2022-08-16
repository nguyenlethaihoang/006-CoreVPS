const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../database/sequelize')

class Parameter extends Model {}

Parameter.init({
    InterestRate: DataTypes.FLOAT, 
    InterestRateArrear: DataTypes.FLOAT
}, {sequelize, modelName:'PARAMETER'})

module.exports = Parameter
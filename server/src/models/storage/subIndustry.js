const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')


class SubIndustry extends Model {}

SubIndustry.init({
    Name: DataTypes.TEXT,
    Code: DataTypes.TEXT,
    Industry: {
        type: DataTypes.INTEGER,
        references: {
            model: 'INDUSTRY',
            key: 'id'
        }
    }
}, {sequelize, modelName:'SUBINDUSTRY'})

module.exports = SubIndustry
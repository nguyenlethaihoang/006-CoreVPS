const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Doctype extends Model {}

Doctype.init({
    Name: DataTypes.TEXT,
    Code: {
        type: DataTypes.TEXT
    }
}, {sequelize, modelName:'DOCTYPE', timestamps: false})

module.exports = Doctype
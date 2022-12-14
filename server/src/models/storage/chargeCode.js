const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCode extends Model {}

ChargeCode.init({
    Name: DataTypes.TEXT,
    Value: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
}, {sequelize, modelName:'CHARGECODE', timestamps: false})
module.exports = ChargeCode
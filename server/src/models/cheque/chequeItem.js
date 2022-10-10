const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChequeItem extends Model {}

ChequeItem.init({
    ChequeID: {
        type: DataTypes.TEXT,
        unique: true,
    },
    ChequeStatus: {
        type: DataTypes.ENUM('available', 'used'),
        defaultValue: 'available'
    },
    ChequeNo: DataTypes.INTEGER,
}, {sequelize, modelName:'CHEQUEITEM'})

module.exports = ChequeItem
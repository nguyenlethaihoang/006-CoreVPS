const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class ChargeCollection extends Model {}

ChargeCollection.init({
    ChargeAmountLCY: DataTypes.INTEGER,
    ChargeAmountFCY: DataTypes.INTEGER,
    ValueDate: DataTypes.DATEONLY,
    DealRate: DataTypes.FLOAT,
    VatAmountLCY: DataTypes.INTEGER,
    VatAmountFCY: DataTypes.INTEGER,
    TotalAmountLCY: DataTypes.INTEGER,
    TotalAmountFCY: DataTypes.INTEGER,
    VatSerialNo: DataTypes.STRING,
    Narrative: DataTypes.TEXT 
}, {sequelize, modelName:'CHARGECOLLECTION'})


module.exports = ChargeCollection
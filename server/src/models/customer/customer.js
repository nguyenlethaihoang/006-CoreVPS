const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Customer extends Model {}

Customer.init({
    GB_Street:{
        type: DataTypes.TEXT,
        require: true
    },
    GB_Towndist: {
        type: DataTypes.TEXT,
        require: true
    },
    GB_Country: {
        type: DataTypes.TEXT,
        require: true
    },
    GB_ShortName: {
        type: DataTypes.TEXT,
        require: true
    },
    GB_FullName: {
        type: DataTypes.TEXT,
        require: true
    },
    DocID: {
        type: DataTypes.TEXT
    },
    DocIssuePlace: {
        type: DataTypes.TEXT
    },
    DocExpiryDate:{
        type: DataTypes.DATE
    },
    PhoneNumber: {
        type: DataTypes.TEXT,
        require: true
    },
    CompanyBook: DataTypes.TEXT,
    Liability: DataTypes.TEXT
}, {sequelize, modelName:'CUSTOMER', /*paranoid: true*/})

module.exports = Customer
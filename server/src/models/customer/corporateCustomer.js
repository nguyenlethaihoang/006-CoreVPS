const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class CorporateCustomer extends Model {}

CorporateCustomer.init({
    IncorpDate: {
        type: DataTypes.DATEONLY,
        require: true
    },
    ContactPerson: DataTypes.TEXT,
    Position: DataTypes.TEXT,
    Telephone: DataTypes.STRING,
    EmailAddress: DataTypes.TEXT,
    Remarks: DataTypes.TEXT,
    ContactDate: DataTypes.DATEONLY,
    OfficeNumber: DataTypes.TEXT,
    TotalCapital: DataTypes.TEXT,
    TotalAssets: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    TotalRevenue: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    EmployeesNo: DataTypes.TEXT
}, {sequelize, modelName:'CORPORATECUSTOMER', /*paranoid: true*/})

module.exports = CorporateCustomer
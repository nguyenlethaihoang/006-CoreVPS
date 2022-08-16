const { Sequelize, Model, DataTypes } = require("sequelize")
const database = require("../../database/connection")
const sequelize = require('../../database/sequelize')

class IndividualCustomer extends Model {}

IndividualCustomer.init({
    FirstName: DataTypes.TEXT,
    LastName: DataTypes.TEXT,
    MiddleName: DataTypes.TEXT,
    Birthday: {
        type: DataTypes.DATEONLY,
        require: true
    },
    MobilePhone: DataTypes.STRING,
    EmailAddress: DataTypes.TEXT,
    Gender: {
        type: DataTypes.TEXT
    },
    Title: DataTypes.TEXT,
    MaritalStatus: DataTypes.TEXT,
    ContactDate: DataTypes.DATEONLY,
    FaxNumber: DataTypes.TEXT,
    DependantsNo: DataTypes.TEXT,
    ChildUnder15: DataTypes.INTEGER,
    Childfr15to25: DataTypes.INTEGER,
    ChildOver25: DataTypes.INTEGER,
    HomeOwnership: DataTypes.BOOLEAN,
    EmploymentStatus: DataTypes.BOOLEAN,
    CompanyName: DataTypes.TEXT,
    MonthlyIncome: DataTypes.INTEGER,
    OfficeAddress: DataTypes.TEXT,
    CitizenIdentify: {
        type: DataTypes.TEXT
    }
}, {sequelize, modelName:'INDIVIDUALCUSTOMER', paranoid: true})

module.exports = IndividualCustomer
const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class PeriodicSA extends Model {}

PeriodicSA.init({
    AccountTitle: {
        type: DataTypes.TEXT,
        require: true
    },
    ShortTitle: DataTypes.TEXT,
    Notes: DataTypes.TEXT,
    MaturityDate: DataTypes.DATEONLY,
    InterestRate: DataTypes.INTEGER,
    AccountNo: DataTypes.TEXT,
    PaymentNo: DataTypes.TEXT,
    Narrative: DataTypes.TEXT,
    Schedules: DataTypes.BOOLEAN,
    SchedulesType: DataTypes.TEXT,
    Frequency: DataTypes.TEXT,
    PrincipalAmount: DataTypes.INTEGER,
    ValueDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    Teller: DataTypes.TEXT
}, {sequelize, modelName:'PERIODIC_SA'})

module.exports = PeriodicSA
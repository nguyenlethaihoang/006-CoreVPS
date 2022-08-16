const { Sequelize, Model, DataTypes } = require("sequelize")
const sequelize = require('../../database/sequelize')

class Transaction extends Model {}

Transaction.init({
}, {sequelize, modelName:'TRANSACTION'})

module.exports = Transaction
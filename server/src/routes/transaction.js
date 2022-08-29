const express = require("express")
const route = express.Router()

const depositController = require('../controllers/transaction/deposit')
const withdrawalController = require('../controllers/transaction/withdrawal')

//DEPOSIT
route.post('/create_deposit', depositController.create)
route.put('/validate_deposit/:deposit', depositController.validate)

//WITHDRAWAL
route.post('/create_withdrawal', withdrawalController.create)
route.put('/validate_withdrawal/:withdrawal', withdrawalController.validate)

module.exports = route
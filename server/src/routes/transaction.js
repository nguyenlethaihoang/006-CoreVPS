const express = require("express")
const route = express.Router()

const depositController = require('../controllers/transaction/deposit')
const withdrawalController = require('../controllers/transaction/withdrawal')
const transferController = require('../controllers/transaction/transfer')

//DEPOSIT
route.post('/create_deposit', depositController.create)
route.put('/validate_deposit/:deposit', depositController.validate)

//WITHDRAWAL
route.post('/create_withdrawal', withdrawalController.create)
route.put('/validate_withdrawal/:withdrawal', withdrawalController.validate)


//TRANSFER
route.post('/create_transfer', transferController.create)
route.put('/validate_transfer/:transfer', transferController.validate)

module.exports = route
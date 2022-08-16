const express = require("express")
const route = express.Router()

const foreignExchangeController = require('../controllers/exchange/foreignExchange')

route.post('/create', foreignExchangeController.create)
route.get('/:exchange', foreignExchangeController.get)
route.put('/validate/:exchange', foreignExchangeController.validate)
route.post('/enquiry', foreignExchangeController.enquiry)

module.exports = route
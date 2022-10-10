const express = require("express")
const route = express.Router()

const foreignExchangeController = require('../controllers/exchange/foreignExchange')

route.post('/create', foreignExchangeController.create)
route.get('/enquiry', foreignExchangeController.enquiry)
route.get('/:exchange', foreignExchangeController.get)
route.put('/validate/:exchange', foreignExchangeController.validate)


module.exports = route
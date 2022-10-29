const express = require("express")
const route = express.Router()

const outwardController = require('../controllers/transferOperation/outward')

// CASH
route.post('/cash_create', outwardController.createByCash)
route.get('/cash/:id', outwardController.getCashID)
route.put('/cash_validate/:id', outwardController.validateCash)

// ACCOUNT
route.post('/account_create', outwardController.createByAccount)
route.get('/account/:id', outwardController.getAccountID)
route.put('/account_validate/:id', outwardController.validateAccount)

route.post('/enquiry', outwardController.enquiry)

module.exports = route
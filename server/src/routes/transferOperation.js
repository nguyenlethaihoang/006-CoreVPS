const express = require("express")
const route = express.Router()


//OUTWARD
//-----------------------------------------------------------------------
const outwardController = require('../controllers/transferOperation/outward')
const inwardController = require('../controllers/transferOperation/inward')
// CASH
route.post('/cash_create', outwardController.createByCash)
route.get('/cash/:id', outwardController.getCashID)
route.put('/cash_validate/:id', outwardController.validateCash)

// ACCOUNT
route.post('/account_create', outwardController.createByAccount)
route.get('/account/:id', outwardController.getAccountID)
route.put('/account_validate/:id', outwardController.validateAccount)

route.post('/enquiry', outwardController.enquiry)

//INWARD
//-----------------------------------------------------------------------
route.post("/inward_cash_create", inwardController.createCashWithdrawal)
route.post("/inward_credit_create", inwardController.createCreditAccount)
route.get('/inward/:id', inwardController.getByID)
route.put('/inward/:id', inwardController.validate)
route.post('/inward/enquiry', inwardController.enquiry)

module.exports = route
const express = require("express")
const route = express.Router()

const issueChequeController = require('../controllers/cheque/issueCheque')
const withdrawalChequeController = require('../controllers/cheque/withdrawalCheque')
const transferChequeController = require('../controllers/cheque/transferCheque')

// ISSUE CHEQUE ROUTES
route.post('/issue', issueChequeController.issue)
route.get('/issue/:id', issueChequeController.getID)
route.post('/issue/enquiry', issueChequeController.enquiryCheque)
route.put('/issue/validate/:id', issueChequeController.validate)

// WITHDRALWAL CHEQUE ROUTES
route.post('/withdrawal', withdrawalChequeController.withdrawal)
route.put('/withdrawal/validate/:id', withdrawalChequeController.validate)
route.get('/withdrawal/get/:id', withdrawalChequeController.getID)
route.post('/withdrawal/enquiry', withdrawalChequeController.enquiry)

// TRANSFER CHEQUE ROUTES
route.post('/transfer', transferChequeController.transfer)
route.put('/transfer/validate/:id', transferChequeController.validate)
route.get('/transfer/get/:id', transferChequeController.getID)
route.post('/transfer/enquiry', transferChequeController.enquiry)

module.exports = route
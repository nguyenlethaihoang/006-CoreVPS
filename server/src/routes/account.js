const express = require("express")
const route = express.Router()

const debitAccountController = require('../controllers/account/debitAccount')
const savingAccountController = require('../controllers/account/savingAccount')

// DEBIT ACCOUNT
route.post('/debit_account/open', debitAccountController.openAccount)
route.post('/debit_account/enquiry', debitAccountController.enquiry)
route.post('/debit_account/block/:account', debitAccountController.blockAccount)
route.put('/debit_account/unblock/:accountID', debitAccountController.unBlockAccount)
route.get('/debit_account/get_blockage/:account', debitAccountController.getBlockageByAccount)
route.get('/debit_account/get_blocked_amount', debitAccountController.getBlocked)
route.put('/debit_account/close/:account', debitAccountController.closeAccount)
route.put('/debit_account/update/:account', debitAccountController.update)
route.get('/debit_account/get/:account', debitAccountController.getAccount)

// SAVING ACCOUNT
route.post('/saving_account/open_arrear', savingAccountController.openArrearSA)
route.put('/saving_account/validate/:said', savingAccountController.validate)
route.post('/saving_account/open_periodic', savingAccountController.openPeriodicSA)
route.post('/saving_account/open_discounted', savingAccountController.openDiscountedSA)
route.post('/saving_account/enquiry_arrear', savingAccountController.enquiryArrear)
route.post('/saving_account/enquiry_periodic', savingAccountController.enquiryPeriodic)
route.post('/saving_account/enquiry_discounted', savingAccountController.enquiryDiscounted)
route.put('/saving_account/update/:said', savingAccountController.update)
route.get('/saving_account/arrear_close/:said', savingAccountController.arrearClosurePreview)


module.exports = route




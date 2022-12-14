const express = require("express")
const { getAccount } = require("../controllers/account/debitAccount")
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
route.get('/debit_account/get_closure/:account', debitAccountController.getClosedByID)
route.get('/debit_aacount/get_all', debitAccountController.getAll)

// SAVING ACCOUNT
route.post('/saving_account/open_arrear', savingAccountController.openArrearSA)
route.put('/saving_account/validate/:said', savingAccountController.validate)
route.post('/saving_account/open_periodic', savingAccountController.openPeriodicSA)
route.post('/saving_account/open_discounted', savingAccountController.openDiscountedSA)
route.post('/saving_account/enquiry_arrear', savingAccountController.enquiryArrear)
route.post('/saving_account/enquiry_periodic', savingAccountController.enquiryPeriodic)
route.post('/saving_account/enquiry_discounted', savingAccountController.enquiryDiscounted)
route.put('/saving_account/update/:said', savingAccountController.update)
route.post('/saving_account/close/:id', savingAccountController.closeArrearPeriodic)
route.post('/saving_account/close_discounted/:id', savingAccountController.closeDiscounted )
route.put('/saving_account/validate_closurediscounted/:id', savingAccountController.validateDiscounted)
route.get('/saving_account/get_closure/:id', savingAccountController.getClosure)
route.put('/saving_account/validate_closure/:id', savingAccountController.validateClosure)

module.exports = route




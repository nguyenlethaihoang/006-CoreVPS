const express = require("express")
const route = express.Router()

const exportFileController = require('../controllers/exportFile')

route.get('/individual/:id', exportFileController.exportIndividual)
route.get('/corporate/:id', exportFileController.exportCorporate)
route.get('/deposit/:id', exportFileController.exportDeposit)
route.get('/main_account/:id', exportFileController.exportAccount )
route.get('/withdrawal/:id', exportFileController.exportWithdrawal)
route.get('/transfer/:id', exportFileController.exportTransfer)
route.post('/delete', exportFileController.deleteFile)

module.exports = route
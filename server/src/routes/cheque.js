const express = require("express")
const route = express.Router()

const issueChequeController = require('../controllers/cheque/issueCheque')

route.post('/issue', issueChequeController.issue)
route.get('/issue/:id', issueChequeController.getID)
route.post('/issue/enquiry', issueChequeController.enquiryCheque)

module.exports = route
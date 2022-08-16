const express = require("express")
const route = express.Router()

const depositController = require('../controllers/transaction/deposit')

route.post('/create_deposit', depositController.create)
route.put('/validate_deposit/:deposit', depositController.validate)

module.exports = route
const express = require("express")
const route = express.Router()

const chargeCollectionController = require("../controllers/chargeCollection")

route.post('/create_ccaccount', chargeCollectionController.createCCAccount)
route.post('/create_cccash', chargeCollectionController.createCCCash)
route.put('/validate/:id', chargeCollectionController.validate)
route.post('/enquiry', chargeCollectionController.enquiry)

module.exports = route
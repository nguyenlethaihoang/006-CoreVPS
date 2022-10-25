const express = require("express")
const route = express.Router()

const creditTransferController = require('../controllers/creditTransaction/transfer')
const creditCollectionController = require('../controllers/creditTransaction/collection')
const enquiryController = require('../controllers/creditTransaction/enquiry')

// [POST] /credit/collect
route.post('/collect', creditCollectionController.create)
// [GET] /credit/collect/:id
route.get('/collect/:id', creditCollectionController.getID)
// [PUT] /credit/collect/validate/:id
route.put('/collect/validate/:id', creditCollectionController.validate)

// [POST] /credit/transfer
route.post('/transfer', creditTransferController.create)
// [GET] /credit/transfer/:id
route.get('/transfer/:id', creditTransferController.getID)
// [PUT] /credit/transfer/validate/:id
route.put('/transfer/validate/:id', creditTransferController.validate)

// [POST] /credit/enquiry
route.post('/enquiry', enquiryController.enquiry)



module.exports = route
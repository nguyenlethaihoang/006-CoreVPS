const express = require("express")
const route = express.Router()

const signatureController = require('../controllers/signature/signature')
const signatureMinIOController = require('../controllers/signature/signatureMinIO')
const upload = require('../middlewares/upload')
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

route.post('/upload', uploadStrategy, signatureMinIOController.upload)
route.get('/get_all', signatureMinIOController.getAll)
route.get('/get_by_customer/:customerid', signatureMinIOController.getByCustomerID)
route.get('/get_by_status/:status', signatureMinIOController.getByStatus)
route.get('/get/:signatureid', signatureMinIOController.getBySignatureID)
route.put('/validate/:signatureid', signatureMinIOController.update)
route.post('/change_image/:signatureid', uploadStrategy, signatureMinIOController.changeSignatureImage)

//()=>{upload.single('image')}
// https://cb-be.../signature/upload

module.exports = route 
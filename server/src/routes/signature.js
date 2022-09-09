const express = require("express")
const route = express.Router()

const signatureController = require('../controllers/signature/signature')
const upload = require('../middlewares/upload')
const multer = require('multer')
const inMemoryStorage = multer.memoryStorage()
const uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

route.post('/upload', uploadStrategy, signatureController.upload)
route.get('/get_all', signatureController.getAll)
route.get('/get_by_customer/:customerid', signatureController.getByCustomerID)
route.get('/get_by_status/:status', signatureController.getByStatus)
route.get('/get/:signatureid', signatureController.getBySignatureID)
route.put('/validate/:signatureid', signatureController.update)
route.post('/change_image/:signatureid', uploadStrategy, signatureController.changeSignatureImage)

//()=>{upload.single('image')}
// https://cb-be.../signature/upload

module.exports = route 
const express = require("express")
const route = express.Router()

const exportFileController = require('../controllers/exportFile')

route.get('/individual/:id', exportFileController.exportIndividual)
route.get('/corporate/:id', exportFileController.exportCorporate)
route.post('/delete', exportFileController.deleteFile)

module.exports = route
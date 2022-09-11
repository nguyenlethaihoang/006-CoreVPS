const express = require("express")
const route = express.Router()

const exportFileController = require('../controllers/exportFile')

route.get('/individual/:id', exportFileController.exportIndividual)


module.exports = route
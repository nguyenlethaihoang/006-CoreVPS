const express = require("express")
const route = express.Router()

const corporateCustomerController = require('../controllers/customer/corporateCustomer')
const individualCustomerController = require('../controllers/customer/individualCustomer')
const enquiryCustomerController = require('../controllers/customer/enquiryCustomer')

route.post('/create_individual_customer', individualCustomerController.create)
route.get('/get_all_individual_customer', individualCustomerController.getAll)
route.get('/get_individual_customer/:id', individualCustomerController.findByID)
route.put('/update_individual_customer/:id', individualCustomerController.update)
route.delete('/delete_individual_customer/:id', individualCustomerController.delete )

route.post('/create_corporate_customer', corporateCustomerController.create)
route.get('/get_corporate_customer/:id', corporateCustomerController.findByID)
route.get('/get_all_corporate_customer', corporateCustomerController.getAll)
route.put('/update_corporate_customer/:id', corporateCustomerController.update)
route.delete('/delete_corporate_customer/:id', corporateCustomerController.delete)

route.get('/get_all_customer', enquiryCustomerController.getAll)
route.post('/enquiry_customer', enquiryCustomerController.enquiry)

module.exports=route
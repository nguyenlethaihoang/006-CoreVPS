const corporateCustomerModel = require('../../models/customer/corporateCustomer')
const individualCustomerModel = require('../../models/customer/individualCustomer')
const customerModel = require('../../models/customer/customer')
const asyncHandler = require('../../utils/async')
const sequelize = require('../../database/sequelize')
const appError = require('../../utils/appError')

// customerType
// customerID
// GBFullName
// CellPhone/ OfficeNum
// DocID
// MainSector => SubSector
// Main Industry => SubIndustry

const enquiryCustomerController = {
    enquiry: asyncHandler(async (req, res, next) => {
        const enquiryReq = {
            customerType: req.body.customerType,
            customerID: req.body.customerID,
            GB_FullName: req.body.GB_FullName,
            phoneNumber: req.body.phoneNumber,
            docID: req.body.docID,
            mainSector: req.body.mainSector,
            subSector: req.body.subSector,
            mainIndustry: req.body.mainIndustry,
            subIndustry: req.body.subIndustry
        }

        /*const enquiryCondition = {}
        if(!customerType)*/   
        
        let count = 0
        let enquiryString = 'Select * from CUSTOMER'
        if(enquiryReq.customerType){
            if(count == 0)
                enquiryString += ' where '
            count++
            enquiryString += 'CustomerType = ' + enquiryReq.customerType
        }
        if(enquiryReq.customerID){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' id = "' + enquiryReq.customerID + '"'
            count++
        }
        if(enquiryReq.GB_FullName){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' GB_FullName = "' + enquiryReq.GB_FullName + '"'
            count++
        }
        if(enquiryReq.phoneNumber){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' PhoneNumber = "' + enquiryReq.phoneNumber + '"'
            count++
        }
        if(enquiryReq.docID){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' DocID = "' + enquiryReq.docID + '"'
            count++
        }
        if(enquiryReq.mainSector){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' MainSector = ' + enquiryReq.mainSector 
            count++
        }
        if(enquiryReq.subSector){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' SubSector = ' + enquiryReq.subSector
            count++
        }
        if(enquiryReq.mainIndustry){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' MainIndustry = ' + enquiryReq.mainIndustry
            count++
        }
        if(enquiryReq.subIndustry){
            if(count != 0)
                enquiryString += ' AND '
            else
                enquiryString += ' where '
            enquiryString += ' Industry = ' + enquiryReq.customerType
            count++
        }
        
        console.log(enquiryString)

        const customersDB = await sequelize.query(enquiryString,{
            model: customerModel
        })
        .catch(err => {
            console.log(err)
        })


        return res.status(200).json({
            message: "customers result",
            data: customersDB
        })
    }),

    getAll: asyncHandler( async (req, res, next) => {
        const {count, rows} = await customerModel.findAndCountAll()

        return res.status(200).json({
            message: "get all customer",
            data:{
                quantity: count,
                customer: rows
            }
        })
    }),

    getNameCustomers : asyncHandler( async (req, res, next) => {
        const {count, rows} = await customerModel.findAndCountAll({
            attributes: ['id', 'GB_FullName']
        })

        return res.status(200).json({
            message: "get all customer",
            data:{
                quantity: count,
                customer: rows
            }
        })
    })
}

module.exports = enquiryCustomerController
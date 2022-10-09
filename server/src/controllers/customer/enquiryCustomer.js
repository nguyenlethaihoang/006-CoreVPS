const corporateCustomerModel = require('../../models/customer/corporateCustomer')
const individualCustomerModel = require('../../models/customer/individualCustomer')
const customerModel = require('../../models/customer/customer')
const asyncHandler = require('../../utils/async')
const sequelize = require('../../database/sequelize')
const appError = require('../../utils/appError')

const countryModel = require('../../models/storage/country')
const cityModel = require('../../models/storage/cityProvince')
const docTypeModel = require('../../models/storage/doctype')
const sectorModel = require('../../models/storage/sector')
const subSectorModel = require('../../models/storage/subSector')
const industryModel = require('../../models/storage/industry')
const subIndustryModel = require('../../models/storage/industry')
const accountOfficerModel = require('../../models/storage/accountOfficer')
const relationCodeModel = require('../../models/storage/relation')
const { Op } = require('sequelize')




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

        let enquiryCondition = {} 
    
        if(enquiryReq.customerType){
            // if(count == 0)
            //     enquiryString += ' where '
            // count++
            // enquiryString += 'CustomerType = ' + enquiryReq.customerType
            enquiryCondition.CustomerType = enquiryReq.customerType
        }
        if(enquiryReq.customerID){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' id = ' + enquiryReq.customerID + ''
            // count++
            enquiryCondition.id = enquiryReq.customerID
        }
        if(enquiryReq.GB_FullName){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' GB_FullName = "' + enquiryReq.GB_FullName + '"'
            // count++
            //enquiryCondition.GB_FullName = enquiryReq.GB_FullName
            enquiryCondition.GB_FullName = {[Op.substring]: enquiryReq.GB_FullName}
        }
        if(enquiryReq.phoneNumber){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' PhoneNumber = "' + enquiryReq.phoneNumber + '"'
            // count++
            enquiryCondition.PhoneNumber = {[Op.substring]: enquiryReq.phoneNumber}
        }
        if(enquiryReq.docID){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' DocID = "' + enquiryReq.docID + '"'
            // count++
            enquiryCondition.DocID = {[Op.substring]: enquiryReq.docID}
        }
        if(enquiryReq.mainSector){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' MainSector = ' + enquiryReq.mainSector 
            // count++
            enquiryCondition.MainSector = enquiryReq.mainSector
        }
        if(enquiryReq.subSector){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' SubSector = ' + enquiryReq.subSector
            // count++
            enquiryCondition.SubSector = enquiryReq.subSector
        }
        if(enquiryReq.mainIndustry){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' MainIndustry = ' + enquiryReq.mainIndustry
            // count++
            enquiryCondition.MainIndustry = enquiryReq.mainIndustry
        }
        if(enquiryReq.subIndustry){
            // if(count != 0)
            //     enquiryString += ' AND '
            // else
            //     enquiryString += ' where '
            // enquiryString += ' Industry = ' + enquiryReq.customerType
            // count++
            enquiryCondition.Industry = enquiryReq.subIndustry
        }
        
    
        const customersDB = await customerModel.findAll({
            where: enquiryCondition,
            include: [{
                model: countryModel, attributes: ['Name', 'Code']
            }, {
                model: cityModel, attributes: ['Name']
            }, {
                model: docTypeModel, attributes: ['Name']
            }, {
                model: sectorModel, attributes: ['Name']
            }, {
                model: subSectorModel, attributes: ['Name']
            }, {
                model: industryModel, attributes: ['Name']
            }, {
                model: subIndustryModel, attributes: ['Name']
            }, {
                model: accountOfficerModel, attributes: ['Name']
            }, {
                model: relationCodeModel, attributes: ['Name']
            }]
        })
        .catch(err => {
            return next(new appError(err, 404))
        })


        // rowsRes = []
        // await Promise.all(customersDB.map(async (value, i) => {
        //     let typeDB = parseInt(value.getDataValue("CustomerType"))
        //     let cusIDDB = parseInt(value.getDataValue("id"))
        //     let detailCus
        //     if(typeDB==1){
        //         detailCus = await individualCustomerModel.findOne({
        //             where: {CustomerID: cusIDDB}
        //         })
        //         .catch(err => {
        //             return next(new appError(err, 404))
        //         })
        //     }else if(typeDB == 2){
        //         detailCus = await corporateCustomerModel.findOne({
        //             where: {CustomerID: cusIDDB}
        //         })
        //         .catch(err => {
        //             return next(new appError(err, 404))
        //         })
        //     }else{
        //         return next(new appError('Find detail Error', 404))
        //     }
        //     let cusRes = {customer: customersDB[i], detail: detailCus}
        //     rowsRes.push(cusRes)

        // }))

        // return res.status(200).json({
        //     message: "get all customer",
        //     data:{
        //         customer: rowsRes
        //     }
        // })



        return res.status(200).json({
            message: "customers result",
            data: customersDB
        })
    }),

    getAll: asyncHandler( async (req, res, next) => {
        const {count, rows} = await customerModel.findAndCountAll({
            include: [{
                model: countryModel, attributes: ['Name', 'Code']
            }, {
                model: cityModel, attributes: ['Name']
            }, {
                model: docTypeModel, attributes: ['Name']
            }, {
                model: sectorModel, attributes: ['Name']
            }, {
                model: subSectorModel, attributes: ['Name']
            }, {
                model: industryModel, attributes: ['Name']
            }, {
                model: subIndustryModel, attributes: ['Name']
            }, {
                model: accountOfficerModel, attributes: ['Name']
            }, {
                model: relationCodeModel, attributes: ['Name']
            }]
        })

        rowsRes = []
        await Promise.all(rows.map(async (value, i) => {
            let typeDB = parseInt(value.getDataValue("CustomerType"))
            let cusIDDB = parseInt(value.getDataValue("id"))
            let detailCus
            if(typeDB==1){
                detailCus = await individualCustomerModel.findOne({
                    where: {CustomerID: cusIDDB}
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
            }else if(typeDB == 2){
                detailCus = await corporateCustomerModel.findOne({
                    where: {CustomerID: cusIDDB}
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
            }else{
                return next(new appError('Find detail Error', 404))
            }
            let cusRes = {customer: rows[i], detail: detailCus}
            rowsRes.push(cusRes)

        }))

        return res.status(200).json({
            message: "get all customer",
            data:{
                quantity: count,
                customer: rowsRes
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
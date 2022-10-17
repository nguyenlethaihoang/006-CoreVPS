const chargeCollectionModel = require('../models/chargeCollection/chargeCollection')
const chargeCollectionTypeModel = require('../models/chargeCollection/chargeCollectionType')
const chargeCollectionfrAccountModel = require('../models/chargeCollection/chargeCollectionfrAccount')
const chargeCollectionfrCashModel = require('../models/chargeCollection/chargeCollectionfrCash')
const debitAccountModel = require('../models/account/debitAccount')
const asyncHandler = require('../utils/async')
const appError = require('../utils/appError')
const { decrement, findAll } = require('../models/account/debitAccount')
const chargeCategoryModel = require('../models/storage/chargeCategory')
const customerModel = require('../models/customer/customer')
const { promiseToCallback } = require('@azure/core-http')
const { Op } = require('sequelize')


const chargeCollectionController = {
    createCCAccount: asyncHandler(async (req, res, next) => {
        const chargeReq = {
            ccAmount: req.body.ccAmount,
            ccDealRate: req.body.ccDealRate,
            ccVatSerialNo: req.body.ccVatSerialNo,
            ccNarrative: req.body.ccNarrative,
            ccCategory: req.body.ccCategory,
            account: req.body.account,
            accountType: req.body.accountType,
            ccAmountFCY: req.body.ccAmountFCY,
            vatAmountLCY: req.body.vatAmountLCY,
            vatAmountFCY: req.body.vatAmountFCY,
            totalAmountLCY: req.body.totalAmountLCY,
            totalAmountFCY: req.body.totalAmountFCY,
        }
        if(!chargeReq.ccAmount || !chargeReq.account || !chargeReq.accountType){
            return res.status(404).json({
                message: "Enter required fields!"
            })
        }

        if(chargeReq.accountType == 1){
            const debitAccountDB = debitAccountModel.findByPk(chargeReq.account)
            if(!debitAccountDB){
                return res.status(404).json({
                    message: 'Account not found!'
                })
            }
        }


        // let vatAmountLCY = parseInt(chargeReq.ccAmount) * 0.1
        // let totalAmount = vatAmountLCY + chargeReq.ccAmount


        const newChargeCollection = await chargeCollectionModel.create({
            ChargeAmountLCY: chargeReq.ccAmount,
            ChargeAmountFCY: chargeReq.ccAmountFCY,
            DealRate: chargeReq.ccDealRate,
            VatAmountLCY: chargeReq.vatAmountLCY,
            VatAmountFCY: chargeReq.vatAmountFCY,
            TotalAmountFCY: chargeReq.totalAmountFCY,
            TotalAmountLCY: chargeReq.totalAmountLCY,
            VatSerialNo: chargeReq.ccVatSerialNo,
            Narrative: chargeReq.ccNarrative,
            Category: chargeReq.ccCategory,
            Account: chargeReq.account,
            AccountType: chargeReq.accountType,
            Type: 1,
            Status: 1
        })
        if(!newChargeCollection){
            return res.status(404).json({
                message: "Create Error"
            })
        }

        const chargeID = newChargeCollection.getDataValue('id')
        const newCCAccount = await chargeCollectionfrAccountModel.create({
            chargeID: chargeID
        })

        return res.status(200).json({
            message: "Charge Collection",
            data: newChargeCollection
        })
    }), 

    createCCCash: asyncHandler(async( req, res, next) => {
        const chargeReq = {
            ccAmount: req.body.ccAmount,
            ccAmountFCY: req.body.ccAmountFCY,
            vatAmountLCY: req.body.vatAmountLCY,
            vatAmountFCY: req.body.vatAmountFCY,
            totalAmountLCY: req.body.totalAmountLCY,
            totalAmountFCY: req.body.totalAmountFCY,
            ccDealRate: req.body.ccDealRate,
            ccVatSerialNo: req.body.ccVatSerialNo,
            ccNarrative: req.body.ccNarrative,
            ccCategory: req.body.ccCategory,
            customerID: req.body.customerID,
            teller: req.body.teller,
            currency: req.body.currency,
            legalID: req.body.legalID,
            address: req.body.address,
            customerName: req.body.customerName,
            issuedDate: req.body.issuedDate,
            issuePlace: req.body.issuePlace
        }

        // if(!chargeReq.ccAmount){
        //     return res.status(404).json({
        //         message: "Enter required fields!"
        //     })
        // }

        if(chargeReq.customerID){
            const customerDB = customerModel.findByPk(chargeReq.account)
            if(!customerDB){
                return res.status(404).json({
                    message: 'Customer not found!'
                })
            }
        }


        // let vatAmountLCY = parse(chargeReq.ccAmount) * 0.1
        // let totalAmount = vatAmountLCY + chargeReq.ccAmount


        const newChargeCollection = await chargeCollectionModel.create({
            ChargeAmountLCY: chargeReq.ccAmount,
            ChargeAmountFCY: chargeReq.ccAmountFCY,
            DealRate: chargeReq.ccDealRate,
            VatAmountLCY: chargeReq.vatAmountLCY,
            VatAmountFCY: chargeReq.vatAmountFCY,
            TotalAmountFCY: chargeReq.totalAmountFCY,
            TotalAmountLCY: chargeReq.totalAmountLCY,
            VatSerialNo: chargeReq.ccVatSerialNo,
            Narrative: chargeReq.ccNarrative,
            Category: chargeReq.ccCategory,
            Type: 2,
            Status: 1
        })

        if(!newChargeCollection){
            return res.status(404).json({
                message: "Create Error"
            })
        }

        const chargeID = newChargeCollection.getDataValue('id')
        const newCCCash = await chargeCollectionfrCashModel.create({
            CustomerID: chargeReq.customerID? chargeReq.customerID : null,
            chargeID: chargeID,
            Teller: chargeReq.teller,
            Currency: chargeReq.currency,
            LegalID: chargeReq.legalID,
            CustomerName: chargeReq.customerName,
            Address: chargeReq.address,
           //IssuedDate: chargeReq.issuedDate,
            PlaceOfIssue: chargeReq.issuePlace
        }).catch(err => {
            console.log(err)
        })

        return res.status(200).json({
            message: "Charge Collection",
            data: newChargeCollection,
            CCCash: newCCCash
        })
    }),

    validate: asyncHandler(async (req, res, next) => {
        const chargeIDReq = req.params.id 
        const statusReq = req.body.status

        // SEARCH
        const chargeDB = await chargeCollectionModel.findByPk(chargeIDReq)
        if(!chargeDB){
            return res.status(404).json({
                message: "Charge Collection not found!"
            })
        }

        const statusDB = chargeDB.getDataValue('Status')
        if(statusDB != 1){
            return res.status(404).json({
                message: "Validated!"
            })
        }

        //UPDATE CHARGE COLLECTION STATUS
        const updatedCharge = await chargeDB.update({
            Status: statusReq
        })

        //UPDATE 
        if(statusReq == 3){
            return res.status(200).json({
                message: "Updated"
            })
        }else if(statusReq == 2){
            // UPDATE ACCOUNT AMOUNT
            const amountDB = parseInt(chargeDB.getDataValue('TotalAmountLCY'))
            if(chargeDB.getDataValue('AccountType') == 1){
                const debitAccountDB = await debitAccountModel.findByPk(chargeDB.getDataValue("Account"))
                await debitAccountDB.decrement({
                    'WorkingAmount': amountDB,
                    'ActualBalance': amountDB
                })
            }

            return res.status(200).json({
                message: 'Updated',
                charge: updatedCharge
            })
        }

    }),

    enquiry: asyncHandler(async (req, res, next) => {
        const enquiryReq = {
            chargeType: req.body.chargeType,
            chargeID: req.body.chargeID,
            customerID: req.body.customerID,
            customerName: req.body.customerName,
            legalID: req.body.legalID,
            accountID: req.body.accountID,
            accountType: req.body.accountType,
            chargesAmountfr: req.body.chargesAmountfr,
            chargesAmountto: req.body.chargesAmountto
        }
        if(!enquiryReq.chargeType){
            return res.status(404).json({
                message: "Charge Collection Type is required!"
            })
        }

        let chargeCond = {}
        let chargeCashCond = {}
        let customerCond = {}
        let accountCond = {}
        chargeCond.Type = enquiryReq.chargeType
        if(enquiryReq.accountType){
            chargeCond.AccountType = enquiryReq.accountType
        }
        
        if(enquiryReq.chargeID){
            chargeCond.id = enquiryReq.chargeID
        }
        if(enquiryReq.customerID){
            accountCond.CustomerID = enquiryReq.customerID
        }
        if(enquiryReq.customerName){
            customerCond.GB_FullName = {[Op.substring]: enquiryReq.customerName}
        }
        if(enquiryReq.legalID){
            chargeCashCond.LegalID = enquiryReq.legalID
        }
        if(enquiryReq.accountID){
            chargeCond.Account = enquiryReq.accountID
        }
        if(enquiryReq.chargesAmountfr && enquiryReq.chargesAmountto){
            chargeCond.ChargeAmountLCY = {[Op.between]: [enquiryReq.chargesAmountfr, enquiryReq.chargesAmountto]}
        }

        if(enquiryReq.customerID || enquiryReq.customerName){
            const debitAccountDB= await debitAccountModel.findAll({
                attributes: ['id'],
                where: accountCond,
                include: [{
                    model: customerModel,
                    where: customerCond,
                    as: 'Customer',
                    attributes: []
                }]
            })
            let debitAccountStr = []
            debitAccountDB.map(value => {
                let id = value.getDataValue('id')
                debitAccountStr.push(id.toString())
            })
            
            chargeCond.Account = {[Op.in]: debitAccountStr}
        }
        if(enquiryReq.chargeType == 2 && enquiryReq.legalID){
            let chargesCashDB = await  chargeCollectionfrCashModel.findAll({
                where: chargeCashCond
            })
            let IDs = []
            chargesCashDB.map(value => {
                let id = value.getDataValue('id')
                IDs.push(id)
            })
            chargeCond.id = {[Op.in]: IDs}
        }

        let chargesDB = [], tempChargesObj
        if(enquiryReq.chargeType == 1){
            chargesDB =  await chargeCollectionModel.findAll({
                where: chargeCond,
                include: [{
                    model: chargeCategoryModel, as:'CHARGECATEGORY'
                }]
            })
        }
        else{
            tempChargesObj =  await chargeCollectionModel.findAll({
                where: chargeCond,
                include: [{
                    model: chargeCategoryModel, as:'CHARGECATEGORY'
                }]
            })
            console.log('cash')
            await Promise.all(tempChargesObj.map(async (value, i) => {
                    let chargeID = value.getDataValue('id')
                    let chargeCashDB = await chargeCollectionfrCashModel.findOne({
                        where: {chargeID: chargeID}, 
                        
                    }) 
                    let tempObj = {}
                    tempObj.CC = value
                    tempObj.CASH = chargeCashDB
                    chargesDB.push(tempObj)
                })
            )
            
        }
        console.log('cachs3')
        console.log(chargesDB)
        return res.status(200).json({
            message: "Charge Collection Enquiry",
            data: chargesDB
        })
    })
}

module.exports = chargeCollectionController
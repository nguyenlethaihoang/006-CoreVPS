const foreignExchangeModel = require('../../models/exchange/foreignExchange')
const currencyModel = require('../../models/storage/currency')
const statusTypeModel = require('../../models/signature/statusType')
const chargeCollectionModel = require('../../models/chargeCollection/chargeCollection')
const chargeCollectionfrAccountModel = require('../../models/chargeCollection/chargeCollectionfrAccount')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')

const foreignExchangeController = {
    // [POST] exchange/create
    create: asyncHandler(async (req, res, next) => {
        const exchangeReq = {
            customerName: req.body.customerName,
            address: req.body.address,
            phoneNo: req.body.phoneNo,
            tellerIDst: req.body.tellerIDst,
            debitCurrency: req.body.debitCurrency,
            debitAccount: req.body.debitAccount,
            debitAmtLCY: req.body.debitAmtLCY,
            debitAmtFCY: req.body.debitAmtFCY,
            debitDealRate: req.body.debitDealRate,
            currencyPaid: req.body.currencyPaid,
            tellerIDnd: req.body.tellerIDnd,
            creditAccount: req.body.creditAccount,
            creditDealRate: req.body.creditDealRate,
            narrative: req.body.narrative,
            ccAmount: req.body.ccAmount,
            ccCategory: req.body.ccCategory,
            ccDealRate: req.body.ccDealRate,
            ccVatSerialNo: req.body.ccVatSerialNo
        }

        // DebitCurrency => Enable Fields

        // debit currency <> currency paid
        if(exchangeReq.debitCurrency == exchangeReq.currencyPaid){
            return next(new appError('Currency Paid must be different with Debit Currency ', 404))
        }

        // require field
        if(!exchangeReq.customerName || !exchangeReq.address || !exchangeReq.tellerIDst 
            || !exchangeReq.debitCurrency || !exchangeReq.currencyPaid){
                return next(new appError('Enter required fields!', 404))
            }
        
        // calculate exchange amount
        let LCYamount
        let FCYamount
        let dealRate
        let paidAmount
        if(exchangeReq.debitCurrency == 12 || exchangeReq.debitCurrency == '12') { // 12 - VND
            //VND
            if(!exchangeReq.debitAmtLCY || !exchangeReq.debitDealRate){
                return next(new appError('Debit_Amount_LCY and Debit_Deal_Rate are required!', 404))
            }
            LCYamount = parseFloat(exchangeReq.debitAmtLCY)
            dealRate = parseFloat(exchangeReq.debitDealRate)
            FCYamount = LCYamount / dealRate
            paidAmount = FCYamount
        }else{
            // != VND
            if(!exchangeReq.debitAmtFCY || !exchangeReq.creditDealRate){
                return next(new appError('Debit_Amount_FCY and Credit_Deal_Rate are required!', 404))
            }
            FCYamount = parseFloat(exchangeReq.debitAmtFCY)
            dealRate = parseFloat(exchangeReq.creditDealRate)
            LCYamount = FCYamount * dealRate
            paidAmount = LCYamount
        }

        // Calculate ChargeCode
        let ccVatAmount = 0, ccTotalAmount = 0, ccAmount = 0
        if(exchangeReq.ccAmount){
            ccAmount = parseInt(exchangeReq.ccAmount)
            ccVatAmount = 0.1 * parseInt(exchangeReq.ccAmount)
            console.log(ccVatAmount)
            ccTotalAmount = parseInt(exchangeReq.ccAmount) + ccVatAmount
        }
        // Store charge Collection
        const newChargeCollection = await chargeCollectionModel.create({
            ChargeAmountLCY: ccAmount,
            DealRate: exchangeReq.ccDealRate,
            VatAmountLCY: ccVatAmount,
            TotalAmountLCY: ccTotalAmount,
            VatSerialNo: exchangeReq.ccVatSerialNo,
            Category: exchangeReq.ccCategory,
            Status: 2,
            Type: 1
        })
        const ccID = newChargeCollection.getDataValue('id')
        const newCCfrAccount = await chargeCollectionfrAccountModel.create({
            chargeID: ccID
        })
        let chargeID = null
        if(newChargeCollection){
            chargeID = newChargeCollection.getDataValue('id')
        }

        // Store to database
        const newExchange = await foreignExchangeModel.create({
            CustomerName: exchangeReq.customerName, 
            Address: exchangeReq.address,
            PhoneNo: exchangeReq.phoneNo, 
            TellerIDst: exchangeReq.tellerIDst,
            DebitAmtLCY: LCYamount,
            DebitAmtFCY: FCYamount,
            DebitDealRate: exchangeReq.debitDealRate,
            TellerIDnd: exchangeReq.tellerIDnd,
            CreditDealRate: exchangeReq.creditDealRate,
            AmountPaidToCust: paidAmount,
            Narrative: exchangeReq.narrative,
            DebitCurrencyID: exchangeReq.debitCurrency,
            CurrencyPaidID: exchangeReq.currencyPaid,
            DebitAccount: exchangeReq.debitAccount,
            CreditAccount: exchangeReq.creditAccount,
            ChargeCollectionID: chargeID,
            Status: 1
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        // UPDATE REF ID
        const exchangeID = newExchange.getDataValue('id')
        let refTemp = exchangeID.toString().padStart(6, '0')
        const refID = `TT.22299.${refTemp}`
        const updatedExchange = await newExchange.update({
            RefID: refID
        })

        return res.status(200).json({
            message: 'foreign exchange', 
            data: updatedExchange
        })
    }),

    //[GET] /exchange/:exchange
    get: asyncHandler(async (req, res, next) => {
        const exchangeIDReq = req.params.exchange
        if(!exchangeIDReq){
            return next(new appError('Exchange ID is required!', 404))
        }

        const exchangeDB = await foreignExchangeModel.findByPk(exchangeIDReq)
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'exchange',
            data: exchangeDB
        })
    }), 

    // [POST] /exchange/enquiry
    enquiry: asyncHandler( async (req, res, next) => {
        // const enquiryReq = {
        //     debitCurrency: req.body.debitCurrency,
        //     currencyPaid: req.body.currencyPaid, 
        //     status: req.body.status
        // }
        // let enquiryObj = {}
        // if(enquiryReq.debitCurrency){
        //     enquiryObj.DebitCurrencyID = enquiryReq.debitCurrency
        // }
        // if(enquiryReq.currencyPaid){
        //     enquiryObj.CurrencyPaidID = enquiryReq.currencyPaid
        // }
        // if(enquiryReq.status){
        //     enquiryObj.Status = enquiryReq.status
        // }

        await foreignExchangeModel.findAll()
        .then(exchangesDB => {
            console.log(exchangesDB)
            return res.status(200).json({
                message: 'enquiry exchange',
                data: exchangesDB
            })
        })
        .catch(err => {
            return res.status(404).json({
                message: 'enquiry exchange',
                data: err
            })
        })

        // const exchangesDB = await foreignExchangeModel.findAll({
        //     include: [{
        //         model: currencyModel, as: 'DebitCurrency', attributes: ['Name']
        //     }, {
        //         model: currencyModel, as: 'CurrencyPaid', attributes: ['Name']
        //     }, {
        //         model: statusTypeModel, attributes: ['Name']
        //     }]
        // })
        // .catch(err => {
        //     return next(new appError(err, 404))
        // })

        
    }),


    // [PUT] /exchange/validate/:exchange
    validate: asyncHandler(async (req, res, next) => {
        const exchangeIDReq = req.params.exchange
        const statusReq = req.body.status
        if(!exchangeIDReq) {
            return next(new appError('Exchange ID is required!', 404))
        }

        const exchangeDB = await foreignExchangeModel.findByPk(exchangeIDReq)
        .catch(err => {
            return next(new appError(err, 404))
        })

        const updatedExchangeDB = await exchangeDB.update({
            Status: statusReq
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'validate exchange',
            data: updatedExchangeDB
        })
    })
}

module.exports = foreignExchangeController
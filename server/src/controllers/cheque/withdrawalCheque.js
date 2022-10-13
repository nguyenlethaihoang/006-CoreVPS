const chequeModel = require('../../models/cheque/cheque')
const chequeItemModel = require('../../models/cheque/chequeItem')
const withdrawalChequeModel = require('../../models/cheque/withdrawal')
const debitAccountModel = require('../../models/account/debitAccount')
const asyncHandler = require('../../utils/async')
const AppError = require('../../utils/appError')
const customerModel = require('../../models/customer/customer')
const Currency = require('../../models/storage/currency')
const { Op } = require('sequelize')

const withdrawalChequeController = {
    withdrawal: asyncHandler(async (req, res, next) => {
        const withdrawalReq = {
            chequeID: req.body.chequeID, //require
            chequeNo: req.body.chequeNo? req.body.chequeNo: null, // require
            amountLCY: req.body.amountLCY, 
            chequeType: req.body.chequeType,
            tellerID: req.body.tellerID,
            dealRate: req.body.dealRate? req.body.dealRate: 1,
            waiveCharges: req.body.waiveCharges,
            narrative: req.body.narrative,
            currency: req.body.currency,
            currencyPaid: req.body.currencyPaid,
            beneficiaryName: req.body.beneficiaryName,
            beneficiaryAddress: req.body.beneficiaryAddress,
            beneficiaryLegalID: req.body.beneficiaryLegalID,
            issuedDate: req.body.issuedDate,
            placeOfIssue: req.body.placeOfIssue
        }
        // CHECK CHEQUE STATUS
        const chequeDB = await chequeModel.findOne({
            where: {ChequeID: withdrawalReq.chequeID}
        })
        if(chequeDB.getDataValue('Status') != 2){
            return res.status(404).json({
                message: 'Cheque invalid'
            })
        }
        // CHECK STATUS CHEQUE_ID + CHEQUE_NO 
        if(!withdrawalReq.chequeID || !withdrawalReq.chequeNo){
            return res.status(404).json({
                message: 'Cheque_ID and Cheque_No are required'
            })
        }
        const chequeItemDB = await chequeItemModel.findOne({
            where: {
                ChequeID: withdrawalReq.chequeID,
                ChequeNo: withdrawalReq.chequeNo
            },
            include: [{
                model: chequeModel, 
                include: [{
                    model: debitAccountModel
                }]
            }]
        })
        if(!chequeItemDB){
            return res.status(404).json({
                message: 'cheque not found'
            })
        }
        console.log('chequeItem')
        console.log(chequeItemDB)

        const chequeItemID = chequeItemDB.getDataValue('id')
        const chequeItemStatus = chequeItemDB.getDataValue('ChequeStatus')
        if(chequeItemStatus == 'used'){
            return res.status(404).json({
                message: 'Cheque was used'
            })
        }
        // UPDATE STATUS CHEQUE ITEM

        const updatedChequeItem = await chequeItemDB.update({
            ChequeStatus: 'used'
        })
        // GET AMOUNT - DEBIT ACCOUNT
        const chequeObj = chequeItemDB.get('CHEQUE')
        const workingAmountDB = parseInt(chequeObj.DEBITACCOUNT.WorkingAmount)
        // CALCULATE
        const newBalance = workingAmountDB - parseInt(withdrawalReq.amountLCY)
        // CREATE CHEQUE_WITHDRAWAL
        const newWithdrawal = await withdrawalChequeModel.create({
            ChequeID: withdrawalReq.chequeID,
            ChequeNo: withdrawalReq.chequeNo,
            AmountLCY: withdrawalReq.amountLCY,
            OldBalance: workingAmountDB,
            NewBalance: newBalance,
            ChequeType: withdrawalReq.chequeType,
            TellerID: withdrawalReq.tellerID,
            DealRate: withdrawalReq.dealRate,
            PaidAmount: withdrawalReq.amountLCY,
            WaiveCharges: withdrawalReq.waiveCharges,
            Narrative: withdrawalReq.narrative,
            CustomerAccount: chequeObj.WorkingAccount,
            Currency: withdrawalReq.currency,
            CurrencyPaid: withdrawalReq.currencyPaid,
            ChequeItem: chequeItemID,
            Status: 1,
            BeneficiaryName: withdrawalReq.beneficiaryName,
            BeneficiaryAddress: withdrawalReq.beneficiaryAddress,
            BeneficiaryLegalID: withdrawalReq.beneficiaryLegalID,
            IssuedDate: withdrawalReq.issuedDate,
            PlaceOfIssue: withdrawalReq.placeOfIssue

        })

        return res.status(200).json({
            message: 'withdrawal',
            data: newWithdrawal
        })

    }), 
    validate: asyncHandler(async (req, res, next) => {
        const withdrawalIDReq = req.params.id
        const statusReq = req.body.status

        // GET FROM DATABASE
        const withdrawalDB = await withdrawalChequeModel.findByPk(withdrawalIDReq)
        if(!withdrawalDB){
            return res.status(404).json({
                message: 'Withdrawal not found'
            })
        }

        // CHECK STATUS
        const statusDB = withdrawalDB.getDataValue('Status')
        if(statusDB != 1){
            return res.status(404).json({
                message: 'Validated'
            })
        }

        // SET STATUS_WITHDRAWAL
        const updatedWithdrawal = await withdrawalDB.update({
            Status: statusReq
        })
        if(statusReq == 3){ // invalid
            return res.status(200).json({
                message: "validated",
                data: updatedWithdrawal
            })
        }else if(statusReq == 2){
            //UPDATE WORKING AMOUNT - DEBIT ACCOUNT
            const workingAccount = withdrawalDB.getDataValue('CustomerAccount')
            const workingAccountDB = await debitAccountModel.findByPk(workingAccount)
            if(!workingAccountDB){
                return res.status(404).json({
                    message: 'Working Account Error'
                })
            }
        
            const workingAmountDB = parseInt(workingAccountDB.getDataValue('WorkingAmount'))
            const actualBalanceDB = parseInt(workingAccountDB.getDataValue('ActualBalance'))
            const amountDB = parseInt(withdrawalDB.getDataValue('AmountLCY'))

            const updatedWorkingAccount = await workingAccountDB.update({
                WorkingAmount: workingAmountDB - amountDB,
                ActualBalance: actualBalanceDB - amountDB
            })

            return res.status(200).json({
                message: 'validated',
                data: updatedWithdrawal,
                workingAccount: updatedWorkingAccount
            })
        }
    }),
    
    getID: asyncHandler(async(req, res, next) => {
        const withdrawalIDReq = req.params.id
        const withdrawalDB = await withdrawalChequeModel.findByPk(withdrawalIDReq, {
            include: [{
                model: debitAccountModel, attributes: ['CustomerID'], 
                include: [{
                    model: customerModel, as: 'Customer', attributes: ['GB_FullName']
                }]
            }, {
                model: Currency, as: 'Currencyt', attributes: ['Name']
            }, {
                model: Currency, as: 'CurrencyPaidt', attributes: ['Name']
            }]
        })
        if(!withdrawalDB){
            return res.status(404).json({
                message: 'Error'
            })
        }

        return res.status(200).json({
            message: 'Get withdrawal',
            data: withdrawalDB
        })
    }), 
    enquiry: asyncHandler(async(req, res, next) => {
        const enquiryReq = {
            withdrawalID: req.body.withdrawalID,
            customerID: req.body.customerID,
            chequeType: req.body.chequeType,
            workingAccount: req.body.workingAccount,
            customerName: req.body.customerName,
            legalID: req.body.legalID,
            chequeNo: req.body.chequeNo,
            withdrawalDate: req.body.withdrawalDate,
            amountfr: req.body.amountfr,
            amountto: req.body.amountto
        }

        let withdrawalCond = {}, customerCond = {}
        if(enquiryReq.withdrawalID){
            withdrawalCond.id = enquiryReq.withdrawalID
        }
        if(enquiryReq.customerID){
            customerCond.id = enquiryReq.customerID
        }
        if(enquiryReq.chequeType){
            withdrawalCond.ChequeType = enquiryReq.chequeType
        }
        if(enquiryReq.workingAccount){
            withdrawalCond.CustomerAccount = enquiryReq.workingAccount
        }
        if(enquiryReq.customerName){
            customerCond.GB_FullName = {[Op.substring]: enquiryReq.customerName  }
        }
        if(enquiryReq.legalID){
            withdrawalCond.LegalID = enquiryReq.legalID
        }
        if(enquiryReq.chequeNo){
            withdrawalCond.ChequeNo = enquiryReq.chequeNo
        }
        if(enquiryReq.withdrawalDate){
            console.log(enquiryReq.withdrawalDate)
            withdrawalCond.createdAt = {[Op.substring]: `${enquiryReq.withdrawalDate}`}
        }
        if(enquiryReq.amountfr && enquiryReq.amountto){
            console.log('amount')
            withdrawalCond.AmountLCY = {[Op.between]: [parseInt(enquiryReq.amountfr), parseInt(enquiryReq.amountto)]}
        }

        const withdrawalsDB = await withdrawalChequeModel.findAll({
            where: withdrawalCond,
            include: [{
                model: debitAccountModel, attributes: ['CustomerID'], 
                include: [{
                    model: customerModel, as: 'Customer', attributes: ['GB_FullName'],
                    where: customerCond
                }]
            }, {
                model: Currency, as: 'Currencyt', attributes: ['Name']
            }, {
                model: Currency, as: 'CurrencyPaidt', attributes: ['Name']
            }]
        })

        let withdrawalsArrDB = []
        withdrawalsDB.map(item => {
            const debitAccountItem = item.get('DEBITACCOUNT')
            if(debitAccountItem){
                withdrawalsArrDB.push(item)
            }
        })

        return res.status(200).json({
            message: 'Get withdrawal',
            data: withdrawalsArrDB
        })

    })
}


module.exports = withdrawalChequeController
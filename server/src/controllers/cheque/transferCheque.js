const chequeModel = require('../../models/cheque/cheque')
const chequeItemModel = require('../../models/cheque/chequeItem')
const transferChequeModel = require('../../models/cheque/transfer')
const debitAccountModel = require('../../models/account/debitAccount')
const asyncHandler = require('../../utils/async')
const AppError = require('../../utils/appError')
const customerModel = require('../../models/customer/customer')
const currencyModel = require('../../models/storage/currency')
const {Op} = require('sequelize')

const transferChequeController = {
    transfer: asyncHandler(async(req, res, next) => {
        const transferReq = {
           chequeID: req.body.chequeID,
           chequeNo: req.body.chequeNo,
           debitAmount: req.body.debitAmount,
           paidAmount: req.body.paidAmount,
           chequeType: req.body.chequeType? req.body.chequeType : 'CC',
           valueDate: req.body.valueDate,
           dealRate: req.body.dealRate,
           creditAccount: req.body.creditAccount,
           waiveCharges: req.body.waiveCharges,
           exposureDate: req.body.exposureDate,
           narrative: req.body.narrative,
           beneficiaryName: req.body.beneficiaryName,
           beneficiaryAddress: req.body.beneficiaryAddress,
           beneficiaryLegalID: req.body.beneficiaryLegalID,
           issuedDate: req.body.issuedDate,
           placeOfIssue: req.body.placeOfIssue,
           debitCurrency: req.body.debitCurrency,
           creditCurrency: req.body.creditCurrency,
           beneficiaryAccount: req.body.beneficiaryAccount
        }
        if(!transferReq.chequeID || !transferReq.chequeNo){
            return res.status(404).json({
                message: 'Cheque_ID and Cheque_No are required'
            })
        }
        // CHECK CHEQUE STATUS
        const chequeDB = await chequeModel.findOne({
            where: {ChequeID: transferReq.chequeID}
        })
        if(chequeDB.getDataValue('Status') != 2){
            return res.status(404).json({
                message: 'Cheque invalid'
            })
        }
        // CHECK STATUS CHEQUE_ID + CHEQUE_NO (available or used)
        const chequeItemDB = await chequeItemModel.findOne({
            where: {
                ChequeID: transferReq.chequeID,
                ChequeNo: transferReq.chequeNo
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
        const chequeItemID = chequeItemDB.getDataValue('id')
        const chequeItemStatus = chequeItemDB.getDataValue('ChequeStatus')
        if(chequeItemStatus == 'used'){
            return res.status(404).json({
                message: 'Cheque was used'
            })
        }
        // CHECK BENEFICIARY ACCOUNT
        if(transferReq.beneficiaryAccount){
            const beneficiaryAccount = debitAccountModel.findByPk(transferReq.beneficiaryAccount)
            if(!beneficiaryAccount){
                return res.status(404).json({
                    message: 'Beneficiary Account not found'
                })
            }
        }


        // UPDATE STATUS CHEQUE ITEM

        const updatedChequeItem = await chequeItemDB.update({
            ChequeStatus: 'used'
        })

        // GET AMOUNT - DEBIT ACCOUNT
        const chequeObj = chequeItemDB.get('CHEQUE')
        console.log(chequeObj)
        const workingAmountDB = parseInt(chequeObj.DEBITACCOUNT.WorkingAmount)
        console.log('WorkingAmount')
        console.log(workingAmountDB)
        // CALCULATE
        const newBalance = workingAmountDB - parseInt(transferReq.paidAmount)
        // CREATE CHEQUE_WITHDRAWAL
        const newTransfer = await transferChequeModel.create({
            ChequeID: transferReq.chequeID,
            ChequeNo: transferReq.chequeNo,
            DebitAmount: transferReq.debitAmount,
            OldBalance: workingAmountDB,
            NewBalance: newBalance,
            ChequeType: transferReq.chequeType,
            ValueDate: transferReq.valueDate,
            DealRate: transferReq.dealRate,
            CreditAccount: transferReq.creditAccount,
            PaidAmount: transferReq.paidAmount,
            WaiveCharges: transferReq.waiveCharges,
            ExposureDate: transferReq.exposureDate,
            Narrative: transferReq.narrative,
            BeneficiaryName: transferReq.beneficiaryName,
            BeneficiaryAddress: transferReq.beneficiaryAddress,
            BeneficiaryLegalID: transferReq.beneficiaryLegalID,
            IssuedDate: transferReq.issuedDate,
            PlaceOfIssue: transferReq.placeOfIssue,
            DebitAccount: chequeObj.WorkingAccount,
            DebitCurrency: transferReq.debitCurrency,
            CreditCurrency: transferReq.creditCurrency,
            ChequeItem: chequeItemID,
            Status: 1,
            BeneficiaryAccount: transferReq.beneficiaryAccount
        }).catch(err => {
            console.log('err')
            console.log(err)
        })

        // UPDATE REF ID
        const transID = newTransfer.getDataValue('id')
        let refTemp = transID.toString().padStart(6, '0')
        const refID = `TT.22298.${refTemp}`
        const updatedTrans = await newTransfer.update({
            RefID: refID
        })

        return res.status(200).json({
            message: 'transfer',
            data: updatedTrans
        })

    }), 
    validate: asyncHandler(async(req, res, next) => {
        const transferIDReq = req.params.id
        const statusReq = req.body.status

        // GET FROM DATABASE
        const transferDB = await transferChequeModel.findByPk(transferIDReq)
        if(!transferDB){
            return res.status(404).json({
                message: 'Transfer not found'
            })
        }

        // CHECK STATUS
        const statusDB = transferDB.getDataValue('Status')
        if(statusDB != 1){
            return res.status(404).json({
                message: 'Validated'
            })
        }

        // SET STATUS_WITHDRAWAL
        const updatedTransfer = await transferDB.update({
            Status: statusReq
        })
        if(statusReq == 3){ // invalid
            return res.status(200).json({
                message: "validated",
                data: updatedTransfer
            })
        }else if(statusReq == 2){
            //UPDATE WORKING AMOUNT - DEBIT ACCOUNT
            const debitAccountID = transferDB.getDataValue('DebitAccount')
            const debitAccountDB = await debitAccountModel.findByPk(debitAccountID)
            if(!debitAccountDB){
                return res.status(404).json({
                    message: 'Debit Account Error'
                })
            }
        
            const debitworkingAmountDB = parseInt(debitAccountDB.getDataValue('WorkingAmount'))
            const debitactualBalanceDB = parseInt(debitAccountDB.getDataValue('ActualBalance'))
            const amountDB = parseInt(transferDB.getDataValue('PaidAmount'))

            const updatedDebitAccount = await debitAccountDB.update({
                WorkingAmount: debitworkingAmountDB - amountDB,
                ActualBalance: debitactualBalanceDB - amountDB
            })

            //UPDATE WORKING ACCOUNT - BENEFICIARY ACCOUNT
            const beneficiaryID = transferDB.getDataValue('BeneficiaryAccount')
            if(beneficiaryID){
                const beneficiaryDB = await debitAccountModel.findByPk(beneficiaryID)
                if(!beneficiaryDB){
                    return res.status(404).json({
                        message: 'Beneficiary Account Error'
                    })
                }
                const beneworkingAmountDB = parseInt(beneficiaryDB.getDataValue('WorkingAmount'))
                const beneactualBalanceDB = parseInt(beneficiaryDB.getDataValue('ActualBalance'))

                const updatedBeneAccount = await beneficiaryDB.update({
                    WorkingAmount: beneworkingAmountDB + amountDB,
                    ActualBalance: beneactualBalanceDB + amountDB
                })
            }
            
            return res.status(200).json({
                message: 'validated',
                data: updatedTransfer,
                debitAccount: updatedDebitAccount
            })
        }

    }), 
    getID: asyncHandler(async(req, res, next) => {
        const transferIDReq = req.params.id
        const transferDB = await transferChequeModel.findByPk(transferIDReq, {
            include: [{
                model: debitAccountModel, attributes: ['CustomerID', 'WorkingAmount','ActualBalance'], as: 'DebitAccountt',
                include: [{
                    model: customerModel, attributes: ['GB_FullName'], as:'Customer'
                }]
            }, {
                model: debitAccountModel, attributes: ['CustomerID'], as: 'BeneficiaryAccountt', 
                include: [{
                    model: customerModel, attributes:['GB_FullName'], as: 'Customer'
                }]
            }, {
                model: currencyModel, attributes: ['Name'], as: 'DebitCurrencyt'
            }, {
                model: currencyModel, attributes: ['Name'], as: 'CreditCurrencyt'
            }]
        })
        if(!transferDB){
            return res.status(404).json({
                message: 'Transfer not found'
            })
        }
        return res.status(200).json({
            message: 'Transfer',
            data: transferDB
        })
    }), 
    enquiry: asyncHandler(async(req, res, next) => {
        const enquiryReq = {
            transferID: req.body.transferID,
            customerID: req.body.customerID,
            chequeType: req.body.chequeType,
            workingAccount: req.body.workingAccount,
            customerName: req.body.customerName,
            legalID: req.body.legalID,
            chequeNo: req.body.chequeNo,
            transferDate: req.body.withdrawalDate,
            amountfr: req.body.amountfr,
            amountto: req.body.amountto
        }

        let transferCond = {}, customerCond = {}
        if(enquiryReq.transferID){
            transferCond.RefID = enquiryReq.transferID
        }
        if(enquiryReq.customerID){
            customerCond.id = enquiryReq.customerID
        }
        if(enquiryReq.chequeType){
            transferCond.ChequeType = enquiryReq.chequeType
        }
        if(enquiryReq.workingAccount){
            transferCond.DebitAccount = enquiryReq.workingAccount
        }
        if(enquiryReq.customerName){
            customerCond.GB_FullName = {[Op.substring]: enquiryReq.customerName  }
        }
        if(enquiryReq.legalID){
            transferCond.LegalID = enquiryReq.legalID
        }
        if(enquiryReq.chequeNo){
            transferCond.ChequeNo = enquiryReq.chequeNo
        }
        if(enquiryReq.amountfr && enquiryReq.amountto){
            transferCond.DebitAmount = {[Op.between]: [parseInt(enquiryReq.amountfr), parseInt(enquiryReq.amountto)]}
        }

        const transferDB = await transferChequeModel.findAll({
            where: transferCond,
            include: [{
                model: debitAccountModel, attributes: ['CustomerID', 'WorkingAmount','ActualBalance'], as: 'DebitAccountt',
                include: [{
                    model: customerModel, attributes: ['GB_FullName'], as:'Customer', 
                    where: customerCond
                }]
            }, {
                model: debitAccountModel, attributes: ['CustomerID'], as: 'BeneficiaryAccountt', 
                include: [{
                    model: customerModel, attributes:['GB_FullName'], as: 'Customer'
                }, {
                    model: currencyModel, attributes:['Name']
                }]
            }, {
                model: currencyModel, attributes: ['Name'], as: 'DebitCurrencyt'
            }, {
                model: currencyModel, attributes: ['Name'], as: 'CreditCurrencyt'
            }]
        })

        let transferArrDB = []
        transferDB.map(item => {
            const debitAccountItem = item.get('DebitAccountt')
            if(debitAccountItem){
                transferArrDB.push(item)
            }
        })

        return res.status(200).json({
            message: 'Get transfer',
            data: transferArrDB
        })
    })
}

module.exports = transferChequeController
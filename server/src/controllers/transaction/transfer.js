const depositModel = require('../../models/transaction/deposit')
const debitAccountModel = require('../../models/account/debitAccount')
const savingAccountModel = require('../../models/account/savingAccount')
const arrearSAModel = require('../../models/account/ArrearSA')
const periodicSAModel = require('../../models/account/PeriodicSA')
const discountedSAModel = require('../../models/account/DiscountedSA')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')

const chargeCollectionModel = require('../../models/chargeCollection/chargeCollection')
const chargeCollectionfrAccountModel = require('../../models/chargeCollection/chargeCollectionfrAccount')
const transferTransModel = require('../../models/transaction/transfer')
const AppError = require('../../utils/appError')


const transferTransController = {
    create: asyncHandler(async (req, res, next) => {
        const transferReq = {
            accountType: req.body.accountType, //int
            debitAccount: req.body.debitAccount, //text
            transferAmount: req.body.transferAmount, //(debitAmount) int
            paidAmount: req.body.paidAmount,
            creditAccount: req.body.creditAccount,
            dealRate: req.body.dealRate, //float
            valueDate: req.body.valueDate, //ex: "2022/05/09"
            waiveCharges: req.body.waiveCharges, //bool
            narrative: req.body.narrative, //text
            ccAmount: req.body.ccAmount,
            ccCategory: req.body.ccCategory,
            ccDealRate: req.body.ccDealRate,
            ccVatSerialNo: req.body.ccVatSerialNo
        }

        if(!transferReq.debitAccount || !transferReq.creditAccount || !transferReq.transferAmount){
            return next(new appError("Debit_Account, Credit_Account and Debit Amount are required!"), 404)
        }

        if(transferReq.debitAccount == transferReq.creditAccount){
            return next(new appError("Credit Account invalid", 404))
        }

        const debitAccountDB = await debitAccountModel.findByPk(transferReq.debitAccount)
        if(!debitAccountDB){
            return next(new AppError("Debit Account not found", 404))
        }
        const creditAccountDB = await debitAccountModel.findByPk(transferReq.creditAccount)
        if(!creditAccountDB){
            return next(new AppError("Credit Account not found", 404))
        }

        const custAmountDB = parseInt(debitAccountDB.getDataValue("WorkingAmount"))
        console.log("Working Amount")
        console.log(custAmountDB)

        if(transferReq > custAmountDB){
            return next(new AppError("invalid Amount!", 404))
        }

        // Calculate ChargeCode
        let ccVatAmount = 0, ccTotalAmount = 0, ccAmount = 0
        if(transferReq.ccAmount){
            ccAmount = parseInt(transferReq.ccAmount)
            ccVatAmount = 0.1 * parseInt(transferReq.ccAmount)
            console.log(ccVatAmount)
            ccTotalAmount = parseInt(transferReq.ccAmount) + ccVatAmount
        }
        // Store charge Collection
        const newChargeCollection = await chargeCollectionModel.create({
            ChargeAmountLCY: ccAmount,
            DealRate: transferReq.ccDealRate,
            VatAmountLCY: ccVatAmount,
            TotalAmountLCY: ccTotalAmount,
            VatSerialNo: transferReq.ccVatSerialNo,
            Category: transferReq.ccCategory,
            Account: transferReq.debitAccount,
            AccountType: transferReq.accountType,
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

        const newTransfer = await transferTransModel.create({
            DebitAccount: transferReq.debitAccount,
            CreditAccount: transferReq.creditAccount,
            InitialAmount: custAmountDB,
            TransferAmount: transferReq.transferAmount,
            NewAmount: custAmountDB - transferReq.paidAmount,
            ValueDate: transferReq.valueDate,
            DealRate: transferReq.dealRate,
            CreditAmount: transferReq.paidAmount,
            WaiveCharges: transferReq.waiveCharges,
            Narrative: transferReq.narrative,
            AccountType: transferReq.accountType,
            ChargeCollectionID: chargeID,
            Status: 1
        })
        
        return res.status(200).json({
            message: 'create transfer',
            data: newTransfer
        })

    }),

    // 1. Update WorkingAmount DebitAccount
    // 2. Update WorkingAmount CreditAccount
    // 3. Update Status
    validate: asyncHandler(async (req, res, next) => {
        const transferIDReq = req.params.transfer
        const statusReq = req.body.status

        const transferDB = await transferTransModel.findByPk(transferIDReq)
        
        if(!transferDB) {
            return next(new appError('Transfer Transaction not found!', 404))
        }

        // CHECK STATUS
        const currentStatus = transferDB.getDataValue('Status')
        if(currentStatus != 1){
            return next(new appError('Validated!', 404))
        }

        if (statusReq == 2){
            const debitAccountID = transferDB.getDataValue('DebitAccount')
            const creditAccountID = transferDB.getDataValue('CreditAccount')


            const debitAccountDB = await debitAccountModel.findByPk(debitAccountID)
            const creditAccountDB = await debitAccountModel.findByPk(creditAccountID)

            const transferAmountDB = transferDB.getDataValue('CreditAmount')
            const chargeID = transferDB.getDataValue('ChargeCollectionID')
            const chargeDB = await chargeCollectionModel.findByPk(chargeID)
            let chargeAmount = 0
            if(chargeDB){
                chargeAmount = parseInt(chargeDB.getDataValue('TotalAmountLCY'))
            }

            // UPDATE WORKING AMOUNT DEBIT ACCOUNT
            const transferAmountDebit = parseInt(transferDB.getDataValue('TransferAmount'))
            const initialWorkingAmountDebitDB =parseInt(debitAccountDB.getDataValue('WorkingAmount'))
            const initialActualBalanceDebitDB = parseInt(debitAccountDB.getDataValue('ActualBalance'))
            const updatedDebitAccount = await debitAccountDB.update({
                WorkingAmount: initialWorkingAmountDebitDB - transferAmountDebit - chargeAmount,
                ActualBalance: initialActualBalanceDebitDB - transferAmountDebit - chargeAmount
            })
            .catch(err => {
                return next(new appError(err, 404))
            })

            

            // UPDATE WORKING AMOUNT CREDIT ACCOUNT
            const initialWorkingAmountCreditDB = parseInt(creditAccountDB.getDataValue('WorkingAmount'))
            const initialActualBalanceCreditDB = parseInt(creditAccountDB.getDataValue('ActualBalance'))
            const updatedCreditAccount = await creditAccountDB.update({
                WorkingAmount: initialWorkingAmountCreditDB + transferAmountDB,
                ActualBalance: initialActualBalanceCreditDB + transferAmountDB
            })
            .catch(err => {
                return next(new appError(err, 404))
            })


            // UPDATE STATUS
            const updatedTransferDB = await transferDB.update({
                Status: statusReq
            })
            .catch(err => {
                return next(new appError(err, 404))
            })

            return res.status(200).json({
                message: 'updated',
                data: {
                    Transfer: updatedTransferDB,
                    DebitAccount: updatedDebitAccount,
                    CreditAccount: updatedCreditAccount
                }
            })

        }else if(statusReq == 1 || statusReq == 3){

            // UPDATE STATUS
            const updatedTransferDB = await transferDB.update({
                Status: statusReq
            })
            .catch(err => {
                return next(new appError(err, 404))
            })

            return res.status(200).json({
                message: 'updated',
                data: {
                    Transfer: updatedTransferDB
                }
            })
        }else {
            return next(new appError('Status invalid !', 404))
        }

    })
    
}

module.exports = transferTransController


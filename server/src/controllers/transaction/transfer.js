const depositModel = require('../../models/transaction/deposit')
const debitAccountModel = require('../../models/account/debitAccount')
const savingAccountModel = require('../../models/account/savingAccount')
const arrearSAModel = require('../../models/account/ArrearSA')
const periodicSAModel = require('../../models/account/PeriodicSA')
const discountedSAModel = require('../../models/account/DiscountedSA')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')

const transferTransModel = require('../../models/transaction/transfer')
const AppError = require('../../utils/appError')


const transferTransController = {
    create: asyncHandler(async (req, res, next) => {
        const transferReq = {
            accountType: req.body.accountType, //int
            debitAccount: req.body.debitAccount, //text
            transferAmount: req.body.transferAmount, //(debitAmount) int
            creditAccount: req.body.creditAccount,
            dealRate: req.body.dealRate, //float
            valueDate: req.body.valueDate, //ex: "2022/05/09"
            waiveCharges: req.body.waiveCharges, //bool
            narrative: req.body.narrative //text
        }

        if(!transferReq.debitAccount || !transferReq.creditAccount || !transferReq.transferAmount){
            return next(new appError("Debit_Account, Credit_Account and Debit Amount are required!"), 404)
        }

        if(transferReq.debitAccount == transferReq.creditAccount){
            return next(new appError("Credit Account invalid", 404))
        }

        const debitAccountDB = await debitAccountModel.findByPk(transferReq.debitAccount)
        .catch(err => {
            return next(new appError(err, 404))
        })
        const creditAccountDB = await debitAccountModel.findByPk(transferReq.creditAccount)
        .catch(err => {
            return next(new appError(err, 404))
        })

        const custAmountDB = parseInt(debitAccountDB.getDataValue("WorkingAmount"))
        console.log("Working Amount")
        console.log(custAmountDB)

        if(transferReq > custAmountDB){
            return next(new AppError("invalid Amount!", 404))
        }

        const newTransfer = await transferTransModel.create({
            DebitAccount: transferReq.debitAccount,
            CreditAccount: transferReq.creditAccount,
            InitialAmount: custAmountDB,
            TransferAmount: transferReq.transferAmount,
            NewAmount: custAmountDB - transferReq.transferAmount,
            ValueDate: transferReq.valueDate,
            DealRate: transferReq.dealRate,
            CreditAmount: transferReq.transferAmount,
            WaiveCharges: transferReq.waiveCharges,
            Narrative: transferReq.narrative,
            AccountType: transferReq.accountType,
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

            const transferAmountDB = transferDB.getDataValue('TransferAmount')

            // UPDATE WORKING AMOUNT DEBIT ACCOUNT
            const initialWorkingAmountDebitDB =parseInt(debitAccountDB.getDataValue('WorkingAmount'))
            const initialActualBalanceDebitDB = parseInt(debitAccountDB.getDataValue('ActualBalance'))
            const updatedDebitAccount = await debitAccountDB.update({
                WorkingAmount: initialWorkingAmountDebitDB - transferAmountDB,
                ActualBalance: initialActualBalanceDebitDB - transferAmountDB
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


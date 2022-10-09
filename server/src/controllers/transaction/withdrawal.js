const withdrawalTransModel = require('../../models/transaction/withdrawal')
const debitAccountModel = require('../../models/account/debitAccount')
const arrearSAModel = require('../../models/account/ArrearSA')
const periodicSAModel = require('../../models/account/PeriodicSA')
const discountedSAModel = require('../../models/account/DiscountedSA')
const chargeCollectionModel = require('../../models/chargeCollection/chargeCollection')
const chargeCollectionfrAccountModel = require('../../models/chargeCollection/chargeCollectionfrAccount')
const appError = require('../../utils/appError')
const asyncHandler = require('../../utils/async')

// KTRA SO TIEN RUT
const withdrawalController = {
    create: asyncHandler(async (req, res, next) => {
        const withdrawalReq = {
            accountType: req.body.accountType,
            account: req.body.account,
            amount: req.body.amount,
            narrative: req.body.narrative,
            tellerID: req.body.tellerID,
            cashAccount: req.body.cashAccount,
            dealRate: req.body.dealRate,
            waiveCharges: req.body.waiveCharges,
            print: req.body.print,
            ccAmount: req.body.ccAmount,
            ccCategory: req.body.ccCategory,
            ccDealRate: req.body.ccDealRate,
            ccVatSerialNo: req.body.ccVatSerialNo
        }

        if(!withdrawalReq.account || !withdrawalReq.accountType){
            return next(new appError('Enter required fields', 404))
        }
        if(!withdrawalReq.tellerID){
            withdrawalReq.tellerID = 'Vietvictory'
        }
        if(!withdrawalReq.dealRate){
            withdrawalReq.dealRate = 1
        }

        // SEARCH ACCOUNT
        let accountDB, balanceDB, currencyDB
        if(withdrawalReq.accountType == 1){
            accountDB = await debitAccountModel.findByPk(withdrawalReq.account)
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            balanceDB = accountDB.getDataValue('WorkingAmount')
            currencyDB = accountDB.getDataValue('Currency')
        }else if(withdrawalReq.accountType == 2){
            accountDB = await arrearSAModel.findOne({
                where: {Account: withdrawalReq.account}
            })
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            balanceDB = accountDB.getDataValue('PrincipalAmount')
            currencyDB = accountDB.getDataValue('Currency')

        }else if( withdrawalReq.accountType == 3){
            accountDB = await periodicSAModel.findOne({
                where: {Account: withdrawalReq.account}
            })
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            balanceDB = accountDB.getDataValue('PrincipalAmount')
            currencyDB = accountDB.getDataValue('Currency')
        }else if(withdrawalReq.accountType == 4){
            accountDB = await discountedSAModel.findOne({
                where: {Account: withdrawalReq.account}
            })
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            balanceDB = accountDB.getDataValue('Amount')
            currencyDB = accountDB.getDataValue('Currency')
        }


        //CALCULATE
        const paidAmount = withdrawalReq.amount * withdrawalReq.dealRate
        //CHECK WITHDRAWAL AMOUNT
        if(paidAmount > balanceDB ){
            return next(new appError('Invalid Withdrawal Amount', 404))
        }
        const newAmount = balanceDB - paidAmount

        // Calculate ChargeCode
        let ccVatAmount = 0, ccTotalAmount = 0, ccAmount = 0
        if(withdrawalReq.ccAmount){
            ccAmount = parseInt(withdrawalReq.ccAmount)
            ccVatAmount = 0.1 * parseInt(withdrawalReq.ccAmount)
            console.log(ccVatAmount)
            ccTotalAmount = parseInt(withdrawalReq.ccAmount) + ccVatAmount
        }
        // Store charge Collection
        const newChargeCollection = await chargeCollectionModel.create({
            ChargeAmountLCY: ccAmount,
            DealRate: withdrawalReq.ccDealRate,
            VatAmountLCY: ccVatAmount,
            TotalAmountLCY: ccTotalAmount,
            VatSerialNo: withdrawalReq.ccVatSerialNo,
            Category: withdrawalReq.ccCategory,
            Account: withdrawalReq.account,
            AccountType: withdrawalReq.accountType,
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

        const newWithdrawalTrans = await withdrawalTransModel.create({
            Account: withdrawalReq.account,
            InitialAmount: balanceDB,
            WithdrawalAmount: withdrawalReq.amount,
            PaidAmount: paidAmount,
            NewAmount: newAmount,
            CashAccount: withdrawalReq.cashAccount,
            DealRate: withdrawalReq.dealRate,
            WaiveCharges: withdrawalReq.waiveCharges,
            Narrative: withdrawalReq.narrative,
            TellerID: withdrawalReq.tellerID,
            AccountType: withdrawalReq.accountType,
            Currency: currencyDB,
            CurrencyPaid: currencyDB,
            ChargeCollectionID: chargeID,
            Status: 1
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'create withdrawal transaction',
            data: newWithdrawalTrans
        })
        
    }), 


    // SET STATUS + WITHDRAWAL
    // DISCOUNTED SA - Update lai thong tin lien quan
    validate: asyncHandler(async (req, res, next) => {
        const withdrawalIDReq = req.params.withdrawal
        const statusReq = req.body.status
        if(!statusReq){
            return next(new appError("Status is required!", 404))
        }
        
        const withdrawalDB = await withdrawalTransModel.findByPk(withdrawalIDReq)
        if(!withdrawalDB){
            return next(new appError("Withdrawal not found!", 404))
        }
        const statusDB = (withdrawalDB).getDataValue('Status')
        if(statusDB != 1){ // != spending
            return next(new appError("Validated!", 404))
        }

        // UPDATE STATUS
        const updatedWithdrawal = await  withdrawalDB.update({
            Status: statusReq
        })
        .catch(err => {
            return next(new appError(err, 404))
        })
        const chargeID = withdrawalDB.getDataValue('ChargeCollectionID')
        const chargeDB = await chargeCollectionModel.findByPk(chargeID)
        let chargeAmount = 0
        if(chargeDB){
            chargeAmount = parseInt(chargeDB.getDataValue('TotalAmountLCY'))
        }

        // UPDATE ACCOUNT AMOUNT
        const accountTypeDB = withdrawalDB.getDataValue('AccountType')
        const accountIDDB = withdrawalDB.getDataValue('Account')
        const paidAmountDB = parseInt(withdrawalDB.getDataValue('PaidAmount'))
        let updatedAccount
        if(statusReq == 2){
            if(accountTypeDB == 1){
                const accountDB = await debitAccountModel.findByPk(accountIDDB)
                if(!accountDB){
                    return next(new appError("Account Reference error", 404))
                }

                const workingAmountDB = parseInt(accountDB.getDataValue('WorkingAmount'))
                const actualBalanceDB = parseInt(accountDB.getDataValue('ActualBalance'))

                updatedAccount = await accountDB.update({
                    WorkingAmount: workingAmountDB - paidAmountDB - chargeAmount,
                    ActualBalance: actualBalanceDB - paidAmountDB - chargeAmount
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
            }else if(accountTypeDB == 2){
                const accountDB = await arrearSAModel.findOne({
                    where: {
                        Account: accountIDDB
                    }
                })
                if(!accountDB){
                    return next(new appError("Account Reference error", 404))
                }

                const principalAmountDB = parseInt(accountDB.getDataValue('PrincipalAmount'))

                updatedAccount = await accountDB.update({
                    PrincipalAmount: principalAmountDB - paidAmountDB
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
                
            }else if(accountTypeDB == 3){
                const accountDB = await periodicSAModel.findOne({
                    where: {
                        Account: accountIDDB
                    }
                })
                if(!accountDB){
                    return next(new appError("Account Reference error", 404))
                }

                const principalAmountDB = parseInt(accountDB.getDataValue('PrincipalAmount'))

                updatedAccount = await accountDB.update({
                    PrincipalAmount: principalAmountDB - paidAmountDB
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
            }else if(accountTypeDB == 4){
                const accountDB = await discountedSAModel.findOne({
                    where: {
                        Account: accountIDDB
                    }
                })
                if(!accountDB){
                    return next(new appError("Account Reference error", 404))
                }

                const amountDB = parseInt(accountDB.getDataValue('Amount'))
                const amountLCY = parseInt(accountDB.getDataValue('AmountLCY'))
                const amountFCY = parseInt(accountDB.getDataValue('AmountFCY'))
                if (amountLCY != 0){
                    updatedAccount = await accountDB.update({
                        Amount: amountDB - paidAmountDB,
                        AmountLCY: amountLCY - paidAmountDB,
                    })
                    .catch(err => {
                        return next(new appError(err, 404))
                    })
                }else if(amountFCY != 0){
                    updatedAccount = await accountDB.update({
                        Amount: amountDB - paidAmountDB,
                        AmountFCY: amountFCY - paidAmountDB
                    })
                    .catch(err => {
                        return next(new appError(err, 404))
                    })
                }else{
                    return next(new appError('Discounted Saving Account error', 404))
                }
                
            }else{
                return next(new appError('Account Type DB error', 404))
            }

            return res.status(200).json({
                message: 'validate', 
                data: {
                    updatedAccount: updatedAccount, 
                    updatedWithdrawal: updatedWithdrawal
                }
            })
        } else if( statusReq == 3){
            return res.status(200).json({
                message: 'validate', 
                data: updatedWithdrawal
            })
        } else {
            return res.status(404).json({
                message: 'status not found' 
            })
        }
    })
}

module.exports = withdrawalController
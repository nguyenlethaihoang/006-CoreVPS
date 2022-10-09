const depositModel = require('../../models/transaction/deposit')
const debitAccountModel = require('../../models/account/debitAccount')
const savingAccountModel = require('../../models/account/savingAccount')
const arrearSAModel = require('../../models/account/ArrearSA')
const periodicSAModel = require('../../models/account/PeriodicSA')
const discountedSAModel = require('../../models/account/DiscountedSA')
const chargeCollectionModel = require('../../models/chargeCollection/chargeCollection')
const chargeCollectionfrAccountModel = require('../../models/chargeCollection/chargeCollectionfrAccount')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')
const AppError = require('../../utils/appError')

// CREATE
// VALIDATE => xong moi update gia tri Working Amount cua account
const depositController = {
    create: asyncHandler( async (req, res, next) => {
        const depositReq = {
            accountType: req.body.accountType,
            account: req.body.account,
            amount: req.body.amount,
            dealRate: req.body.dealRate,
            waiveCharges: req.body.waiveCharges,
            currencyDeposited: req.body.currencyDeposited,
            narrative: req.body.narrative,
            tellerID: req.body.tellerID,
            cashAccount: req.body.cashAccount,
            ccAmount: req.body.ccAmount,
            ccCategory: req.body.ccCategory,
            ccDealRate: req.body.ccDealRate,
            ccVatSerialNo: req.body.ccVatSerialNo
        }
        if(!depositReq.accountType || !depositReq.account || !depositReq.amount){
            return next(new appError("Enter required fields", 404))
        }
        


        let debitAccountDB
        let accountDB // Saving Account DB
        let savingAccountDB // Saving Account DB Detail
        let initialAmount
        if(depositReq.accountType == 1){
            debitAccountDB = await debitAccountModel.findByPk(depositReq.account)
            // .catch(err=>{
            //     return next(new appError(err, 404))
            // })

            if(!debitAccountDB){
                return next(new appError("Account not found", 404))
            }

            initialAmount = parseInt(debitAccountDB.getDataValue('WorkingAmount'))
        } else if(depositReq.accountType == 2){
            accountDB = await savingAccountModel.findByPk(depositReq.account)
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            savingAccountDB = await arrearSAModel.findOne({
                Account: depositReq.account
            })
            if(!savingAccountDB){
                return next(new appError("Account not found", 404))
            }
            initialAmount = parseInt(savingAccountDB.getDataValue('PrincipalAmount'))

        } else if(depositReq.accountType == 3){
            accountDB = await savingAccountModel.findByPk(depositReq.account)
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            savingAccountDB = await periodicSAModel.findOne({
                Account: depositReq.account
            })
            if(!savingAccountDB){
                return next(new appError("Account not found", 404))
            }
            initialAmount = parseInt(savingAccountDB.getDataValue('PrincipalAmount'))

        } else if(depositReq.accountType == 4){
            accountDB = await savingAccountModel.findByPk(depositReq.account)
            if(!accountDB){
                return next(new appError("Account not found", 404))
            }

            savingAccountDB = await discountedSAModel.findOne({
                Account: depositReq.account
            })
            if(!savingAccountDB){
                return next(new appError("Account not found", 404))
            }
            initialAmount = parseInt(savingAccountDB.getDataValue('Amount'))
            console.log(savingAccountDB.getDataValue('Amount'))
        } else {
            return next(new appError("Account Type not found", 404))
        }

        // CHARGE CALCULATE
        let ccVatAmount = 0, ccTotalAmount = 0, ccAmount = 0
        if(depositReq.ccAmount){
            ccAmount = parseInt(depositReq.ccAmount)
            ccVatAmount = 0.1 * parseInt(depositReq.ccAmount)
            ccTotalAmount = parseInt(depositReq.ccAmount) + ccVatAmount
        }
        const newChargeCollection = await chargeCollectionModel.create({
            ChargeAmountLCY: ccAmount,
            DealRate: depositReq.ccDealRate,
            VatAmountLCY: ccVatAmount,
            TotalAmountLCY: ccTotalAmount,
            VatSerialNo: depositReq.ccVatSerialNo,
            Category: depositReq.ccCategory,
            Account: depositReq.account,
            AccountType: depositReq.accountType,
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

        
        // Set DealRate
        if(!depositReq.dealRate){
            depositReq.dealRate = 1
        }

        const paidAmount = depositReq.amount * depositReq.dealRate
        
        const newDeposit = await depositModel.create({
            AccountType: depositReq.accountType,
            Account: depositReq.account,
            InitialAmount: initialAmount,
            DepositAmount: depositReq.amount,
            PaidAmount: paidAmount,
            NewAmount: initialAmount + paidAmount,
            DealRate: depositReq.dealRate,
            WaiveCharges: depositReq.waiveCharges,
            Narrrative: depositReq.narrative,
            TellerID: depositReq.tellerID,
            CurrencyDeposited: depositReq.currencyDeposited,
            Status: 1,
            ChargeCollectionID: chargeID
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'inserted',
            data: newDeposit,
            charge: newChargeCollection
        })
    }),

    // VALIDATE
    validate: asyncHandler( async(req, res, next) => {
        const depositID = req.params.deposit
        const depositReq = {
            status: req.body.status
        }
        if(!depositID){
            return next(new appError('Deposit ID is required!', 404))
        }

        const depositDB = await depositModel.findByPk(depositID)
        if(!depositDB){
            return next(new appError('Deposit not found', 404))
        }
        const chargeID = depositDB.getDataValue('ChargeCollectionID')
        const chargeDB = await chargeCollectionModel.findByPk(chargeID)
        let chargeAmount = 0
        if(chargeDB){
            chargeAmount = parseInt(chargeDB.getDataValue('TotalAmountLCY'))
        }
        // CHECK IS VALIDATED
        const status = depositDB.getDataValue('Status')
        console.log(status)
        if(status != 1){
            return next(new appError('Validated', 404))
        }

        // UPDATE DEPOSIT STATUS
        const updatedDeposit = await depositDB.update({
            Status: depositReq.status
        })

        if(depositReq.status != 2 ){
            return res.status(200).json({
                message: "updated",
                data: updatedDeposit
            })
        }

        // UPDATE ACCOUNT
        const paidAmount = parseInt(depositDB.getDataValue('PaidAmount'))
        const accountID = depositDB.getDataValue('Account')
        const accountType = depositDB.getDataValue('AccountType')

        let updatedAccount
        if(accountType == 1){
            const accountDB = await debitAccountModel.findByPk(accountID)
            if(!accountDB){
                return next(new appError("Account error", 404))
            }
            const WorkingAmountDB = parseInt(accountDB.getDataValue('WorkingAmount'))
            const ActualBalanceDB = parseInt(accountDB.getDataValue('ActualBalance'))

            updatedAccount = await accountDB.update({
                WorkingAmount: WorkingAmountDB + paidAmount - chargeAmount,
                ActualBalance: ActualBalanceDB + paidAmount - chargeAmount
            })

        }else if(accountType == 2){
            const accountDB = await arrearSAModel.findOne({
                where: {Account: accountID}
            })
            if(!accountDB){
                return next(new appError("Account error", 404))
            }

            const principalAmountDB = parseInt(accountDB.getDataValue('PrincipalAmount'))
            updatedAccount = await accountDB.update({
                PrincipalAmount: principalAmountDB + paidAmount
            })
        }else if(accountType == 3){
            const accountDB = await periodicSAModel.findOne({
                where: {Account: accountID}
            })
            if(!accountDB){
                return next(new appError("Account error", 404))
            }

            const principalAmountDB = parseInt(accountDB.getDataValue('PrincipalAmount'))
            updatedAccount = await accountDB.update({
                PrincipalAmount: principalAmountDB + paidAmount
            })
        }else if(accountType == 4){
            const accountDB = await discountedSAModel.findOne({
                where: {Account: accountID}
            })
            if(!accountDB){
                return next(new appError("Account error", 404))
            }

            const amountDB = parseInt(accountDB.getDataValue('Amount'))
            const amountLCY = parseInt(accountDB.getDataValue('AmountLCY'))
            const amountFCY = parseInt(accountDB.getDataValue('AmountFCY'))
            if (amountLCY != 0){
                updatedAccount = await accountDB.update({
                    Amount: amountDB + paidAmount,
                    AmountLCY: amountLCY + paidAmount
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
            }else if(amountFCY != 0){
                updatedAccount = await accountDB.update({
                    Amount: amountDB + paidAmount,
                    AmountFCY: amountFCY + paidAmount
                })
                .catch(err => {
                    return next(new appError(err, 404))
                })
            }else{
                return next(new appError('Discounted Saving Account error', 404))
            }
        }else{
            return next(new appError('Account not found!', 404))
        }
        

        return res.status(200).json({
            message: 'validate deposit',
            data:{
                deposit: updatedDeposit,
                account: updatedAccount
            }
        })
    })

    //ENQUIRY
} 

module.exports = depositController
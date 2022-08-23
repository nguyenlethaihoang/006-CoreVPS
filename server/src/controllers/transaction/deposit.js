const depositModel = require('../../models/transaction/deposit')
const debitAccountModel = require('../../models/account/debitAccount')
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
            tellerID: req.body.tellerID
        }
        if(!depositReq.accountType || !depositReq.account || !depositReq.amount){
            return next(new appError("Enter required fields", 404))
        }
        let accountDB
        if(depositReq.accountType == 1){
            accountDB = await debitAccountModel.findByPk(depositReq.account)
            // .catch(err=>{
            //     return next(new appError(err, 404))
            // })
        }
        if(!accountDB){
            return next(new appError("Account not found", 404))
        }
        const initialAmount = parseInt(accountDB.getDataValue('WorkingAmount'))
        
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
            Status: 1
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'inserted',
            data: newDeposit
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
        
        const paidAmount = parseInt(depositDB.getDataValue('PaidAmount'))
        const accountID = depositDB.getDataValue('Account')
        const accountDB = await debitAccountModel.findByPk(accountID)
        if(!accountDB){
            return next(new appError("Account error", 404))
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
        const WorkingAmountDB = parseInt(accountDB.getDataValue('WorkingAmount'))
        const ActualBalanceDB = parseInt(accountDB.getDataValue('ActualBalance'))

        const updatedAccount = await accountDB.update({
            WorkingAmount: WorkingAmountDB + paidAmount,
            ActualBalance: ActualBalanceDB + paidAmount
        })

        return res.status(200).json({
            message: 'validate deposit',
            data:{
                deposit: updatedDeposit,
                account: updatedAccount
            }
        })

        // ENQUIRY DEPOSIT

    })
} 

module.exports = depositController
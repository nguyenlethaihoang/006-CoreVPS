const depositModel = require('../../models/transaction/deposit')
const withdrawalModel = require('../../models/transaction/withdrawal')
const transferModel = require('../../models/transaction/transfer')
const debitAccountModel = require('../../models/account/debitAccount')
const appError = require('../../utils/appError')
const asyncHandler = require('../../utils/async')
const accountTypeModel = require('../../models/transaction/accountType')
const currencyModel = require('../../models/storage/currency')
const customerModel = require('../../models/customer/customer')
const arrearSAModel = require('../../models/account/ArrearSA')
const periodicSAModel = require('../../models/account/PeriodicSA')
const discountedSAModel = require('../../models/account/DiscountedSA')
const { Op } = require('sequelize')

// TransactionType == 1 => DEPOSIT
// TransactionType == 2 => c


const enquiryTransaction = {
    //DEBIT ACCOUNT
    enquiry: asyncHandler( async (req, res, next) => {
        const enquiryReq = {
            transactionType: req.body.transactionType,
            refID: req.body.refID,  // id transaction
            customerType: req.body.customerType, // C - P
            GB_FullName: req.body.GB_FullName,
            amountFr: req.body.amountFr,
            amountTo: req.body.amountTo,
            accountType: req.body.accountType,
            currency: req.body.currency,
            customerID: req.body.customerID,
            customerAccount: req.body.customerAccount, //debit account
            date: req.body.date
        }



        // if(enquiryReq.principalFrom && enquiryReq.principalTo){
        //     enquiryObject.AmountLCY = {[Op.between]: [enquiryReq.principalFrom, enquiryReq.principalTo]}
        // }



        // TRANSACTION_TYPE REQUIRED
        if(!enquiryReq.transactionType){
            return next(new appError("TransactionType is required!", 404))
        }   

        if(enquiryReq.customerAccount && !enquiryReq.accountType){
            return next(new appError('Account Type required', 404))
        }

        let transactionsRes = []
        if(enquiryReq.transactionType == 1){ //DEPOSIT
            let transCondition = {}
            let cusCondition = {}
            let accountCondition = {}
            if(enquiryReq.refID)  transCondition.id = enquiryReq.refID
            if(enquiryReq.customerType)  cusCondition.CustomerType = enquiryReq.customerType
            if(enquiryReq.GB_FullName)  cusCondition.GB_FullName = enquiryReq.GB_FullName
            if(enquiryReq.accountType)  transCondition.AccountType = enquiryReq.accountType
            if(enquiryReq.currency)   transCondition.CurrencyDeposited = enquiryReq.currency
            if(enquiryReq.customerID)   cusCondition.id = enquiryReq.customerID
            if(enquiryReq.customerAccount)  transCondition.Account = enquiryReq.customerAccount

            if(enquiryReq.amountFr && enquiryReq.amountTo){
                transCondition.DepositAmount = {[Op.between]: [enquiryReq.amountFr, enquiryReq.amountTo]}
            }
            
            const transactionsDB = await depositModel.findAll({
                where: transCondition,
                include: [{
                    model: currencyModel, attributes: ['Name'] 
                }, {
                    model: accountTypeModel, atrributes: ['Name']
                }]
            })
            .catch(err => {
                return next(new appError(err, 404))
            })


            await Promise.all(transactionsDB.map(async (trans, i) => {
                    let accountType_ = trans.getDataValue('AccountType')
                    let accountID = trans.getDataValue('Account')
                    let objRes = {
                        Transaction: trans,
                        Account: null
                    }
                    let accountDB
                    if(accountType_ == 1){
                        accountDB = await debitAccountModel.findByPk(accountID, {
                            where: accountCondition,
                            include: [{
                                model: customerModel, 
                                where: cusCondition,
                                as: 'Customer'
                            }]
                        })
                        .catch(err => {
                            return next(new appError(err, 404))
                        })
                        
                    }else if(accountType_ == 2){
                        accountDB = await arrearSAModel.findByPk(accountID, {
                            where: accountCondition,
                            include: [{
                                model: customerModel, 
                                where: cusCondition
                            }]
                        })
                        .catch(err => {
                            return next(new appError(err, 404))
                        })
                    }else if(accountType_ == 3){
                        accountDB = await periodicSAModel.findByPk(accountID, {
                            where: accountCondition,
                            include: [{
                                model: customerModel, 
                                where: cusCondition
                            }]
                        })
                        .catch(err => {
                            return next(new appError(err, 404))
                        })
                    }else if(accountType_ == 4){
                        accountDB = await discountedSAModel.findByPk(accountID, {
                            where: accountCondition,
                            include: [{
                                model: customerModel, 
                                where: cusCondition
                            }]
                        })
                        .catch(err => {
                            return next(new appError(err, 404))
                        })
                    }else {
                        accountDB = null
                    }

                    if(accountDB !== null){
                        objRes.Account = accountDB
                        transactionsRes.push(objRes)
                    }


                })
            )



        }else if(enquiryReq.transactionType == 2){ //WITHDRAWAL
            let transCondition = {}
            let cusCondition = {}
            let accountCondition = {}
            if(enquiryReq.refID)  transCondition.id = enquiryReq.refID
            if(enquiryReq.customerType)  cusCondition.CustomerType = enquiryReq.customerType
            if(enquiryReq.GB_FullName)  cusCondition.GB_FullName = enquiryReq.GB_FullName
            if(enquiryReq.accountType)  transCondition.AccountType = enquiryReq.accountType
            if(enquiryReq.currency)   transCondition.Currency = enquiryReq.currency
            if(enquiryReq.customerID)   accountCondition.CustomerID = enquiryReq.customerID
            if(enquiryReq.customerAccount)  transCondition.Account = enquiryReq.customerAccount

            if(enquiryReq.amountFr && enquiryReq.amountTo){
                transCondition.WithdrawalAmount = {[Op.between]: [enquiryReq.amountFr, enquiryReq.amountTo]}
            }

            const transactionsDB = await withdrawalModel.findAll({
                where: transCondition,
                include: [{
                    model: accountTypeModel, attributes: ['Name']
                }, {
                    model: currencyModel, as: 'Currencyt', attributes: ['Name']
                }, {
                    model: currencyModel, as: 'CurrencyPaidt', attributes: ['Name']
                }]
            })


            await Promise.all(transactionsDB.map(async (trans, i) => {
                let accountType_ = trans.getDataValue('AccountType')
                let accountID = trans.getDataValue('Account')
                let objRes = {
                    Transaction: trans
                }
                let accountDB
                if(accountType_ == 1){
                    accountDB = await debitAccountModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition,
                            as: 'Customer'
                        }]
                    })
                    
                }else if(accountType_ == 2){
                    accountDB = await arrearSAModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition
                        }]
                    })
                }else if(accountType_ == 3){
                    accountDB = await periodicSAModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition
                        }]
                    })
                }else if(accountType_ == 4){
                    accountDB = await discountedSAModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition
                        }]
                    })
                }else {
                    accountDB = null
                }

                if(accountDB !== null){
                    
                    objRes.Account = accountDB
                    transactionsRes.push(objRes)

                    
                }   

                

            }))

            
            

        }else if(enquiryReq.transactionType == 3){ //TRANSFER
            let transCondition = {}
            let cusCondition = {}
            let accountCondition = {}
            if(enquiryReq.refID)  transCondition.id = enquiryReq.refID
            if(enquiryReq.customerType)  cusCondition.CustomerType = enquiryReq.customerType
            if(enquiryReq.GB_FullName)  cusCondition.GB_FullName = enquiryReq.GB_FullName
            if(enquiryReq.accountType)  transCondition.AccountType = null
            if(enquiryReq.currency)   accountCondition.Currency = enquiryReq.currency
            if(enquiryReq.customerID)   accountCondition.CustomerID = enquiryReq.customerID
            if(enquiryReq.customerAccount)  transCondition.DebitAccount = enquiryReq.customerAccount

            if(enquiryReq.amountFr && enquiryReq.amountTo){
                transCondition.TransferAmount = {[Op.between]: [enquiryReq.amountFr, enquiryReq.amountTo]}
            }

            const transactionsDB = await transferModel.findAll({
                where: transCondition,
                include: [{
                    model: accountTypeModel, attributes: ['Name']
                }]
            })



            await Promise.all(transactionsDB.map(async (trans, i) => {
                let accountType_ = trans.getDataValue('AccountType')
                let accountID = trans.getDataValue('DebitAccount')
                let objRes = {
                    Transaction: trans
                }
                let accountDB
                if(!accountType_) accountType_ = 1
                if(accountType_ == 1){
                    accountDB = await debitAccountModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition,
                            as: 'Customer'
                        }]
                    })
                    
                }else if(accountType_ == 2){
                    accountDB = await arrearSAModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition
                        }]
                    })
                }else if(accountType_ == 3){
                    accountDB = await periodicSAModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition
                        }]
                    })
                }else if(accountType_ == 4){
                    accountDB = await discountedSAModel.findByPk(accountID, {
                        where: accountCondition,
                        include: [{
                            model: customerModel, 
                            where: cusCondition
                        }]
                    })
                }else {
                    accountDB = null
                }


                if(accountDB){
                    objRes.Account = accountDB
                    transactionsRes.push(objRes)
                }

            }))

        }else{
            return next(new appError('transactionType invalid', 404))
        }

        console.log("final")
        console.log(transactionsRes.length)

        return res.status(200).json({
            message: 'enquiry transaction',
            data: transactionsRes
        })

    })
}

module.exports = enquiryTransaction
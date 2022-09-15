const debitAccountModel = require('../../models/account/debitAccount')
const appError = require('../../utils/appError')
const asyncHandler = require('../../utils/async')
const productLineModel = require('../../models/storage/productLine')
const blockageModel = require('../../models/account/blockage')
const sequelize = require('../../database/sequelize')
const closureModel = require('../../models/account/closure')
const customerModel = require('../../models/customer/customer')
const categoryModel = require('../../models/storage/category')
const currencyModel = require('../../models/storage/currency')
const accountOfficerModel = require('../../models/storage/accountOfficer')
const chargeCodeModel = require('../../models/storage/chargeCode')
const relationCodeModel = require('../../models/storage/relation')

// Them quan ly so tien  + lock
// query account của từng customer 
const debitAccountController = {
    // MO TAI KHOAN

    openAccount: asyncHandler( async (req, res, next) => {
        const accountReq = {
            customerID: req.body.customerID,
            category: req.body.category,
            productLine: req.body.productLine,
            currency: req.body.currency,
            accountTitle: req.body.accountTitle,
            shortTitle: req.body.shortTitle,
            accountOfficer: req.body.accountOfficer,
            chargeCode: req.body.chargeCode,
            joinHolder: req.body.joinHolder,
            relationCode: req.body.relationCode,
            joinNotes: req.body.joinNotes
        }
        // product line phai thuoc category

        if(!accountReq.customerID || !accountReq.category || !accountReq.currency){
            return next(new appError("Enter required field!", 404))
        }

        // CHECK VALID PRODUCTLINE - CATEGORY
        const productLineDB = await productLineModel.findByPk(accountReq.productLine)
        if(!productLineDB || productLineDB.getDataValue("Category") != accountReq.category){
            return next(new appError("Product Line or category not found", 404))
        }

        await customerModel.findByPk(accountReq.customerID)
        .catch(err => {
            return next(new appError(err, 404))
        })

        const newDebitAccount = await debitAccountModel.create({
            CustomerID: accountReq.customerID, 
            Category: accountReq.category,
            ProductLine: accountReq.productLine,
            Currency: accountReq.currency,
            AccountTitle: accountReq.accountTitle,
            ShortTitle: accountReq.shortTitle,
            AccountOfficer: accountReq.accountOfficer,
            ChargeCode: accountReq.chargeCode,
            JoinHolderID: accountReq.joinHolder,
            RelationCode: accountReq.relationCode,
            JoinNotes: accountReq.joinNotes,
            WorkingAmount: 0,
            ActualBalance: 0,
            BlockedAmount: 0,
            Status: 'Active'
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: "debit account",
            data: newDebitAccount
        })
    }),

    getAccount: asyncHandler(async (req, res, next) => {
        const accountReq = req.params.account
        const accountDB = await debitAccountModel.findByPk(accountReq,{
            include: [{
                model: customerModel, attributes: ['GB_FullName'], as: 'Customer'
            }]
        })
        // .catch(err => {
        //     return next(new appError(err, 404))
        // })
        if(!accountDB){
            return next(new appError("find err", 404))
        }
        return res.status(200).json({
            message: 'get account',
            data: accountDB
        })
    }),

    //ENQUIRY
    enquiry: asyncHandler(async (req, res, next) => {
        const enquiryReq = {
            account: req.body.account,
            customerType: req.body.customerType,
            customerID: req.body.customerID,
            docID: req.body.docID,
            GB_FullName: req.body.GB_FullName,
            productLine: req.body.productLine,
            category: req.body.category,
            currency: req.body.currency,
            status: req.body.status
        }

        let enquiryString = "Select DEBITACCOUNT.id, Account, CardNumber, AccountTitle, ShortTitle, JoinNotes, Status, WorkingAmount, ActualBalance, BlockedAmount, CATEGORY.Name, PRODUCTLINE.Name, CURRENCY.Name, ACCOUNTOFFICER.Name, CHARGECODE.Name, JoinHolder, RELATION.Name , CUSTOMER.id as CustomerID, GB_FullName, GB_ShortName, DocID from DEBITACCOUNT, CUSTOMER, CATEGORY, PRODUCTLINE, CURRENCY, ACCOUNTOFFICER, CHARGECODE, RELATION where DEBITACCOUNT.CustomerID = CUSTOMER.id and CATEGORY.id = DEBITACCOUNT.Category and PRODUCTLINE.id = DEBITACCOUNT.ProductLine and CURRENCY.id = DEBITACCOUNT.Currency and  CHARGECODE.id = DEBITACCOUNT.ChargeCode and ACCOUNTOFFICER.id = DEBITACCOUNT.AccountOfficer and RELATION.id = DEBITACCOUNT.RelationCode "
        let count = 0

        let enquiryObject = {
            subObject: [],
            condition: {},
            customerCondition: {}
        }
        if(enquiryReq.account){
            // count++
            // enquiryString += 'Account = ' + enquiryReq.account
            enquiryObject.condition.id = enquiryReq.account
        }
        if(enquiryReq.productLine){
            enquiryObject.condition.ProductLine= enquiryReq.productLine
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' ProductLine = ' + enquiryReq.productLine
            // count++
        }
        if(enquiryReq.category){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' Category = ' + enquiryReq.category
            // count++
            enquiryObject.condition.Category= enquiryReq.category
        }
        if(enquiryReq.currency){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' Currency = ' + enquiryReq.currency
            // count++
            enquiryObject.condition.Currency = enquiryReq.currency
        }
        if(enquiryReq.status){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' Status = \'' + enquiryReq.status + '\''
            // count++
            enquiryObject.condition.Status = enquiryReq.status
        }

        // FIND ACCOUNT FROM CUSTOMERID
        if(enquiryReq.customerID){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' DEBITACCOUNT.CustomerID = ' + enquiryReq.customerID
            // count++
            enquiryObject.condition.CustomerID = enquiryReq.customerID
        }
        if(enquiryReq.customerType){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' CustomerType = ' + enquiryReq.customerType
            // count++
            enquiryObject.customerCondition.CustomerType = enquiryReq.customerType
        }
        if(enquiryReq.docID){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' DocID = ' + enquiryReq.docID
            // count++
            enquiryObject.customerCondition.DocID = enquiryReq.docID
        }
        if(enquiryReq.GB_FullName){
            // if(count != 0)
            //     enquiryString += ' AND '
            // enquiryString += ' GB_FullName = ' + enquiryReq.GB_FullName
            // count++
            enquiryObject.customerCondition.GB_FullName = enquiryReq.GB_FullName
        }

        // console.log(enquiryString)
        // const accountsDB = await sequelize.query(enquiryString,{
        //     model: debitAccountModel,
        // })
        // .catch(err => {
        //     console.log(err)
        // })

        const accountsDB = await debitAccountModel.findAll({
            where: enquiryObject.condition,
            include: [{
                model: customerModel, attributes: ['GB_ShortName', 'GB_FullName', 'DocID'], as: 'Customer', 
                where: enquiryObject.customerCondition
            }, {
                model: categoryModel, attributes: ['Name']
            }, {
                model: currencyModel, attributes: ['Name']
            }, {
                model: productLineModel, attributes: ['Name']
            }, {
                model: accountOfficerModel, attributes: ['Name']
            }, {
                model: chargeCodeModel, attributes: ['Name']
            }, {
                model: relationCodeModel, attributes: ['Name']
            }, {
                model: customerModel, attributes: ['GB_ShortName', 'GB_FullName'], as: 'JoinHolder'
            }]
        }).catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'account',
            data: accountsDB
        })
    }),

    // update tai khoan => chuyen Status: pending => validate
    // [PUT] /account/debit_account/update/:account
    update: asyncHandler( async (req, res, next) => {
        const accountReq = req.params.account
        const updateReq = {
            customerID: req.body.customerID,
            category: req.body.category,
            productLine: req.body.productLine,
            currency: req.body.currency,
            accountTitle: req.body.accountTitle,
            shortTitle: req.body.shortTitle,
            accountOfficer: req.body.accountOfficer,
            chargeCode: req.body.chargeCode,
            joinHolder: req.body.joinHolder,
            relationCode: req.body.relationCode,
            joinNotes: req.body.joinNotes
        }
        if(!accountReq){
            return next(new appError('Account ID is required!', 404))
        }
        const accountDB = await debitAccountModel.findByPk(accountReq)
        if(!accountDB){
            return next(new appError('Account not found!', 404))
        }
        const updatedAccount = await accountDB.update({
            CustomerID: updateReq.customerID, 
            Category: updateReq.category,
            ProductLine: updateReq.productLine,
            Currency: updateReq.currency,
            AccountTitle: updateReq.accountTitle,
            ShortTitle: updateReq.shortTitle,
            AccountOfficer: updateReq.accountOfficer,
            ShortTitle: updateReq.shortTitle,
            AccountOfficer: updateReq.accountOfficer,
            ChargeCode: updateReq.chargeCode,
            JoinHolder: updateReq.joinHolder,
            RelationCode: updateReq.relationCode,
            JoinNotes: updateReq.joinNotes
        })
        .catch(err => {
            return next(new appError(err, 404))
        })
        return res.status(200).json({
            message: "updated",
            data: updatedAccount
        })
    }),

    //PHONG TOA TAI KHOAN
    // [POST] /account/debit_account/block/:account
    blockAccount: asyncHandler(async (req, res, next) => {
        const accountReq = req.params.account
        const blockageReq = {
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            amount: req.body.amount,
            notes: req.body.notes
        }
        if(!accountReq){
            return next(new appError("AccountID is required!", 404))
        }

        if(!blockageReq.startDate || !blockageReq.endDate){
            return next(new appError("Start Date and End Date are required!"))
        }

        const accountDB = await debitAccountModel.findByPk(accountReq)
        if(!accountDB){
            return next(new appError("Account not found!", 404))
        }
        if(accountDB.getDataValue('Status') == 'Blocked'){
            return next(new appError('Account is blocked', 404))
        }
        const workingAmountDB = parseInt(accountDB.getDataValue('WorkingAmount'))
        const blockedAmountDB = parseInt(accountDB.getDataValue('BlockedAmount'))
        if(workingAmountDB < blockageReq.amount){
            return next(new appError("Working amount is not enought", 404))
        }

        // CREATE BLOCKAGE INFORMATION
        const newBlockage = await blockageModel.create({
            StartDate: blockageReq.startDate,
            EndDate: blockageReq.endDate,
            Amount: blockageReq.amount,
            Status: 'Blocked',
            Notes: blockageReq.notes,
            Account: accountReq
        })
        .catch(err=>{
            return next(new appError(err, 404))
        })

        // UPDATE ACCOUNT
        const updatedAccount = await accountDB.update({
            WorkingAmount: workingAmountDB - blockageReq.amount,
            BlockedAmount: blockedAmountDB + blockageReq.amount,
            Status: "Blocked"
        })
        .catch(err=>{
            console.log(err)
        })
        return res.status(200).json({
            message: "blocked",
            data: {
                blockage: newBlockage,
                updatedAccount: updatedAccount
            }
        })
    }),


    //GIAI TOA TAI KHOAN
    // [PUT] /account/unblock/:accountID
    unBlockAccount: asyncHandler(async (req, res, next) => {
        const blockageReq = req.params.accountID
        const unblockageReq = {
            relievedDate: req.body.relievedDate,
            notes: req.body.notes
        }
        if(!blockageReq){
            return next(new appError("BlockageID is required!", 404))
        }

        const blockageDB = await blockageModel.findOne({
            where: {Account: blockageReq}
        })
        if(!blockageDB){
            return next(new appError("Blockage not found!", 404))
        }
        const blockageStatus = blockageDB.getDataValue('Status')
        if(blockageStatus == 'unblocked'){
            return next(new appError("Blockage is already unblocked!", 404))
        }
        const updatedBlockage = await blockageDB.update({
            Status: 'unblocked',
            RelievedDate: unblockageReq.relievedDate,
            Notes: unblockageReq.notes
        })
        
        //UPDATE ACCOUNT 
        const accountID = updatedBlockage.getDataValue('Account')
        const accountDB = await debitAccountModel.findByPk(accountID)
        .catch(err=>{
            console.log(err)
        })

        const workingAmountDB = parseInt(accountDB.getDataValue('WorkingAmount'))
        const blockedAmountDB = parseInt(accountDB.getDataValue('BlockedAmount'))
        const amount = parseInt(blockageDB.getDataValue('Amount'))
        const updatedAccount = await accountDB.update({
            WorkingAmount: workingAmountDB + amount,
            BlockedAmount: blockedAmountDB - amount,
            Status: 'Active'
        })
        .catch(err => {
            console.log(err)
        })

        return res.status(200).json({
            message: "unblock",
            data: {
                account: updatedAccount,
                blockage: updatedBlockage
            }
        })
    }),

    //QUERY THONG TIN BLOCKAGE
    //QUERY BY STATUS
    // [GET] /account/get_blocked_amount
    getBlocked: asyncHandler( async (req, res, next) => {
        let sumAmount = 0
        const {count, rows} = await blockageModel.findAndCountAll({
            where: {Status: 'blocked'}
        })
        .catch(err=> {
            return next(new appError(err, 404))
        })
        rows.map(blockage => {
            sumAmount += blockage.getDataValue('Amount')
        })
        return res.status(200).json({
            message: 'get blockage',
            data: {
                totalAmount: sumAmount,
                quantity: count,
                blockage: rows
            }
        })
    }),

    //QUERY BY ACCOUNT
    // [GET] /account/get_blockage/:account
    getBlockageByAccount: asyncHandler( async (req, res, next) => {
        const accountReq = req.params.account
        if(!accountReq){
            return next(new appError("Account ID is required!", 404))
        }
        const accountDB = await debitAccountModel.findByPk(accountReq)
        .catch(err => {
            console.log(err)
        })
        if(!accountDB){
            return next(new appError("Account not found", 404))
        }

        const blockage = await blockageModel.findOne({
            include: [
                {model: debitAccountModel, include: [{
                    model: customerModel, attributes: ['GB_FullName'], as:'Customer'
                }]}
            ],
            where: {Account: accountReq}
        })
        .catch(err=>{
            return next(new appError(err, 404))
        })
        return res.status(200).json({
            message: "blockage infomation",
            data: blockage
        })
    }),
    //DONG TAI KHOAN
    // [PUT] /account/close/:account
    closeAccount: asyncHandler( async (req, res, next) => {
        const accountReq = req.params.account
        const closureReq = {
            paymentType: req.body.paymentType,
            transferredAccount: req.body.transferredAccount,
            closeDate: req.body.closeDate,
            notes: req.body.notes,
        }
        if(!accountReq){
            return next(new appError("Account ID is required!", 404))
        }
        if(!closureReq.paymentType){
            return next(new appError("Payment Type is required!", 404))
        }
        let transferredAccountReq
        if(closureReq.paymentType == 'Cash'){
            transferredAccountReq = null
        }else{
            transferredAccountReq = closureReq.transferredAccount
        }

        const accountDB = await debitAccountModel.findByPk(accountReq)
        // .catch(err=>{
        //     return next(new appError(err, 404))
        // })

        if(accountDB.getDataValue('Status') != 'Active'){
            return next(new appError("Account was closed", 404))
        }

        let transferredAccountDB 
        
        let updatedTransferredAccount 
        if(closureReq.paymentType != 'Cash' && closureReq.transferredAccount){
            transferredAccountDB = await debitAccountModel.findByPk(closureReq.transferredAccount)
            // CHUYEN TIEN DEN TAI KHOAN KHAC
            const workingAmountDB = transferredAccountDB.getDataValue('WorkingAmount')
            updatedTransferredAccount = await transferredAccountDB.update({
                WorkingAmount: workingAmountDB + parseInt(accountDB.getDataValue('WorkingAmount'))
            })
        }else{
            transferredAccountDB = null
        }
        
        // LUU THONG TIN DONG TAI KHOAN
        const newClosure = await closureModel.create({
            PaymentType: closureReq.paymentType,
            TransferredAccount: transferredAccountReq,
            CloseDate: closureReq.closeDate,
            Notes: closureReq.notes,
            RemainingAmount: parseInt(accountDB.getDataValue('WorkingAmount')),
            Account: accountReq
        })

        // CAP NHAT TRANG THAI TAI KHOAN BI DONG
        const closedAccount = await accountDB.update({
            Status: 'closed',
            WorkingAmount: 0,
            ActualBalance: 0
        })

        // LUU THONG TIN CHUYEN TIEN

        return res.status(200).json({
            message: 'close account',
            data: {
                closureInfomation: newClosure,
                closedAccount: closedAccount,
                transferredAccount: updatedTransferredAccount
            }
        })

    })
}

module.exports = debitAccountController
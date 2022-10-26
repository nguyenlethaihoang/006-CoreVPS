const arrearSAModel = require('../../models/account/ArrearSA')
const periodicSAModel = require('../../models/account/PeriodicSA')
const discountedSAModel = require('../../models/account/DiscountedSA')
const savingAccountModel = require('../../models/account/savingAccount')
const accountType = require('../../models/transaction/accountType')
const savingTerm = require('../../models/account/savingTerm')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')
const parameters = require('../../models/parameters')
const categoryModel = require('../../models/storage/category')
const currencyModel = require('../../models/storage/currency')
const productLineModel = require('../../models/storage/productLine')
const customerModel = require('../../models/customer/customer')
const relationCodeModel = require('../../models/storage/relation')
const accountOfficerModel = require('../../models/storage/accountOfficer')
const termModel = require('../../models/account/savingTerm')
const debitAccountModel = require('../../models/account/debitAccount')
const { Op } = require('sequelize')
const ArrearPeriodicClosure = require('../../models/account/closeSA')
const DiscountedClosure = require('../../models/account/closeDiscounted')



function addMonths(number, date = new Date()){
    date.setMonth(date.getMonth() + number)
    return date
}

const savingAccountController = {
    //ARREAR SAVING ACCOUNT
    openArrearSA: asyncHandler( async (req, res, next) => {
        const accountReq = {
            customerID: req.body.customerID,
            category: req.body.category,
            accountTitle: req.body.accountTitle,
            shortTitle: req.body.shortTitle,
            currency: req.body.currency,
            productLine: req.body.productLine,
            joinHolder: req.body.joinHolder,
            relationShip : req.body.relationShip,
            notes: req.body.notes,
            accountOfficer: req.body.accountOfficer,
            product: req.body.product,
            principalAmount: req.body.principalAmount,
            valueDate: req.body.valueDate,
            term: req.body.term,
            interestRate: req.body.interestRate,
            debitAccount: req.body.debitAccount,
            rolloverPR: req.body.rolloverPR,
            paymentCurrency: req.body.paymentCurrency,
            teller: req.body.teller,
            narrative: req.body.narrative,
            accountNo: req.body.accountNo,
            paymentNo: req.body.paymentNo
        }

        //REQUIRE FIELDS
        if(!accountReq.customerID || !accountReq.category || !accountReq.accountTitle 
        || !accountReq.currency || !accountReq.product || !accountReq.principalAmount
        || !accountReq.term){
            return next(new appError('Enter required fields!', 404))
        }

        //CREATE SAVING ACCOUNT
        const newAccount = await savingAccountModel.create({
            CustomerID: accountReq.customerID,
            Status: 1,
            Type: 2
        })
        //UPDATE SAVING ACCOUNT - ACCOUNT
        const newAccountID = newAccount.getDataValue("id")
        let refTemp = newAccountID.toString().padStart(10, '0')
        const refID = `07${refTemp}`
        const updatedAccount = await newAccount.update({
            Account: refID
        })


        // CREATE ACCOUNT NO + PAYMENT NO
        // get current day
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm  + dd + yyyy;
        let accountNoStr = accountReq.customerID + "*" + today + "*BO"
        let accountNo = accountReq.accountNo ? accountReq.accountNo : accountNoStr
        let paymentNoStr = "TT/" + today + "/" + newAccount.getDataValue('id')
        let paymentNo = accountReq.paymentNo ? accountReq.paymentNo : paymentNoStr

        //CALCULATE MATURITY DATE
        let date 
        if(!accountReq.valueDate){
            date = new Date()
        }else{
            date = new Date(accountReq.valueDate)
        }
        console.log(date)
        const termDB = await savingTerm.findByPk(accountReq.term)
        if(!termDB){
            return next(new appError('Term not found!', 404))
        }
        const months = termDB.getDataValue('Value')
        const maturityDate = addMonths(months, date)



        const accountID = newAccount.getDataValue('id')
        //CREATE ARREAR SAVING ACCOUNT
        const newArrearSA = await arrearSAModel.create({
            Account: accountID,
            Category: accountReq.category,
            AccountTitle: accountReq.accountTitle,
            ShortTitle: accountReq.shortTitle,
            Notes: accountReq.notes,
            MaturityDate: maturityDate,
            InterestRate: accountReq.interestRate,
            AccountNo: accountNo,
            PaymentNo: paymentNo,
            Narrative: accountReq.narrative,
            RolloverPR: accountReq.rolloverPR,
            PrincipalAmount: accountReq.principalAmount,
            ValueDate: accountReq.valueDate,
            Teller: accountReq.teller,
            Currency: accountReq.currency,
            ProductLine: accountReq.productLine,
            JoinHolder: accountReq.joinHolder,
            RelationShip: accountReq.relationShip,
            AccountOfficer: accountReq.accountOfficer,
            Term: accountReq.term,
            PaymentCurrency: accountReq.paymentCurrency,
            DebitAccount: accountReq.debitAccount,
            Product: accountReq.product
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'open arrear saving account',
            data: {
                SavingAccount: updatedAccount,
                ArrearSA: newArrearSA
            }
        })
    }),

    //UPDATE STATUS (VALIDATE) => RETURN UPDATED SAVING ACCOUNT
    // [put] /account/saving_account/validate/:account
    validate: asyncHandler( async (req, res, next) => {
        const savingAccountID = req.params.said
        const statusReq = req.body.status
        if(!savingAccountID){
            return next(new appError('Saving Account ID is required!', 404))
        }
        const savingAccountDB = await savingAccountModel.findByPk(savingAccountID)
        if(!savingAccountDB){
            return next(new appError('Saving Account not found!', 404))
        }
        const statusDB = savingAccountDB.getDataValue('Status')
        const typeDB = savingAccountDB.getDataValue('Type')
        if(statusDB == statusReq){
            return next(new appError('Status is ' + statusDB, 404))
        }
        const validatedSA = await savingAccountDB.update({
            Status: statusReq
        })
        //FIND SAVING ACCOUNT INFO BY TYPE
        let accountDetail
        if(typeDB == 2){ //arrear
            accountDetail = await arrearSAModel.findOne({
                where: { Account: savingAccountID}
            })
        }else if(typeDB == 3){ //periodic
            accountDetail = await periodicSAModel.findOne({
                where: { Account: savingAccountID}
            })
        }else if(type == 4){ //discounted
            accountDetail = await discountedSAModel.findOne({
                where: { Account: savingAccountID}
            })
        }

        const dataRes = {...validatedSA, ...accountDetail}
        
        return res.status(200).json({
            message: 'validate saving account',
            data: dataRes
        })
    }),

    // PERIODIC SAVING ACCOUNT
    //[post] /account/saving_account/open_periodic
    openPeriodicSA: asyncHandler(async (req, res, next) => {
        const accountReq = {
            customerID: req.body.customerID,
            category: req.body.category,
            accountTitle: req.body.accountTitle,
            shortTitle: req.body.shortTitle,
            currency: req.body.currency,
            productLine: req.body.productLine,
            joinHolder: req.body.joinHolder,
            relationShip : req.body.relationShip,
            notes: req.body.notes,
            accountOfficer: req.body.accountOfficer,
            product: req.body.product,
            principalAmount: req.body.principalAmount,
            valueDate: req.body.valueDate,
            term: req.body.term,
            interestRate: req.body.interestRate,
            debitAccount: req.body.debitAccount,
            maturityDate: req.body.maturityDate,
            accountNo: req.body.accountNo,
            paymentNo: req.body.paymentNo,
            schedules: req.body.schedules,
            schedulesType: req.body.schedulesType,
            frequency: req.body.frequency,
            teller: req.body.teller,
            paymentCurrency: req.body.paymentCurrency
        }
        //REQUIRE FIELDS
        if(!accountReq.customerID || !accountReq.category || !accountReq.accountTitle 
            || !accountReq.currency || !accountReq.product || !accountReq.principalAmount
            || !accountReq.term){
                return next(new appError('Enter required fields!', 404))
        }

        //CREATE SAVING ACCOUNT
        const newAccount = await savingAccountModel.create({
            CustomerID: accountReq.customerID,
            Status: 1,
            Type: 3
        })
        .catch(err =>{
            return next(new appError(err, 404))
        })

        //UPDATE SAVING ACCOUNT - ACCOUNT
        const newAccountID = newAccount.getDataValue("id")
        let refTemp = newAccountID.toString().padStart(10, '0')
        const refID = `07${refTemp}`
        const updatedAccount = await newAccount.update({
            Account: refID
        })
        

        const accountID = newAccount.getDataValue('id')

        //CREATE PAYMENTNO + ACCOUNTNO
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm  + dd + yyyy;
        let accountNoStr = accountReq.customerID + "*" + today + "*BO"
        let accountNo = accountReq.accountNo ? accountReq.accountNo : accountNoStr
        let paymentNoStr = "TT/" + today + "/" + newAccount.getDataValue('id')
        let paymentNo = accountReq.paymentNo ? accountReq.paymentNo : paymentNoStr

        //CALCULATE MATURITY DATE
        let date 
        if(!accountReq.valueDate){
            date = new Date()
        }else{
            date = new Date(accountReq.valueDate)
        }
        console.log(date)
        const termDB = await savingTerm.findByPk(accountReq.term)
        if(!termDB){
            return next(new appError('Term not found!', 404))
        }
        const months = termDB.getDataValue('Value')
        const maturityDate = addMonths(months, date)

        //CREATE PERIODIC SA
        const newPeriodicSA = await periodicSAModel.create({
            AccountTitle: accountReq.accountTitle,
            ShortTitle: accountReq.shortTitle,
            Notes: accountReq.notes,
            InterestRate: accountReq.interestRate,
            AccountNo: accountNo,
            PaymentNo: paymentNo,
            Narrative: accountReq.narrative,
            Schedules: accountReq.schedules,
            SchedulesType: accountReq.schedulesType,
            Frequency: accountReq.frequency,
            PrincipalAmount: accountReq.principalAmount,
            ValueDate: accountReq.valueDate,
            Teller: accountReq.teller,
            Account: accountID,
            Category: accountReq.category,
            Currency: accountReq.currency,
            ProductLine: accountReq.productLine,
            JoinHolder: accountReq.joinHolder,
            RelationShip: accountReq.relationShip,
            AccountOfficer: accountReq.accountOfficer,
            Term: accountReq.term,
            PaymentCurrency: accountReq.paymentCurrency,
            DebitAccount: accountReq.debitAccount,
            MaturityDate: maturityDate,
            Product: accountReq.product
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'open periodic saving account',
            data: {
                SavingAccount: updatedAccount,
                PeriodicSA: newPeriodicSA
            }
        })

    }),

    //DISCOUNTED SAVING ACCOUNT
    openDiscountedSA: asyncHandler( async (req, res, next) => {
        //amount LCY interest
        const accountReq = {
            customerID: req.body.customerID,
            valueDate: req.body.valueDate,
            workingAccount: req.body.workingAccount,
            amountLCY: req.body.amountLCY,
            amountFCY: req.body.amountFCY,
            narrativeInterest: req.body.narrativeInterest,
            narrative: req.body.narrative,
            teller: req.body.teller,
            ecxhRate: req.body.ecxhRate,
            paymentCurrency: req.body.paymentCurrency,
            currency: req.body.currency,
            account: req.body.account,
            debitAccount: req.body.debitAccount,
            creditAccount: req.body.creditAccount,
            joinHolder: req.body.joinHolder,
            productLine: req.body.productLine,
            term: req.body.term,
            accountOfficer: req.body.accountOfficer,
            dealRate: req.body.dealRate,
            amountLCYInterest: req.body.amountLCYInterest,
            amountFCYInterest: req.body.amountFCYInterest
        }   

        // CALCULATE FINAL DATE
        const date = new Date(accountReq.valueDate)
        console.log(date)
        const termDB = await savingTerm.findByPk(accountReq.term)
        if(!termDB){
            return next(new appError('Term not found!', 404))
        }
        const months = termDB.getDataValue('Value')
        const finalDate = addMonths(months, date)

        // TOTALINTAMOUNT
        // CALCULATE AMOUNT LCY/FCY INTEREST
        const custBal = -parseInt(accountReq.amountLCYInterest)
        const amtPaid = parseInt(accountReq.amountLCYInterest)

        // CALCULATE CUSTBAL + AMT PAID

        // CALCULATE INTEREST RATE
        const parametersDB = await parameters.findOne({
            order: [['createdAt', 'DESC']]
        }).catch(err => {
            return next(new appError(err, 404))
        })
        const interestRateDB = parseFloat(parametersDB.getDataValue('InterestRate'))
        let amount
        if(accountReq.amountLCY){
            amount = accountReq.amountLCY
        }else if(accountReq.amountFCY){
            amount = accountReq.amountFCY
        }

        //CREATE NARRATIVE_INTEREST AUTOMATICALLY

        const interestRate = parseFloat(interestRateDB * amount)

        // CREATE SAVING ACCOUNT
        const newSavingAccount = await savingAccountModel.create({
            CustomerID: accountReq.customerID,
            Type: 4,
            Status: 1
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        //UPDATE SAVING ACCOUNT - ACCOUNT
        const newAccountID = newSavingAccount.getDataValue("id")
        let refTemp = newAccountID.toString().padStart(10, '0')
        const refID = `07${refTemp}`
        const updatedAccount = await newSavingAccount.update({
            Account: refID
        })

        const accountID = newSavingAccount.getDataValue('id')
        const newDiscountedAccount = await discountedSAModel.create({
            ValueDate: accountReq.valueDate,
            FinalDate: finalDate,
            Amount: amount,
            InterestRate: interestRate,
            WorkingAccount: accountReq.workingAccount,
            AmountLCY: accountReq.amountLCY,
            AmountFCY: accountReq.amountFCY,
            AmountLCYInterest: accountReq.amountLCYInterest,
            AmountFCYInterest: accountReq.amountFCYInterest,
            NarrativeInterest: accountReq.narrativeInterest,
            Narrative: accountReq.narrative,
            DealRate: accountReq.dealRate,
            Teller: accountReq.teller,
            EcxhRate: accountReq.ecxhRate,
            CustBal : custBal,
            AmtPaid: amtPaid,
            Account: accountID,
            PaymentCurrency: accountReq.paymentCurrency,
            Currency: accountReq.currency,
            DebitAccount: accountReq.debitAccount,
            JoinHolder: accountReq.joinHolder,
            ProductLine: accountReq.productLine,
            Term: accountReq.term,
            AccountOfficer: accountReq.accountOfficer,
            CreditAccount: accountReq.creditAccount
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'open discounted saving account',
            data: {
                SavingAccount: updatedAccount,
                DiscountedAccount: newDiscountedAccount
            }
        })
    }), 


    //ENQUIRY
    enquiryArrear: asyncHandler( async (req, res, next) => {
        const enquiryReq = { 
            refID: req.body.refID,
            status: req.body.status, 
            category: req.body.category, 
            customerID: req.body.customerID, 
            productLine: req.body.productLine,
            principalFrom: req.body.principalFrom,
            principalTo: req.body.principalTo,
            currency: req.body.currency
        }
        let enquiryObject = {}
        if(enquiryReq.refID){
            enquiryObject.Account = enquiryReq.refID
        }
        if(enquiryReq.status){
            enquiryObject.Status = enquiryReq.status
        }
        if(enquiryReq.category){
            enquiryObject.Category = enquiryReq.category
        }
        if(enquiryReq.customerID){
            enquiryObject.CustomerID = enquiryReq.customerID
        }
        if(enquiryReq.productLine){
            enquiryObject.ProductLine = enquiryReq.productLine
        }
        if(enquiryReq.principalFrom && enquiryReq.principalTo){
            enquiryObject.PrincipalAmount = {[Op.between]: [enquiryReq.principalFrom, enquiryReq.principalTo]}
        }
        if(enquiryReq.currency){
            enquiryObject.Currency = enquiryReq.currency
        }
        console.log(enquiryObject)
        const arrearSADB = await arrearSAModel.findAll({
            where: enquiryObject,
            include: [{
                model: savingAccountModel, 
                include: [{model: customerModel, attributes: ['GB_FullName', 'GB_ShortName', 'DocID' ]}]
            }, {
                model: categoryModel, attributes: ['Name']
            }, {
                model: productLineModel, attributes: ['Name']
            }, {
                model: customerModel, attributes: ['GB_FullName', 'GB_ShortName', 'DocID']
            }, {
                model: relationCodeModel, attributes: ['Name']
            }, {
                model: accountOfficerModel, attributes: ['Name']
            }, {
                model: termModel, attributes: ['Name', 'Value']
            }, {
                model: debitAccountModel, attributes: ['id']
            }]
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'Enquiry Arrear Saving Account', 
            data: arrearSADB
        })
    }),

    enquiryPeriodic: asyncHandler( async (req, res, next) => {
        const enquiryReq = { 
            refID: req. body.refID,
            status: req.body.status, 
            category: req.body.category, 
            customerID: req.body.customerID, 
            productLine: req.body.productLine,
            principalFrom: req.body.principalFrom,
            principalTo: req.body.principalTo,
            currency: req.body.currency
        }
        let enquiryObject = {}
        if(enquiryReq.refID){
            enquiryObject.Account = enquiryReq.refID
        }
        if(enquiryReq.status){
            enquiryObject.Status = enquiryReq.status
        }
        if(enquiryReq.category){
            enquiryObject.Category = enquiryReq.category
        }
        if(enquiryReq.customerID){
            enquiryObject.CustomerID = enquiryReq.customerID
        }
        if(enquiryReq.productLine){
            enquiryObject.ProductLine = enquiryReq.productLine
        }
        if(enquiryReq.principalFrom && enquiryReq.principalTo){
            enquiryObject.PrincipalAmount = {[Op.between]: [enquiryReq.principalFrom, enquiryReq.principalTo]}
        }
        if(enquiryReq.currency){
            enquiryObject.Currency = enquiryReq.currency
        }
        const periodicSADB = await periodicSAModel.findAll({
            where: enquiryObject,
            include: [{
                model: savingAccountModel, 
                include: [{model: customerModel, attributes: ['GB_FullName', 'GB_ShortName', 'DocID' ]}]
            }, {
                model: categoryModel, attributes: ['Name']
            }, {
                model: currencyModel, as: 'CurrencyT', attributes: ['Name']
            }, {
                model: productLineModel, attributes: ['Name']
            }, {
                model: customerModel, attributes: ['GB_FullName', 'GB_ShortName', 'DocID']
            }, {
                model: relationCodeModel, attributes: ['Name']
            }, {
                model: accountOfficerModel, attributes: ['Name']
            }, {
                model: termModel, attributes: ['Name', 'Value']
            }, {
                model: currencyModel, as: 'PaymentCurrencyT', attributes: ['Name']
            }, {
                model: debitAccountModel, attributes: ['id']
            }]
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'Enquiry Periodic Saving Account', 
            data: periodicSADB
        })
    }), 

    enquiryDiscounted: asyncHandler(async (req, res, next) => {
        const enquiryReq = {
            refID: req.body.refID, 
            status: req.body.status,
            LDID: req.body.ldID, 
            workingAccountID: req.body.workingAccountID, 
            workingAccountName: req.body.workingAccountName,
            principalFrom: req.body.principalFrom,
            principalTo: req.body.principalTo,
            currency: req.body.currency
        }
        let enquiryObject = {}
        if(enquiryReq.refID){
            enquiryObject.Account = enquiryReq.refID
        }
        if(enquiryReq.status){
            enquiryObject.Status = enquiryReq.status
        }
        if(enquiryReq.LDID){
            enquiryObject.NarrativeInterest = enquiryReq.LDID
        }
        if(enquiryReq.workingAccountID){
            //...
        }
        if(enquiryReq.workingAccountName){
            //...
        }
        if(enquiryReq.principalFrom && enquiryReq.principalTo){
            enquiryObject.AmountLCY = {[Op.between]: [enquiryReq.principalFrom, enquiryReq.principalTo]}
        }
        if(enquiryReq.currency){
            enquiryObject.Currency = enquiryReq.currency
        }

        const discountedSADB = await discountedSAModel.findAll({
            where: enquiryObject, 
            include: [{
                model: savingAccountModel
            }, {
                model: customerModel, attributes: ['GB_FullName', 'GB_ShortName', 'DocID']
            }, {
                model: currencyModel, as: 'PaymentCurrencyT', attributes: ['Name']
            }, {
                model: currencyModel, as: 'CurrencyT', attributes: ['Name']
            }, {
                model: debitAccountModel, attributes: ['id']
            }, {
                model: productLineModel, attributes: ['Name']
            }, {
                model: termModel, attributes: ['Name']
            }, {
                model: accountOfficerModel, attributes: ['Name']
            }]
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        return res.status(200).json({
            message: 'enquiry discounted saving account', 
            data: discountedSADB
        })

    }), 

    // EDIT SAVING ACCOUNT
    update: asyncHandler(async (req, res, next) => {
        const accountReq = req.params.said
        const updateReq = {
            customerID: req.body.customerID,
            valueDate: req.body.valueDate,
            workingAccount: req.body.workingAccount,
            amountLCY: req.body.amountLCY,
            amountFCY: req.body.amountFCY,
            narrativeInterest: req.body.narrativeInterest,
            narrative: req.body.narrative,
            teller: req.body.teller,
            ecxhRate: req.body.ecxhRate,
            paymentCurrency: req.body.paymentCurrency,
            currency: req.body.currency,
            account: req.body.account,
            debitAccount: req.body.debitAccount,
            creditAccount: req.body.creditAccount,
            joinHolder: req.body.joinHolder,
            productLine: req.body.productLine,
            term: req.body.term,
            accountOfficer: req.body.accountOfficer,
            dealRate: req.body.dealRate,
            amountLCYInterest: req.body.amountLCYInterest,
            amountFCYInterest: req.body.amountFCYInterest,
            category: req.body.category,
            accountTitle: req.body.accountTitle,
            shortTitle: req.body.shortTitle,
            notes: req.body.notes,
            product: req.body.product,
            principalAmount: req.body.principalAmount,
            interestRate: req.body.interestRate,
            maturityDate: req.body.maturityDate,
            accountNo: req.body.accountNo,
            paymentNo: req.body.paymentNo,
            schedules: req.body.schedules,
            schedulesType: req.body.schedulesType,
            frequency: req.body.frequency,
            rolloverPR: req.body.rolloverPR,
            status: req.body.status,
            relationShip: req.body.relationShip
        }
        if(!accountReq){
            return next(new appError("Account ID required!", 404))
        }

        const savingAccountDB = await savingAccountModel.findByPk(accountReq)
        .catch(err => {
            return next(new appError(err, 404))
        })
        const typeDB = savingAccountDB.getDataValue('Type')
        const updatedAccount = await savingAccountDB.update({
            Account: updateReq.account,
            CustomerID: updateReq.customerID,
            Status: updateReq.status
        })
        .catch(err => {
            return next(new appError(err, 404))
        })
    
        let updatedDetailAccount
        if(typeDB == 2){ //arrear
            const arrearDB = await arrearSAModel.findOne({where: {Account: accountReq}})

            //CALCULATE NEW MATURITY DATE
            let maturityDate
            if(updateReq.valueDate || updateReq.term){
                const date = new Date(updateReq.valueDate)
                console.log(date)
                const termDB = await savingTerm.findByPk(updateReq.term)
                if(!termDB){
                    return next(new appError('Term not found!', 404))
                }
                const months = termDB.getDataValue('Value') ? termDB.getDataValue('Value') : null
                maturityDate = addMonths(months, date)
            }else{
                maturityDate = arrearDB.getDataValue('MaturityDate') ? arrearDB.getDataValue('MaturityDate') : null
            }

            updatedDetailAccount = await arrearDB.update({
                Category: updateReq.category,
                AccountTitle: updateReq.accountTitle,
                ShortTitle: updateReq.shortTitle,
                Notes: updateReq.notes,
                MaturityDate: maturityDate? maturityDate : null,
                InterestRate: updateReq.interestRate,
                AccountNo: updateReq.accountNo,
                PaymentNo: updateReq.paymentNo,
                Narrative: updateReq.narrative,
                RolloverPR: updateReq.rolloverPR,
                PrincipalAmount: updateReq.principalAmount,
                ValueDate: updateReq.valueDate,
                Teller: updateReq.teller,
                Currency: updateReq.currency,
                ProductLine: updateReq.productLine,
                JoinHolder: updateReq.joinHolder,
                RelationShip: updateReq.relationShip,
                AccountOfficer: updateReq.accountOfficer,
                Term: updateReq.term,
                PaymentCurrency: updateReq.paymentCurrency,
                DebitAccount: updateReq.debitAccount, 
                Product: updateReq.product
            })
            .catch(err=> {
                return next(new appError(err, 404))
            })
        }else if(typeDB == 3){ //periodic
            const periodicDB = await periodicSAModel.findOne({where: {Account: accountReq}})

            //CALCULATE NEW MATURITY DATE
            let maturityDate
            if(updateReq.valueDate || updateReq.term){
                const date = new Date(updateReq.valueDate)
                console.log(date)
                const termDB = await savingTerm.findByPk(updateReq.term)
                if(!termDB){
                    return next(new appError('Term not found!', 404))
                }
                const months = termDB.getDataValue('Value') ? termDB.getDataValue('Value') : null
                maturityDate = addMonths(months, date)
            }else{
                maturityDate = periodicDB.getDataValue('MaturityDate') ? periodicDB.getDataValue('MaturityDate') : null
            }
            
            //UPDATE
            updatedDetailAccount = await periodicDB.update({
                AccountTitle: updateReq.accountTitle,
                ShortTitle: updateReq.shortTitle,
                Notes: updateReq.notes,
                InterestRate: updateReq.interestRate,
                AccountNo: updateReq.accountNo,
                PaymentNo: updateReq.paymentNo,
                Narrative: updateReq.narrative,
                Schedules: updateReq.schedules,
                SchedulesType: updateReq.schedulesType,
                Frequency: updateReq.frequency,
                PrincipalAmount: updateReq.principalAmount,
                ValueDate: updateReq.valueDate,
                Teller: updateReq.teller,
                Category: updateReq.category,
                Currency: updateReq.currency,
                ProductLine: updateReq.productLine,
                JoinHolder: updateReq.joinHolder,
                RelationShip: updateReq.relationShip,
                AccountOfficer: updateReq.accountOfficer,
                Term: updateReq.term,
                PaymentCurrency: updateReq.paymentCurrency,
                DebitAccount: updateReq.debitAccount,
                MaturityDate:  maturityDate? maturityDate : null,
                Product: updateReq.product
            })
            .catch(err => {
                return next(new appError(err, 404))
            })
        }else if(typeDB == 4){
            const discountedDB = await discountedSAModel.findOne({where: {Account: accountReq}})

            // CALCULATE FINAL DATE
            let finalDate
            if(updateReq.valueDate || updateReq.term){
                const date = new Date(updateReq.valueDate)
                console.log(date)
                const termDB = await savingTerm.findByPk(updateReq.term)
                if(!termDB){
                    return next(new appError('Term not found!', 404))
                }
                const months = termDB.getDataValue('Value')
                finalDate = addMonths(months, date)
            }else{
                finalDate = discountedDB.getDataValue('FinalDate')
            }

            // CALCULATE NEW INTEREST RATE
            const parametersDB = await parameters.findOne({
                order: [['createdAt', 'DESC']]
            }).catch(err => {
                return next(new appError(err, 404))
            })
            let amount
            if(updateReq.amountLCY){
                amount = updateReq.amountLCY
            }else if(updateReq.amountFCY){
                amount = updateReq.amountFCY
            }
            const interestRateDB = parseFloat(parametersDB.getDataValue('InterestRate'))
            const interestRate = parseFloat(interestRateDB * amount)

            // CALCULATE CUSTBAL && AMTBAL
            let custBal
            let amtPaid
            if(updateReq.amountLCYInterest || updateReq.amountFCYInterest){
                custBal = -parseInt(updateReq.amountLCYInterest)
                amtPaid = parseInt(updateReq.amountLCYInterest)
            }else{
                custBal = discountedDB.getDataValue('CustBal')
                amtPaid = discountedDB.getDataValue('AmtBal')
            }


            updatedDetailAccount = await discountedDB.update({
                ValueDate: updateReq.valueDate,
                FinalDate: finalDate,
                WorkingAccount: updateReq.workingAccount,
                AmountLCY: updateReq.amountLCY,
                AmountFCY: updateReq.amountFCY,
                AmountLCYInterest: updateReq.amountLCYInterest,
                AmountFCYInterest: updateReq.amountFCYInterest,
                NarrativeInterest: updateReq.narrativeInterest,
                Narrative: updateReq.narrative,
                DealRate: updateReq.dealRate,
                Teller: updateReq.teller,
                EcxhRate: updateReq.ecxhRate,
                CustBal: custBal,
                AmtPaid: amtPaid,
                PaymentCurrency: updateReq.paymentCurrency,
                Currency: updateReq.currency,
                DebitAccount: updateReq.debitAccount,
                JoinHolder: updateReq.joinHolder,
                ProductLine: updateReq.productLine,
                Term: updateReq.term,
                AccountOfficer: updateReq.accountOfficer,
                CreditAccount: updateReq.creditAccount,
                InterestRate: interestRate
            })
            .catch(err => {
                return next(new appError(err, 404))
            })
        } else {
            return next(new appError('Saving Account Type error!', 404))
        }

        return res.status(200).json({
            message: 'update saving account',
            data: {
                updatedAccount: updatedAccount,
                updatedDetailAccount: updatedDetailAccount
            }
        })

    }), 

    // CLOSE ARREAR
    // [GET] /account/saving_account/arrear_preview/:account
    arrearClosurePreview: asyncHandler(async (req, res, next) => {
        const accountReq = req.params.said
        if(!accountReq){
            return next(new appError("Account ID required!", 404))
        }

        const savingAccountDB = await savingAccountModel.findByPk(accountReq)

        const arrearDB = await arrearSAModel.findOne({
            where: {Account: accountReq}
        })
        .catch(err => {
            return next(new appError(err, 404))
        })

        res.status(200).json({
            message: "arrear close preview", 
            data: {
                savingAccount: savingAccountDB,
                arrearAccount: arrearDB
            }
        })
    }), 
    
    closeArrearPeriodic: asyncHandler(async (req, res, next) => {
        const IDReq = req.params.id  // saving account id

        // CHECK ACCOUNT WAS CLOSED ?
        const closureDB = await ArrearPeriodicClosure.findOne({
            where: {SavingAccount: IDReq}
        })
        if(closureDB){
            return res.status(404).json({
                message: 'Saving Account was closed'
            })
        }
        const closureReq = {
            customerID: req.body.customerID,
            customerName: req.body.customerName,
            valueDate: req.body.valueDate,
            endDate: req.body.endDate,
            originPrincipal: req.body.originPrincipal,
            principal: req.body.principal,
            interestRate: req.body.interestRate,
            totalAmountLCY: req.body.totalAmountLCY,
            totalAmountFCY: req.body.totalAmountFCY,
            narrative: req.body.narrative,
            dealRate: req.body.dealRate,
            tellerID: req.body.tellerID,
            creditCCY: req.body.creditCCY,
            WorkingAccount: req.body.workingAccount,
            customerBalance: req.body.customerBalance,
        }

        const savingAccountDB = await savingAccountModel.findByPk(IDReq)
        if(!savingAccountDB){
            return res.status(404).json({
                message: 'Saving Account not found'
            })
        }
        if(savingAccountDB.getDataValue('CustomerID') != closureReq.customerID){
            return res.status(404).json({
                message: 'Customer ID error'
            })
        }

        const saTypeDB = savingAccountDB.getDataValue('Type')? savingAccountDB.getDataValue('Type') : null
        if(!saTypeDB){
            return res.status(404).json({
                message: 'Error'
            })
        }

        const newClosure = await ArrearPeriodicClosure.create({
            CustomerID: closureReq.customerID,
            CustomerName: closureReq.customerName,
            ValueDate: closureReq.valueDate,
            EndDate: closureReq.endDate,
            OriginPrincipal: closureReq.originPrincipal,
            Principal: closureReq.principal,
            InterestRate: closureReq.interestRate,
            TotalAmountFCY: closureReq.totalAmountFCY,
            TotalAmountLCY: closureReq.totalAmountLCY,
            Narrative: closureReq.narrative,
            CustomerBalance: closureReq.customerBalance ? closureReq.customerBalance : -parseInt(closureReq.totalAmountLCY),
            NewCustomerBalance: closureReq.totalAmountLCY? closureReq.totalAmountLCY : closureReq.totalAmountFCY,
            DealRate: closureReq.dealRate,
            TellerID: closureReq.tellerID,
            CreditCCY: closureReq.creditCCY,
            SavingAccount: IDReq,
            Status: 1,
            SAType: saTypeDB
        }).catch(err => {
            console.log(err)
        })

        return res.status(200).json({
            message: 'Closure',
            data: newClosure
        })
        
        
    }), 

    closeDiscounted: asyncHandler(async (req, res, next) => {
        try{
            const IDReq = req.params.id  // saving account id

            const closureReq = {
                depositNo: req.body.depositNo,
                customerID: req.body.customerID,
                customerName: req.body.customerName,
                valueDate: req.body.valueDate,
                newMatDate: req.body.newMatDate,
                intPymtMethod: req.body.intPymtMethod,
                interestBasic: req.body.interestBasic,
                interestRate: req.body.interestRate,
                totalIntAmount: req.body.totalIntAmount,
                eligibleInterest: req.body.eligibleInterest,
                intRateVDate: req.body.intRateVDate,
                amountLCY: req.body.amountLCY,
                amountFCY: req.body.amountFCY,
                narrative: req.body.narrative,
                dealRate: req.body.dealRate,
                teller: req.body.teller,
                waiveCharge: req.body.waiveCharge,
                newCustomerBalance: req.body.newCustomerBalance,
                customerBalance: req.body.customerBalance
            }

            // CHECK SAVING ACCOUNT
            const savingAccountDB = await savingAccountModel.findByPk(IDReq)
            if(!savingAccountDB){
                throw 'Saving Account Not Found'
            }
            if(savingAccountDB.getDataValue('AccountStatus') != 'Active'){
                throw 'Saving Account was closed'
            }
            if(savingAccountDB.getDataValue('CustomerID') != closureReq.customerID){
                throw 'Customer ID Error'
            }

            const newClosure = await DiscountedClosure.create({
                DepositNo: closureReq.depositNo,
                CustomerID: closureReq.customerID,
                CustomerName: closureReq.customerName,
                ValueDate: closureReq.valueDate,
                NewMatDate: closureReq.newMatDate,
                IntPymtMethod: closureReq.intPymtMethod,
                InterestBasic: closureReq.interestBasic,
                InterestRate: closureReq.interestRate,
                TotalIntAmount: closureReq.totalIntAmount,
                EligibleInterest: closureReq.eligibleInterest,
                IntRateVDate: closureReq.intRateVDate,
                AmountLCY: closureReq.amountLCY,
                AmountFCY: closureReq.amountFCY,
                Narrative: closureReq.narrative,
                DealRate: closureReq.dealRate,
                Teller: closureReq.teller,
                WaiveCharge: closureReq.waiveCharge,
                NewCustomerBalance: closureReq.newCustomerBalance,
                CustomerBalance: closureReq.customerBalance,
                Status: 1,
                SAType: 4,
                SavingAccount: IDReq
            })

            return res.status(200).json({
                message: 'Close Discounted Saving Account',
                data: newClosure
            })

        }catch(err){
            return res.status(404).json({
                message: err
            })
        }
    }), 

    getClosure: asyncHandler(async(req, res, next) => {
        try{
            const IDReq = req.params.id //saving id
            const savingAccountDB = await savingAccountModel.findByPk(IDReq)
            if(!savingAccountDB){
                throw 'Saving Account not found'
            }
            let closureDB
            const accountTypeDB = savingAccountDB.getDataValue('Type')
            if(accountTypeDB == 2 || accountTypeDB == 3){
                closureDB = await ArrearPeriodicClosure.findOne({
                    where: {SavingAccount: IDReq}
                })
                if(!closureDB){
                    throw 'Account is Active'
                }
            }else if(accountTypeDB == 4){
                closureDB = await DiscountedClosure.findOne({
                    where: {SavingAccount: IDReq}
                })
                if(!closureDB){
                    throw 'Account is Active'
                }
            }
            else{
                throw 'Account cannot be closed'
            }

            return res.status(200).json({
                message: 'Get Closure',
                data: closureDB,
                account: savingAccountDB
            })
        }catch(err){
            return res.status(404).json({
                message: err
            })
        }
    }),

    validateClosure: asyncHandler(async (req, res, next) => {
        try{
            const IDReq = req.params.id //saving closure id
            const statusReq = req.body.status
            const closureDB = await ArrearPeriodicClosure.findByPk(IDReq)
            if(!closureDB){
                throw 'Account Closure Error'
            }
            if(closureDB.getDataValue('Status') != 1){
                throw 'Validated'
            }
            // UPDATE SAVING ACCOUNT
            if(statusReq == 2){
                const SATypeDB = closureDB.getDataValue('SAType')
                const savingAccountID = closureDB.getDataValue('SavingAccount')
                const savingAccountDB = await savingAccountModel.findByPk(savingAccountID)
                if(!savingAccountDB){
                    throw 'Saving Account Error'
                }
                await savingAccountDB.update({
                    AccountStatus: 'Blocked'
                })
                // TRANSFER AMOUNT
                const workingAccountID = closureDB.getDataValue('WorkingAccount')
                if(workingAccountID){
                    // GET TRANSFER AMOUNT
                    let transferAmount
                    if(SATypeDB == 2){
                        const arrearDB = await arrearSAModel.findOne({
                            where: {
                                Account: savingAccountID
                            }
                        })
                        if(!arrearDB){
                            throw 'Saving Account Error'
                        }
                        transferAmount = parseInt(arrearDB.getDataValue('PrincipalAmount'))
                    }else if(SATypeDB == 3){
                        const periodicDB = await periodicSAModel.findOne({
                            where: {
                                Account: savingAccountID
                            }
                        })
                        if(!periodicDB){
                            throw 'Saving Account Error'
                        }
                        transferAmount = parseInt(periodicDB.getDataValue('PrincipalAmount'))
                    }
                    // TRANSFER
                    const workingAccountDB = await debitAccountModel.findByPk(workingAccountID)
                    if(!workingAccountDB){
                        throw 'Working Account Error'
                    }
                    await workingAccountDB.increment({
                        'WorkingAmount': transferAmount,
                        'ActualBalance': transferAmount
                    })
                }
            }
            
            // UPDATE CLOSURE
            const updatedClosure = await closureDB.update({
                Status: statusReq
            })

            res.status(200).json({
                message: 'Validated',
                data: updatedClosure
            })

        }catch(err){
            return res.status(404).json({
                message: err
            })
        }
    }),
    validateDiscounted: asyncHandler(async (req, res, next) => {
        try{
            const IDReq = req.params.id //saving closure id

            const statusReq = req.body.status
            const closureDB = await DiscountedClosure.findByPk(IDReq)
            if(!closureDB){
                throw 'Account Closure Error'
            }
            if(closureDB.getDataValue('Status') != 1){
                throw 'Validated'
            }

            if(statusReq == 2){
                //UPDATE SAVING ACCOUNT - BLOCKED
                const savingAccountID = closureDB.getDataValue('SavingAccount')
                const savingAccountDB = await savingAccountModel.findByPk(savingAccountID)
                if(!savingAccountDB){
                    throw 'Saving Account not found'
                }

                await savingAccountDB.update({
                    AccountStatus: 'Blocked'
                })
                //TRANSFER AMOUNT
                const CreditAccountDB = closureDB.getDataValue('CreditAccount')
                if(CreditAccountDB){
                    // GET TRANSFER AMOUNT
                    
                    const discountedDB = discountedSAModel.findOne({
                        where: {Account: savingAccountID}
                    })
                    if(!discountedDB){
                        throw 'Discounted Saving Account Error'
                    }
                    const transferAmount = discountedDB.getDataValue('Amount')
                    // TRANSFER
                    const workingAccountDB = await debitAccountModel.findByPk(CreditAccountDB)
                    if(!workingAccountDB){
                        throw 'Working Account Error'
                    }
                    await workingAccountDB.increment({
                        'WorkingAmount': transferAmount,
                        'ActualBalance': transferAmount
                    })
                }

                //UPDATE CLOSURE - VALID
                const updatedClosure = await closureDB.update({
                    Status: statusReq
                })
    
                res.status(200).json({
                    message: 'Validated',
                    data: updatedClosure
                })
    
            }

            const updatedClosure = await closureDB.update({
                Status: statusReq
            })

            return res.status(200).json({
                message: 'Validated',
                data: updatedClosure
            })

        }catch(err){
            return res.status(404).json({
                message: err
            })
        }
    })
}

module.exports = savingAccountController
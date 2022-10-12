const chequeModel = require('../../models/cheque/cheque')
const chequeItemModel = require('../../models/cheque/chequeItem')
const asyncHandler = require('../../utils/async')
const AppError = require('../../utils/appError')
const DebitAccountModel = require('../../models/account/debitAccount')
const customerModel = require('../../models/customer/customer')
const currencyModel = require('../../models/storage/currency')
const { Op } = require('sequelize')

const issueChequeController = {
    issue: asyncHandler(async (req, res, next) => {
        const issueReq = {
            workingAccount: req.body.workingAccount,
            currency: req.body.currency? req.body.currency : 5,
            chequeID: req.body.chequeID,
            chequeStatus: req.body.chequeStatus,
            issueDate: req.body.issueDate,
            issuedQuantity: req.body.issuedQuantity,
            chequeNoStart: req.body.chequeNoStart
        }

            if(!issueReq.chequeStatus || !issueReq.issuedQuantity || !issueReq.chequeNoStart){
                return res.status(404).json({
                    message: 'Cheque_Status, Issued_Quantity, Cheque_No_Start are required'
                })
            }
        // -------------------------- CHECK -----------------------------------------------------
        //CHECK EXISTED 
        const chequeDB = await chequeModel.findAll({
            where: { ChequeID: issueReq.chequeID}
        })
        if(chequeDB.length != 0){
            return res.status(404).json({
                message: 'Cheque ID existed'
            })
        }

        // CHECK WORKING ACCOUNT
        const workingAccountDB = await DebitAccountModel.findByPk(issueReq.workingAccount)
        if(!workingAccountDB){
            return res.status(404).json({
                message: 'Account not found'
            })
        }

        //CHECK CHEQUE ID
        try{
            const chequeIDArr = issueReq.chequeID.split('.')
            console.log(chequeIDArr)
            if(chequeIDArr[0] != 'CC'){
                throw 0
            }
            if(chequeIDArr[1] != issueReq.workingAccount){
                throw 0
            }
            console.log(chequeIDArr[2].length)
            if(chequeIDArr[2].length != 6){
                throw 0
            }
        }catch{
            return res.status(404).json({
                message: 'ChequeID invalid'
            })
        }
        // CHECK CHEQUE NO


        // -----------------------------------------------------------------------------------------
        
        const chequeNoEnd = parseInt(issueReq.issuedQuantity) + parseInt(issueReq.chequeNoStart) - 1
        // CREATE CHEQUE
        const newCheque = await chequeModel.create({
            ChequeID: issueReq.chequeID,
            ChequeStatus: issueReq.chequeStatus,
            IssueDate: issueReq.issueDate,
            IssuedQuantity: issueReq.issuedQuantity,
            ChequeNoStart: issueReq.chequeNoStart,
            ChequeNoEnd: chequeNoEnd,
            WorkingAccount: issueReq.workingAccount,
            Currency: issueReq.currency,
            Status: 1
        })
        const newChequeID = newCheque.getDataValue('id')
        // CREATE CHEQUE_ITEM
        for(let i = issueReq.chequeNoStart; i <= chequeNoEnd; i++){
            let newChequeItem = await chequeItemModel.create({
                ChequeID: issueReq.chequeID,
                ChequeStatus: 'available',
                ChequeNo: i,
                Cheque: newChequeID
            })
        }

        return res.status(200).json({
            message: 'issue cheque',
            data: newCheque
        })
    }),
    validate: asyncHandler(async (req, res, next) => {
        const idReq = req.params.id
        const statusReq = req.body.status
        const chequeDB = await chequeModel.findByPk(idReq)
        if(!chequeDB){
            return res.status(404).json({
                message: 'Cheque not found'
            })
        }
        const statusDB = chequeDB.getDataValue('Status')
        if(statusDB != 1){
            return res.status(404).json({
                message: 'Validated'
            })
        }

        const updatedCheque = await chequeDB.update({
            Status: statusReq
        })
        return res.status(200).json({
            message: 'Updated',
            data: updatedCheque
        })
    }),
    getID: asyncHandler(async (req, res, next) => {
        const idReq = req.params.id
        // FIND CHEQUE
        const chequeDB = await chequeModel.findByPk(idReq, {
            include: [{
                model: DebitAccountModel, attributes: ['CustomerID', 'WorkingAmount'],
                include: [{
                    model: customerModel, attributes: ['id', 'GB_FullName'], as: 'Customer'
                }]
            }]
        })
        if(!chequeDB){
            return res.status(404).json({
                message: 'Cheque not found'
            })
        }

        //FIND CHEQUE ITEM
        const chequeItemDB = await chequeItemModel.findAll({
            where: {Cheque: idReq}
        })
        let available = [], used = []
        chequeItemDB.map((item) => {
            let itemNo = item.getDataValue('ChequeNo')
            let itemStatus = item.getDataValue('ChequeStatus')
            if(itemStatus == 'available'){
                available.push(itemNo)
            }else if( itemStatus == 'used'){
                used.push(itemNo)
            }
        })

        return res.status(200).json({
            message: 'get cheque',
            data: chequeDB,
            available: available,
            used: used
        })
    }),
    enquiryCheque: asyncHandler(async (req, res, next) => {
        const enquiryReq = {
            chequeRef: req.body.chequeRef,
            chequeType: req.body.chequeType,
            chequeNo: req.body.chequeNo,
            workingAccount: req.body.workingAccount,
            issuedDate: req.body.issuedDate
        }
        // CHEQUE TYPE => 1. CC / 2. AB

        let enquiryObj = {}
        if(enquiryReq.chequeRef){
            enquiryObj.ChequeID = {[Op.substring]: enquiryReq.chequeRef}
        }
        if(enquiryReq.chequeNo){
            enquiryObj.ChequeNoStart = {[Op.lte]: parseInt(enquiryReq.chequeNo)}
            enquiryObj.ChequeNoEnd = {[Op.gte]: parseInt(enquiryReq.chequeNo)}
        }
        if(enquiryReq.workingAccount){
            enquiryObj.WorkingAccount = enquiryReq.workingAccount
        }
        if(enquiryReq.issuedDate){
            enquiryObj.IssueDate = enquiryReq.issuedDate
        }
        if(enquiryReq.chequeType == '2'){ // AB
            return res.status(200).json({
                message: "Enquiry cheque",
                data: []
            })
        }else{
            const chequeDB = await chequeModel.findAll({
                where: enquiryObj, 
                include: [{
                    model: DebitAccountModel, attributes: ['CustomerID', 'WorkingAmount'],
                    include: [{
                        model: customerModel, attributes: ['id', 'GB_FullName'], as: 'Customer'
                    },{
                        model: currencyModel, attributes: ['Name']
                    }]
                }]
            })

            return res.status(200).json({
                message: "Enquiry cheque",
                data: chequeDB
            })
        }
    })
}

module.exports = issueChequeController
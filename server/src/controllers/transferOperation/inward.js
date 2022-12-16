const inwardModel = require('../../models/transferOperation/inward')
const outwardByCashModel = require('../../models/transferOperation/outwardByCash')
const outwardByAccountModel = require('../../models/transferOperation/outwardByAccount')
const { Op } = require('sequelize')

const inwardController = {
    createCashWithdrawal: async (req, res, next) => {
        try{
            const createReq = {
                type: req.body.type,
                clearingID: req.body.clearingID,
                debitCurrency: req.body.debitCurrency,
                debitAccount: req.body.debitAccount,
                debitAmtLCY: req.body.debitAmtLCY,
                debitAmtFCY: req.body.debitAmtFCY,
                dealRate: req.body.dealRate,
                creditCurrency: req.body.creditCurrency,
                creditAccount: req.body.creditAccount,
                creditAmtLCY: req.body.creditAmtLCY,
                creditAmtFCY: req.body.creditAmtFCY,
                BOName: req.body.BOName,
                FOName: req.body.FOName,
                legalID: req.body.legalID,
                telephone: req.body.telephone,
                issueDate: req.body.issueDate,
                issuePlace: req.body.issuePlace,
                narrative: req.body.narrative    
            }
            // CHECK CLEARING ID
            if(!createReq.clearingID)
                throw "Clearing ID required"

            // CHECK CLEARING FIELD
            let outwardDB
            if(createReq.type == 1){
                outwardDB = await outwardByCashModel.findOne({
                    where: {
                        RefID: createReq.clearingID
                    }
                })
                
            }else if(createReq.type == 2){
                outwardDB = await outwardByAccountModel.findOne({
                    where: {
                        RefID: createReq.clearingID
                    }
                })
            }else{
                throw "Transfer Type Invalid"
            }

            if(!outwardDB){
                throw "Clearing ID Invalid"
            }

            // Create 
            const newInward = await inwardModel.create({
                Type: createReq.type,
                ClearingID: createReq.clearingID,
                DebitCurrency: createReq.debitCurrency,
                DebitAccount: createReq.debitAccount,
                DebitAmtLCY: parseFloat(createReq.debitAmtLCY),
                DebitAmtFCY: parseFloat(createReq.debitAmtFCY),
                DealRate: createReq.dealRate,
                CreditCurrency: createReq.creditCurrency,
                CreditAccount: createReq.creditAccount,
                CreditAmtLCY: parseFloat(createReq.creditAmtLCY),
                CreditAmtFCY: parseFloat(createReq.creditAmtFCY),
                BOName: createReq.BOName,
                FOName: createReq.FOName,
                LegalID: createReq.legalID,
                Telephone: createReq.telephone,
                IssueDate: createReq.issueDate,
                IssuePlace: createReq.issuePlace,
                Narrative: createReq.narrative,
                Status: 1
            })
            if(!newInward){
                throw "Create New Inward Error"
            }

            // update RefID
            const inwardID = newInward.getDataValue('id').toString().padStart(6, '0')
            const tempID = `TT.22299.${inwardID}`
            const updatedInward = await newInward.update({
                RefID: tempID
            })

            return res.status(200).json({
                message: "Creat Inward Success",
                data: updatedInward
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },

    createCreditAccount: async (req, res, next) => {
        try{
            const createReq = {
                clearingID: req.body.clearingID,
                debitCurrency: req.body.debitCurrency,
                debitAccount: req.body.debitAccount,
                debitAmtLCY: req.body.debitAmtLCY,
                debitAmtFCY: req.body.debitAmtFCY,
                dealRate: req.body.dealRate,
                creditCurrency: req.body.creditCurrency,
                creditAccount: req.body.creditAccount,
                creditAmtLCY: req.body.creditAmtLCY,
                creditAmtFCY: req.body.creditAmtFCY,
                BOName: req.body.BOName,
                FOName: req.body.FOName,
                legalID: req.body.legalID,
                telephone: req.body.telephone,
                issueDate: req.body.issueDate,
                issuePlace: req.body.issuePlace,
                narrative: req.body.narrative    
            }

            // CHECK CLEARING FIELD
            const outwardDB = await outwardByAccountModel.findOne({
                where: {
                    RefID: createReq.clearingID
                }
            })

            if(!outwardDB){
                throw "Clearing ID Invalid"
            }

            // Create 
            const newInward = await inwardModel.create({
                Type: 3,
                ClearingID: createReq.clearingID,
                DebitCurrency: createReq.debitCurrency,
                DebitAccount: createReq.debitAccount,
                DebitAmtLCY: createReq.debitAmtLCY,
                DebitAmtFCY: createReq.debitAmtFCY,
                DealRate: createReq.dealRate,
                CreditCurrency: createReq.creditCurrency,
                CreditAccount: createReq.creditAccount,
                CreditAmtLCY: createReq.creditAmtLCY,
                CreditAmtFCY: createReq.creditAmtFCY,
                BOName: createReq.BOName,
                FOName: createReq.FOName,
                LegalID: createReq.legalID,
                Telephone: createReq.telephone,
                IssueDate: createReq.issueDate,
                IssuePlace: createReq.issuePlace,
                Narrative: createReq.narrative,
                Status: 1
            })
            if(!newInward){
                throw "Create New Inward Error"
            }

            // update RefID
            const inwardID = newInward.getDataValue('id').toString().padStart(6, '0')
            const tempID = `TT.22308.${inwardID}`
            const updatedInward = await newInward.update({
                RefID: tempID
            })

            return res.status(200).json({
                message: "Creat Inward Success",
                data: updatedInward
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    getByID: async (req, res, next) => {
        try{
            const IDReq = req.params.id 
            const inwardDB = await inwardModel.findByPk(IDReq)

            if(!inwardDB){
                throw "Inward not found"
            }

            return res.status(200).json({
                message: "Get Inward By ID Success",
                data: inwardDB
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
        

    },
    validate: async (req, res, next) => {
        try{
            const idReq = req.params.id
            const statusReq = req.body.status

            //CHECK CURRENT STATUS
            const inwardDB = await inwardModel.findByPk(idReq)
            if(!inwardDB)
                throw "Inward Not Found"
            
            const statusDB = inwardDB.getDataValue('Status')
            if(statusDB != 1){
                throw "Validated"
            }

            //UPDATE STATUS
            const updatedInward = await inwardDB.update({
                Status: statusReq
            })

            return res.status(200).json({
                message: "Validated Success",
                data: updatedInward
            })

        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    enquiry: async (req, res, next) => {
        try{
            const enquiryReq = {
                transactionType: req.body.transactionType,
                BOName: req.body.BOName,
                FOName: req.body.FOName,
                FOlegalID: req.body.legalID,
                refID: req.body.refID,
                creditCurrency: req.body.creditCurrency,
                amtFr: req.body.amountFr,
                amtTo: req.body.amountTo
            }
    
            let enquiry = {}
            // CHECK FIELD
            if(!enquiryReq.transactionType){
                throw "Transaction Type require"
            }


            
            if(enquiryReq.transactionType == 1){
                enquiry.Type = {[Op.in]: [1, 2]}
            }else if(enquiryReq.transactionType == 2){
                enquiry.Type = 3
            }
            if(enquiryReq.BOName){
                enquiry.BOName = {[Op.substring]: enquiryReq.BOName}
            }
            if(enquiryReq.FOName){
                enquiry.FOName = {[Op.substring]: enquiryReq.FOName}
            }
            if(enquiryReq.FOlegalID){
                enquiry.LegalID = {[Op.substring]: enquiryReq.FOlegalID}
            }
            if(enquiryReq.refID){
                enquiry.RefID = {[Op.substring]: enquiryReq.refID }
            }
            if(enquiryReq.amtFr && enquiryReq.amtTo){
                enquiry.DebitAmtLCY = {[Op.between]: [enquiryReq.amtFr, enquiryReq.amtTo]}
            }

            const inwardDB = await inwardModel.findAll({
                where: enquiry
            })
            
            return res.status(200).json({
                message: "Enquiry Success",
                data: inwardDB
            })

        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    }
}

module.exports = inwardController
const outwardByCashModel = require('../../models/transferOperation/outwardByCash')
const outwardByAccountModel = require('../../models/transferOperation/outwardByAccount')
const debitAccountModel = require('../../models/account/debitAccount')
const provinceModel = require('../../models/storage/cityProvince')
const { Op } = require('sequelize')

const outwardController = {
    createByCash: async (req, res, next) => {
        try{
            const outwardReq = {
                productID: req.body.productID,
                currency: req.body.currency,
                bencom: req.body.bencom,
                creditAccount: req.body.creditAccount,
                cashAccount: req.body.cashAccount,
                amount: req.body.amount,
                sendingName: req.body.sendingName,
                sendingAddress: req.body.sendingAddress,
                sendingPhone: req.body.sendingPhone,
                receiveName: req.body.receiveName,
                receiveBenAccount: req.body.receiveBenAccount,
                bankCode: req.body.bankCode,
                identityCard: req.body.identityCard,
                receiveIssueDate: req.body.receiveIssueDate,
                receiveIssuePlace: req.body.receiveIssuePlace,
                teller: req.body.teller,
                narrative: req.body.narrative,
                waiveCharges: req.body.waiveCharges ?? true,
                province: req.body.province
            }

            // CREATE OUTWARD - CASH
            const newOutWard = await outwardByCashModel.create({
                ProductID: outwardReq.productID,
                Currency: outwardReq.currency,
                BenCom: outwardReq.bencom,
                CreditAccount:outwardReq.creditAccount,
                CashAccount:outwardReq.cashAccount,
                Amount:outwardReq.amount,
                SendingName:outwardReq.sendingName,
                SendingAddress:outwardReq.sendingAddress,
                SendingPhone:outwardReq.sendingPhone,
                ReceiveName:outwardReq.receiveName,
                ReceiveBenAccount:outwardReq.receiveBenAccount,
                BankCode:outwardReq.bankCode,
                IdentityCard:outwardReq.identityCard,
                ReceiveIssueDate:outwardReq.receiveIssueDate,
                ReceiveIssuePlace:outwardReq.receiveIssuePlace,
                Teller:outwardReq.teller,
                Narrative1:outwardReq.narrative,
                WaiveCharges:outwardReq.waiveCharges,
                Province:outwardReq.province,
                Status: 1
            })
            if(!newOutWard){
                throw "Create OutWard By Cash Error"
            }

            // UPDATE REF ID
            const outwardID = newOutWard.getDataValue('id')
            const refTemp = outwardID.toString().padStart(6, '0')
            const refID = `TT.22300.${refTemp}`
            const updatedOutward = await newOutWard.update({
                RefID: refID
            })

            return res.status(200).json({
                message: "Create Successfully",
                data: updatedOutward
            })

        }catch(error) {
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    getCashID: async (req, res, next) => {
        try{
            const idReq = req.params.id // transfer id
            const outwardDB = await outwardByCashModel.findByPk(idReq, {
                include: [{
                    model: provinceModel, attribute: ['Name']
                }]
            })
            if(!outwardDB){
                throw "Outward Transfer not found"
            }

            return res.status(200).json({
                message: "Get succesfully",
                data: outwardDB
            })


        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    validateCash: async (req, res, next) => {
        try{
            // CHECK CURRENT STATUS
            const idReq = req.params.id
            const statusReq = req.body.status

            const cashDB = await outwardByCashModel.findByPk(idReq)
            if(!cashDB)
                throw "Outward By Cash Id Not Found"
            
            const cashStatus = cashDB.getDataValue('Status')
            if(cashStatus != 1){
                throw "Validated"
            }

            // UPDATE CASH STATUS
            const updatedCash = await cashDB.update({
                Status: statusReq
            })
            if(!updatedCash){
                throw "Update Error"
            }

            return res.status(200).json({
                message: "Validated",
                data: updatedCash
            })
        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    createByAccount: async (req, res, next) => {
        try{
            const outwardReq = {
                productID: req.body.productID,
                currency: req.body.currency,
                bencom: req.body.bencom,
                creditAccount: req.body.creditAccount,
                debitAccount: req.body.debitAccount,
                amount: req.body.amount,
                sendingName: req.body.sendingName,
                sendingAddress: req.body.sendingAddress,
                taxCode: req.body.taxCode,
                receiveName: req.body.receiveName,
                benAccount: req.body.benAccount,
                idCard: req.body.idCard,
                receiveIssueDate: req.body.receiveIssueDate,
                receiveIssuePlace: req.body.receiveIssuePlace,
                receivePhone: req.body.receivePhone,
                bankCode: req.body.bankCode,
                bankName: req.body.bankName,
                tellerID: req.body.tellerID,
                narrative: req.body.narrative,
                waiveCharge: req.body.waiveCharge,
                province: req.body.province
            }
    
            // CHECK ACCOUNT
            if(!outwardReq.debitAccount){
                throw "Debit Account is required"
            }
            const debitAccountDB = await debitAccountModel.findOne({
                where: {
                    Account: outwardReq.debitAccount
                }
            })
            if(!debitAccountDB){
                throw "Debit Account invalid"
            }
    
            if(!outwardReq.benAccount){
                throw "Ben Account is required"
            }
            const benAccountDB = await debitAccountModel.findOne({
                where: {
                    Account: outwardReq.benAccount
                }
            })
            if(!benAccountDB){
                throw "Ben Account invalid"
            }
    
            const newOutward = await outwardByAccountModel.create({
                ProductID: outwardReq.productID,
                Currency: outwardReq.currency,
                BenCom: outwardReq.bencom,
                CreditAccount: outwardReq.creditAccount,
                DebitAccount: outwardReq.debitAccount,
                Amount: outwardReq.amount,
                SendingName: outwardReq.sendingName,
                SendingAddress: outwardReq.sendingAddress,
                TaxCode: outwardReq.taxCode,
                ReceiveName: outwardReq.receiveName,
                BenAccount: outwardReq.benAccount,
                IdCard: outwardReq.idCard,
                ReceiveIssueDate: outwardReq.receiveIssueDate,
                ReceiveIssuePlace: outwardReq.receiveIssuePlace,
                ReceivePhone: outwardReq.receivePhone,
                BankCode: outwardReq.bankCode,
                BankName: outwardReq.bankName,
                TellerID: outwardReq.tellerID,
                Narrative: outwardReq.narrative,
                WaiveCharge: outwardReq.waiveCharge,
                Province: outwardReq.province,
                Status: 1
            })
            if(!newOutward){
                throw "Create New Outward Error"
            }

            // UPDATE REF ID
            const outwardID = newOutward.getDataValue('id')
            const refTemp = outwardID.toString().padStart(6, '0')
            const refID = `TT.22300.${refTemp}`
            const updatedOutward = await newOutward.update({
                RefID: refID
            })

            return res.status(200).json({
                message: "Create Successfully",
                data: updatedOutward
            })

        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
        
    },
    getAccountID: async (req, res, next) => {
        try{
            const idReq = req.params.id // transfer id
            const outwardDB = await outwardByAccountModel.findByPk(idReq, {
                include: [{
                    model: provinceModel, attribute: ['Name']
                }]
            })
            if(!outwardDB){
                throw "Outward Transfer not found"
            }

            return res.status(200).json({
                message: "Get succesfully",
                data: outwardDB
            })


        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    },
    validateAccount: async (req, res, next) => {
        try{
            // CHECK CURRENT STATUS
            const idReq = req.params.id
            const statusReq = req.body.status

            const accountDB = await outwardByAccountModel.findByPk(idReq)
            if(!accountDB)
                throw "Outward By Account Id Not Found"
            
            const cashStatus = accountDB.getDataValue('Status')
            if(cashStatus != 1){
                throw "Validated"
            }
            // UPDATE CASH STATUS
            const updatedCash = await accountDB.update({
                Status: statusReq
            })
            if(!updatedCash){
                throw "Update Error"
            }

            if(statusReq == 2){
                // UPDATE DEBIT ACCOUNT BALANCE
                const debitAccountID = accountDB.getDataValue("DebitAccount")
                const debitAccountDB = await debitAccountModel.findOne({
                    where: {Account: debitAccountID}
                })
                if(!debitAccountDB){
                    throw "Debit Account Error"
                }

                const amount = parseFloat(accountDB.getDataValue('Amount')) ?? 0

                debitAccountDB.decrement({
                    ActualBalance: amount,
                    WorkingAmount: amount
                })

                // UPDATE BEN ACCOUNT BALANCE
                const benAccountID = accountDB.getDataValue('BenAccount')
                if(benAccountID){
                    const benAccountDB = await debitAccountModel.findOne({
                        where: {
                            Account: benAccountID
                        }
                    })
                    if(benAccountDB){
                        benAccountDB.increment({
                            ActualBalance: amount,
                            WorkingAmount: amount
                        })
                    }
                }
            }

            return res.status(200).json({
                message: "Validated",
                data: updatedCash
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
                productID: req.body.productID,
                sendingName: req.body.sendingName,
                receivingLegalID: req.body.receivingLegalID,
                receivingName: req.body.receivingName,
                benAccount: req.body.benAccount,
                referenceID: req.body.referenceID,
                bencom: req.body.bencom,
                currency: req.body.currency,
                amountfr: req.body.amountfr,
                amountto: req.body.amountto
            }

            if(!enquiryReq.transactionType){
                throw "Transaction Type id require"
            }

            let enquiry = {}
            if(enquiryReq.productID){
                enquiry.ProductID = enquiryReq.productID
            }
            if(enquiryReq.sendingName){
                enquiry.SendingName = {[Op.substring]: enquiryReq.sendingName}
            }
            if(enquiryReq.receivingLegalID){
                if(enquiryReq.transactionType == 1)
                    enquiry.IdentityCard = {[Op.substring]: enquiryReq.receivingLegalID}
                else if(enquiryReq.transactionType == 2)
                    enquiry.IDCard = {[Op.substring]: enquiryReq.receivingLegalID}
            }

            if(enquiryReq.receivingName){
                enquiry.ReceiveName = {[Op.substring]: enquiryReq.receivingName}
            }
            if(enquiryReq.benAccount){
                if(enquiryReq.transactionType == 1)
                    enquiry.ReceiveBenAccount = {[Op.substring]: enquiryReq.benAccount}
                else if(enquiryReq.transactionType == 2)
                    enquiry.BenAccount = {[Op.substring]: enquiryReq.benAccount}
            }
            if(enquiryReq.referenceID){
                enquiry.RefID = {[Op.substring]: enquiryReq.referenceID}
            }
            if(enquiryReq.bencom){
                enquiry.BenCom = {[Op.substring]: enquiryReq.bencom}
            }
            if(enquiryReq.currency){
                enquiry.Currency = enquiryReq.currency
            }
            if(enquiryReq.amountfr && enquiryReq.amountto){
                enquiry.Amount = {[Op.between]: [enquiryReq.amountfr, enquiryReq.amountto]}
            }

            let outwardRes
            if(enquiryReq.transactionType == 1){
                outwardRes = await outwardByCashModel.findAll({
                    where: enquiry,
                    include: [{
                        model: provinceModel, attributes: ['Name']
                    }]
                })
            }else if(enquiryReq.transactionType == 2){
                outwardRes = await outwardByAccountModel.findAll({
                    where: enquiry,
                    include: [{
                        model: provinceModel, attributes: ['Name']
                    }]
                })
            }

            return res.status(200).json({
                message: "Enquiry Successfully",
                data: outwardRes
            })

        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    }

}

module.exports = outwardController
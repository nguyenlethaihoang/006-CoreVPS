const creditTransferModel = require('../../models/creditTransaction/transfer')
const debitAccountModel = require('../../models/account/debitAccount')

const creditTransferController = {
    create: async (req, res, next) => {
        try{
            const transferReq = {
                debitCurrency: req.body.debitCurrency,
                debitAmt: req.body.debitAmt,
                customerID: req.body.customerID,
                customerName: req.body.customerName,
                nextTransCom: req.body.nextTransCom,
                oldBalance: req.body.oldBalance,
                newBalance: req.body.newBalance,
                valueDate: req.body.valueDate,
                creditAccount: req.body.creditAccount,
                creditCurrency: req.body.creditCurrency,
                amtCreditforCust: req.body.amtCreditforCust,
                valueDateCredit: req.body.valueDateCredit,
                creditCardNumber: req.body.creditCardNumber,
                waiveCharges: req.body.waiveCharges,
                narrative: req.body.narrative,
                debitAccount: req.body.debitAccount
            }
    
            // CHECK FIELDS REQUIRED
            if(!transferReq.debitAccount){
                throw "Debit_Account is required"
            }

            // CHECK ACCOUNT
            const debitAccountDB = await debitAccountModel.findByPk(transferReq.debitAccount)
            if(!debitAccountDB){
                throw "Debit Account Not Found"
            }

            // CREATE
            const newCreditTransfer = await creditTransferModel.create({
                DebitCurrency: transferReq.debitCurrency,
                DebitAmt: transferReq.debitAmt,
                CustomerID: transferReq.customerID,
                CustomerName: transferReq.customerName,
                NextTransCom: transferReq.nextTransCom,
                OldBalance: transferReq.oldBalance,
                NewBalance: transferReq.newBalance,
                ValueDate: transferReq.valueDate,
                CreditAccount: transferReq.creditAccount,
                CreditCurrency: transferReq.creditCurrency,
                AmtCreditforCust: transferReq.amtCreditforCust,
                ValueDateCredit: transferReq.valueDateCredit,
                CreditCardNumber: transferReq.creditCardNumber,
                WaiveCharges: transferReq.waiveCharges,
                Narrative: transferReq.narrative,
                DebitAccount: transferReq.debitAccount,
                Status: 1
            })
            if(!newCreditTransfer){
                throw "Create Credit Transfer Error"
            }

            // UPDATE REF ID 
            const creditTransferID = newCreditTransfer.getDataValue('id')
            let refTemp = creditTransferID.toString().padStart(6, '0')
            const refID = `TT.22298.${refTemp}`
            const updatedCreditTransfer = await newCreditTransfer.update({
                RefID: refID
            })

            return res.status(200).json({
                message: "Create Credit Transfer",
                data: updatedCreditTransfer
            })

        }catch(error){
            return res.status(404).json({
                message: error ?? error.message
            })
        }
    },

    getID: async (req, res, next) => {
        try{
            const idReq = req.params.id

            const creditTransferDB = await creditTransferModel.findByPk(idReq, {
                include: [{
                    model: debitAccountModel
                }]
            })
            if(!creditTransferDB){
                throw "Credit Transfer Not Found"
            }

            return res.status(200).json({
                message: "Get Credit Transfer Success",
                data: creditTransferDB
            })

        }catch(error){
            return res.status(404).json({
                message: error ?? error.message
            })
        }
    },

    validate: async (req, res, next) => {
        try{

            const idReq = req.params.id
            const statusReq = req.body.status

            // CHECK COLLECTION
            const transferDB = await creditTransferModel.findByPk(idReq)
            if(!transferDB){
                throw "Credit transferDB not found"
            }

            // CHECK STATUS COLLECTION
            const statusDB = transferDB.getDataValue('Status')
            if(statusDB != 1){
                throw "Validated"
            }

            // UPDATE TRANSFER
            const updatedCollection = await transferDB.update({
                Status: statusReq
            })

            if(statusReq == 2){
                // UPDATE DEBIT ACCOUNT
                const debitAccountDB = await debitAccountModel.findByPk(transferDB.getDataValue('DebitAccount'))
                const workingAmountDB = parseInt(debitAccountDB.getDataValue('WorkingAmount'))
                const actualBalanceDB = parseInt(debitAccountDB.getDataValue('ActualBalance'))
                const amountTransfer = parseInt(transferDB.getDataValue('AmtCreditforCust'))
                debitAccountDB.decrement({
                    WorkingAmount: amountTransfer,
                    ActualBalance: amountTransfer
                })
            }
            
            return res.status(200).json({
                message: "Validate Success",
                data: updatedCollection
            })
        }catch(error){
            return res.status(404).json({
                message: error ?? error.message
            })
        }
    }
}

module.exports = creditTransferController
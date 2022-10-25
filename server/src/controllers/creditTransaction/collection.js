const creditCollectionModel = require('../../models/creditTransaction/collection')
const customerModel = require('../../models/customer/customer')

const creditCollectionController = {
    create: async(req, res, next) => {
        try{
            const collectionReq = {
                tellerID: req.body.tellerID,
                debitCurrency: req.body.debitCurrency,
                debitAccount: req.body.debitAccount,
                debitAmt: req.body.debitAmt,
                creditAccount: req.body.creditAccount,
                creditCurrency: req.body.creditCurrency,
                dealRate: req.body.dealRate,
                creditAmount: req.body.creditAmount,
                creditCardNumber: req.body.creditCardNumber,
                waiveCharges: req.body.waiveCharges,
                narrative: req.body.narrative,
                customerID: req.body.customerID
            }
    
            // CHECK FIELDS REQUIRED
            if(!collectionReq.customerID){
                throw "Customer ID is required!"
            }

            // CHECK CUSTOMER
            const customerDB = await customerModel.findByPk(collectionReq.customerID)
            if(!customerDB){
                throw "Customer invalid"
            }

            // CREATE 
            const newCreditCollection = await creditCollectionModel.create({
                TellerID: collectionReq.tellerID ?? 'VietVictory',
                DebitCurrency: collectionReq.debitCurrency,
                DebitAccount: collectionReq.debitAccount,
                DebitAmt: collectionReq.debitAmt ?? 0,
                CreditAccount: collectionReq.creditAccount,
                CreditCurrency: collectionReq.creditCurrency,
                DealRate: collectionReq.dealRate ?? 1,
                CreditAmount: collectionReq.creditAmount ?? 0,
                CreditCardNumber: collectionReq.creditCardNumber,
                WaiveCharges: collectionReq.waiveCharges,
                Narrative: collectionReq.narrative,
                CustomerID: collectionReq.customerID,
                Status: 1
            })
            if(!newCreditCollection){
                throw "Create Credit Collection Error"
            }

            // update RefID
            const creditCollectionID = newCreditCollection.getDataValue('id')
            let refTemp = creditCollectionID.toString().padStart(6, '0')
            const refID = `TT.22297.${refTemp}`
            const updatedCreditCollection = await newCreditCollection.update({
                RefID: refID
            })

            return res.status(200).json({
                message: "Create Credit Collection",
                data: updatedCreditCollection
            })

        }catch(error){
            return res.status(404).json({
                message: error ?? error.message
            })
        }
    },

    getID: async(req, res, next) => {
        try{
            const idReq = req.params.id

            const creditCollectionDB = await creditCollectionModel.findByPk(idReq, {
                include: [{
                    model: customerModel
                }]
            })
            if(!creditCollectionDB){
                throw "Credit Collection Not Found"
            }

            return res.status(200).json({
                message: "Get Credit Collection Success",
                data: creditCollectionDB
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
            const collectionDB = await creditCollectionModel.findByPk(idReq)
            if(!collectionDB){
                throw "Credit Collection not found"
            }

            // CHECK STATUS COLLECTION
            const statusDB = collectionDB.getDataValue('Status')
            if(statusDB != 1){
                throw "Validated"
            }

            // UPDATE
            const updatedCollection = await collectionDB.update({
                Status: statusReq
            })

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

module.exports = creditCollectionController
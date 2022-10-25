const creditTransferModel = require('../../models/creditTransaction/transfer')
const creditCollectionModel = require('../../models/creditTransaction/collection')
const { Op } = require('sequelize')
const customerModel = require('../../models/customer/customer')
const debitAccountModel = require('../../models/account/debitAccount')

const creditTransactionController = {
    enquiry: async (req, res, next) => {
        try{
            const enquiryReq = {
                paymentType: req.body.paymentType, // 1: Collection // 2:Transfer
                referenceID: req.body.referenceID,
                debitAccount: req.body.debitAccount,
                debitCurrency: req.body.debitCurrency,
                customerID: req.body.customerID,
                customerName: req.body.customerName,
                legalID: req.body.legalID,
                debitAmtfr: req.body.debitAmtfr,
                debitAmtto: req.body.debitAmtto
            }

            let enquiry = {}, customerCond = {}
            let creditTransRes = []
            if(!enquiryReq.paymentType){
                throw "Payment_Type is required"
            }
            if(enquiryReq.referenceID)
                enquiry.RefID = enquiryReq.referenceID
            if(enquiryReq.debitCurrency)
                enquiry.DebitCurrency = enquiryReq.debitCurrency
            if(enquiryReq.debitAccount)
                enquiry.DebitAccount = enquiryReq.debitAccount
            if(enquiryReq.customerID)
                enquiry.CustomerID = enquiryReq.customerID
            if(enquiryReq.paymentType == 1 && enquiryReq.customerName)
                customerCond.GB_FullName = {[Op.substring]: enquiryReq.customerName}
                //{[Op.substring]: enquiryReq.customerName}
            else if(enquiryReq.paymentType == 2 && enquiryReq.customerName)
                enquiry.CustomerName = {[Op.substring]: enquiryReq.customerName}

            if(enquiryReq.legalID)
                customerCond.DocID = {[Op.substring]: enquiryReq.legalID}

            if(enquiryReq.debitAmtfr && enquiryReq.debitAmtto)
                if(enquiryReq.paymentType == 1)
                    enquiry.CreditAmount = {[Op.between]: [enquiryReq.debitAmtfr, enquiryReq.debitAmtto]}
                else
                    enquiry.AmtCreditforCust = {[Op.between]: [enquiryReq.debitAmtfr, enquiryReq.debitAmtto]}


            if(enquiryReq.paymentType == 1){
                creditTransRes = await creditCollectionModel.findAll({
                    where: enquiry,
                    include: [{
                        model: customerModel,
                        where: customerCond
                    }]
                })
                .catch(err => {
                    throw err
                })
            }else if(enquiryReq.paymentType == 2){
                const temp = await creditTransferModel.findAll({
                    where: enquiry,
                    include: [{
                        model: debitAccountModel,
                        include: [{
                            model: customerModel,
                            where: customerCond,
                            as: 'Customer'
                        }]
                        
                    }]
                })

                function isNotNull(value){
                    return value.DEBITACCOUNT != null;
                }

                creditTransRes = temp.filter(isNotNull)
            }

            return res.status(200).json({
                message: "Enquiry Successful",
                data: creditTransRes
            })

        }catch(error){
            return res.status(404).json({
                message: error.message ?? error
            })
        }
    }
}

module.exports = creditTransactionController
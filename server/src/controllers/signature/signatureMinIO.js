const signatureModel = require('../../models/signature/signature')
const signatureStatusModel = require('../../models/signature/statusType')
const customerModel = require('../../models/customer/customer')
const appError = require('../../utils/appError')
const asyncHandler = require('../../utils/async')





async function deleteImage(){
    
}

async function imageUpload(){
   
}

const signatureMinIOController = {

    // [GET] /signature/get_all
    getAll: asyncHandler(async (req, res, next) => {
       
    }),

    // [POST] /signature/upload
    upload: asyncHandler( async (req, res, next) => {
        
    }),

    // [GET] /signature/get/:signatureid
    getBySignatureID: asyncHandler( async (req, res, next) => {
        
    }),

    // [GET] /signature/get_by_customer/:customerid
    getByCustomerID: asyncHandler( async (req, res, next) => {
              
    }),

    // [GET] /signature/get_by_status/:status
    getByStatus: asyncHandler( async (req, res, next) => {
        
    }),

    // update: check valid + update description
    // [PUT] /signature/validate/:signatureid
    update: asyncHandler( async (req, res, next) => {
       

    }),

    // [PUT] /signature/change_image/:signatureid
    changeSignatureImage: asyncHandler( async (req, res, next) => {
        
    })

}

module.exports = signatureMinIOController
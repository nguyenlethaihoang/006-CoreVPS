const signatureModel = require('../../models/signature/signature')
const signatureStatusModel = require('../../models/signature/statusType')
const customerModel = require('../../models/customer/customer')
const appError = require('../../utils/appError')
const asyncHandler = require('../../utils/async')
const { getAttributes } = require('../../models/signature/signature')

const
    { BlobServiceClient } = require("@azure/storage-blob"),
    blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING),
    containerName = process.env.CONTAINER_NAME,
    config = require('../../utils/accountStorageConfig'),
    multer = require('multer'),
    inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({ storage: inMemoryStorage }).single('image'),
    { BlockBlobClient } = require('@azure/storage-blob'),
    getStream = require('into-stream')

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
}

async function deleteImage(blobName){
    blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,blobName)
    await blobService.delete()
    .then(result => {
        console.log("Delete result: ", result)
        return 1
    })
    .catch(err => {
        console.log(err)
        return 0
    })
}

async function imageUpload(file){
    const
        blobName = getBlobName(file.originalname),
        blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,blobName),
        stream = getStream(file.buffer),
        streamLength = file.buffer.length

    await blobService.uploadStream(stream, streamLength)
    .catch(err => {
        console.log(err)
        return null
    })

    return blobName
}

const signatureController = {

    // [GET] /signature/get_all
    getAll: asyncHandler(async (req, res, next) => {
        let viewData;
        console.log(process.env.AZURE_STORAGE_CONNECTION_STRING)
        console.log(blobServiceClient)
        try{
            const blobs = blobServiceClient.getContainerClient(containerName).listBlobsFlat()
            let viewData = {
              title: 'Home',
              viewName: 'index',
              accountName: config.getStorageAccountName(),
              containerName: containerName,
              thumbnails:[]
            }
            for await(let blob of blobs){
                viewData.thumbnails.push(blob);
            }

            let imagesData = []
            viewData.thumbnails.map(image => {
                const imageData = {
                    name: image.name,
                    src: "https://" + viewData.accountName + ".blob.core.windows.net/" + viewData.containerName + "/" + image.name
                }
                imagesData.push(imageData)
            })
            res.status(200).json(imagesData)
          
          }catch(err){
            viewData = {
                title: 'Error',
                viewName: 'error',
                message: 'There was an error contacting the blob storage container.',
                error: err
              };
              
              res.status(500);
          }
    }),

    // [POST] /signature/upload
    upload: asyncHandler( async (req, res, next) => {
        // STORE SIGNATURE INFO
        const signatureReq = {
            customerID: req.body.customerID,
            description: req.body.description
        }

        if(!signatureReq.customerID){
            return next( new appError("Enter customer ID"))
        }

        // CHECK CUSTOMERID
        customerModel.findByPk(signatureReq.customerID)
        .catch(err => {
            console.log(err)
            return next(new appError("Customer not found", 404))
        })

        // STORE IMAGE TO CLOUD
        const file = req.file
        if(!file){
            return next(new appError("Provide image", 404))
        }
        const blobName = await imageUpload(file)
        if(!blobName){
            return next(new appError("Upload error", 404))
        }

        const newSignature = await signatureModel.create({
            CustomerID: signatureReq.customerID,
            Description: signatureReq.description,
            Status: 1,
            URL: blobName
        })
        .catch(err => {
            console.log(err)
        })

        return res.status(200).json({
            message: "uploaded",
            data: newSignature
        })
    }),

    // [GET] /signature/get/:signatureid
    getBySignatureID: asyncHandler( async (req, res, next) => {
        const signatureID = req.params.signatureid
        const signatureDB = await signatureModel.findByPk(signatureID, {
            include: [customerModel]
        })
        
        if(!signatureDB){
            return next(new appError("Signature not found", 404))
        }

        const URLString = "https://" + process.env.ACCOUNT_NAME + ".blob.core.windows.net/" + process.env.CONTAINER_NAME + "/" + signatureDB.getDataValue('URL')
        return res.status(200).json({
            message: "signature",
            data:{
                signatureData: signatureDB,
                URL: URLString
            }
        })
    }),

    // [GET] /signature/get_by_customer/:customerid
    getByCustomerID: asyncHandler( async (req, res, next) => {
        const customerIDReq = req.params.customerid
        if(!customerIDReq){
            return next(new appError("Error", 404))
        }

        const customerDB = await customerModel.findOne({
            where: {DocID: customerIDReq},
            attributes: ["id", "GB_ShortName", "GB_FullName"]
        })
        .catch(err => {
            console.log(err)
            return next(new appError("Customer not found", 404))
        })

        const customerIDDB = customerDB.getDataValue("id")
        const {count, rows} = await signatureModel.findAndCountAll({
            where: {CustomerID: customerIDDB }
        })
        // .catch(err => {
        //     console.log(err)
        // })

        let signaturesRes = []

        rows.map(signature => {
            let URLString = "https://" + process.env.ACCOUNT_NAME + ".blob.core.windows.net/" + process.env.CONTAINER_NAME + "/" + signature.getDataValue('URL')
            let signatureRes = {
                signature: signature,
                URL: URLString
            }
            signaturesRes.push(signatureRes)
        })

        return res.status(200).json({
            message: "signature",
            data: {
                quantity: count,
                customer: customerDB,
                signature: signaturesRes
            }
        })        
    }),

    // [GET] /signature/get_by_status/:status
    getByStatus: asyncHandler( async (req, res, next) => {
        const statusReq = req.params.status

        const {count, rows} = await signatureModel.findAndCountAll({
            where: {Status: statusReq},
            include: [{
                model: customerModel,
                attributes: ["id", "GB_ShortName", "GB_FullName"]
            }]
        })

        let signaturesRes = []

        rows.map(signature => {
            let URLString = "https://" + process.env.ACCOUNT_NAME + ".blob.core.windows.net/" + process.env.CONTAINER_NAME + "/" + signature.getDataValue('URL')
            let signatureRes = {
                signature: signature,
                URL: URLString
            }
            signaturesRes.push(signatureRes)
        })

        return res.status(200).json({
            message: "signature",
            data: {
                quantity: count,
                signature: signaturesRes
            }
        })
        
    }),

    // update: check valid + update description
    // [PUT] /signature/validate/:signatureid
    update: asyncHandler( async (req, res, next) => {
        const signatureReq = {
            status: req.body.status,
            description: req.body.description
        }
        const signatureID = req.params.signatureid

        if(!signatureReq.status){
            return next(new appError("Enter signature status"), 404)
        }

        const signatureDB = await signatureModel.findByPk(signatureID)
        if(!signatureDB){
            return next(new appError("Signature not found!", 404))
        }

        const URLString = "https://" + process.env.ACCOUNT_NAME + ".blob.core.windows.net/" + process.env.CONTAINER_NAME + "/" + signatureDB.getDataValue('URL')

        const newSignatureData = await signatureDB.update({
            Status: signatureReq.status,
            Description: signatureReq.description
        })

        return res.status(200).json({
            message: "update",
            data: {
                signature: newSignatureData,
                URL: URLString
            }
        })

    }),

    // [PUT] /signature/change_image/:signatureid
    changeSignatureImage: asyncHandler( async (req, res, next) => {
        const signatureIDReq = req.params.signatureid
        if(!signatureIDReq){
            return next( new appError("Provide signature ID"))
        }

        // GET SIGNATURE DB 
        const signatureDB = await signatureModel.findByPk(signatureIDReq)
        if(!signatureDB){
            console.log("Signature not found")
            return next(new appError("Signature not found", 404))
        }

        const oldBlobName = signatureDB.getDataValue('URL')

        // UPLOAD NEW SIGNATURE
        const file = req.file
        if(!file){
            return next(new appError("Provide image", 404))
        }
        const newBlobName = await imageUpload(file)
        if(!newBlobName){
            return next(new appError("Upload error", 404))
        }

        // UPDATE SIGNATURE DATA
        const updatedSignature = await signatureDB.update({
            URL: newBlobName,
            Status: 1
        })

        // REMOVE OLD SINGATURE ON CLOUD DB
        const deleteResult = await deleteImage(oldBlobName)
        if(deleteResult == 0){
            return next(new appError(deleteResult, 404))
        }

        return res.status(200).json({
            message: "updated",
            data: updatedSignature
        })
    })

}

module.exports = signatureController
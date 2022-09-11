const appError = require('../utils/appError')
const asyncHandler = require('../utils/async')
 
const PizZip = require('pizzip')
const Docxtemplater = require('docxtemplater')
const fs = require('fs')
const path = require('path')

const customerModel = require('../models/customer/customer')
const individualCustomerModel = require('../models/customer/individualCustomer')



const
    { BlobServiceClient } = require("@azure/storage-blob"),
    blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING),
    containerName = process.env.CONTAINER_NAME,
    config = require('../utils/accountStorageConfig'),
    multer = require('multer'),
    inMemoryStorage = multer.memoryStorage(),
    { BlockBlobClient } = require('@azure/storage-blob'),
    getStream = require('into-stream')

const getBlobName = originalName => {
    const identifier = Math.random().toString().replace(/0\./, ''); // remove "0." from start of string
    return `${identifier}-${originalName}`;
}


async function deleteFile(blobName) {
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


const exportFileController = {
    exportIndividual: asyncHandler(async (req, res, next) => {
        // FILE RESOLVE
        const customerIDReq = req.params.id
        const content = fs.readFileSync(path.resolve(__dirname, '../../public/file/individual.docx'), 'binary')

        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        })
        // .catch(err => {
        //     return next(new appError("Docxtemplate Error: ", err), 404)
        // })


        // GET INFO
        const individualCustomerDB = await individualCustomerModel.findOne({
            where: { CustomerID: customerIDReq},
            include: [{
                model: customerModel
            }]
        })
        .catch(err => {
            return next(new appError('Get Customer Error: ', customerDB))
        })

        const customerDB = individualCustomerDB.CUSTOMER
        

        // FILE RENDER
        doc.render({
            CustomerName_: customerDB.getDataValue('GB_FullName'),
            DocID_: individualCustomerDB.getDataValue('DocID')
        })

        const docBuf = doc.getZip().generate({type: 'nodebuffer'})
        // const customerPath = individualCustomerDB.getDataValue('id')
        // const filePath = '../../../client/src/resources/Files/individual/' + customerPath.toString() +'.docx'
        // fs.writeFileSync(path.resolve(__dirname, filePath), docBuf)

        const
        blobName = getBlobName('output.docx'),
        blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,containerName,blobName),
        stream = getStream(docBuf),
        streamLength = docBuf.length

        await blobService.uploadStream(stream, streamLength)
        .catch(err => {
            console.log(err)
            return null
        })

        URLRes = "https://" + config.getStorageAccountName() + ".blob.core.windows.net/" + containerName + "/" + blobName

        return res.status(200).json({
            message: 'Exported',
            data: URLRes
        })
    }),

    deleteFile: asyncHandler(async (req, res, next) => {
        const blobNameReq = req.body.blobName
        const deleteResult = await deleteFile(blobNameReq)

        if(deleteResult == 0){
            return next(new appError(deleteResult, 404))
        }

        return res.status(200).json({
            message: "delete"
        })
    })
}

module.exports = exportFileController
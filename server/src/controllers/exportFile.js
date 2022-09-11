const appError = require('../utils/appError')
const asyncHandler = require('../utils/async')
 
const PizZip = require('pizzip')
const Docxtemplater = require('docxtemplater')
const fs = require('fs')
const path = require('path')

const customerModel = require('../models/customer/customer')
const individualCustomerModel = require('../models/customer/individualCustomer')

function errorHandler(error) {
    console.log(JSON.stringify({error: error}, replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
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
        return res.status(200).json({
            message: 'Exported',
            data: docBuf
        })
    }) 
}

module.exports = exportFileController
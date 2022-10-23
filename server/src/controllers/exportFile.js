const appError = require('../utils/appError')
const asyncHandler = require('../utils/async')
 
const PizZip = require('pizzip')
const Docxtemplater = require('docxtemplater')
const fs = require('fs')
const path = require('path')

const customerModel = require('../models/customer/customer')
const individualCustomerModel = require('../models/customer/individualCustomer')
const corporateCustomerModel = require('../models/customer/corporateCustomer')
const cityProvinceModel = require('../models/storage/cityProvince')
const countryModel = require('../models/storage/country')
const sectorModel = require('../models/storage/sector')
const industryModel = require('../models/storage/industry')
const DepositTrans = require('../models/transaction/deposit')
const DebitAccount = require('../models/account/debitAccount')
const Currency = require('../models/storage/currency')
const readAmount = require('../utils/readAmount')
const WithdrawalTrans = require('../models/transaction/withdrawal')
const TransferTrans = require('../models/transaction/transfer')
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
    blobService = new BlockBlobClient(process.env.AZURE_STORAGE_CONNECTION_STRING,process.env.CONTAINER_NAME,blobName)
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
                model: customerModel, 
                include: [{
                    model: cityProvinceModel, attributes: ['Name']
                }, {
                    model: countryModel, attributes: ['Name']
                }]
            }]
        })
        .catch(err => {
            return next(new appError('Get Customer Error: ', customerDB))
        })

        const customerDB = individualCustomerDB.CUSTOMER
        

        // CHECK RENDER
        let renderObj = {}
        if(customerDB.getDataValue('GB_FullName')){
            renderObj.CustomerName_ = customerDB.getDataValue('GB_FullName')
        }else{
            renderObj.CustomerName_ = ' '
        }
        if(customerDB.getDataValue('DocID')){
            renderObj.DocID_ = customerDB.getDataValue('DocID')
        }else{
            renderObj.DocID_ = ' '
        }
        if(individualCustomerDB.getDataValue('Birthday')){
            renderObj.Birthday_ = individualCustomerDB.getDataValue('Birthday')
        }else{
            renderObj.Birthday_ = ' '
        }
        if(customerDB.getDataValue('DocExpiryDate')){
            renderObj.DocExpiryDate_ = customerDB.getDataValue('DocExpiryDate')
        }else{
            renderObj.DocExpiryDate_ = ' '
        }
        if(customerDB.getDataValue('DocIssuePlace')){
            renderObj.DocIssuePlace_ = customerDB.getDataValue('DocIssuePlace')
        }else{
            renderObj.DocIssuePlace_ = ' '
        }
        if(customerDB.getDataValue('GB_Street')){
            renderObj.GB_Street_ = customerDB.getDataValue('GB_Street')
        }else{
            renderObj.GB_Street_ = ' '
        }
        if(customerDB.getDataValue('GB_Towndist')){
            renderObj.GB_Towndist_ = customerDB.getDataValue('GB_Towndist')
        }else{
            renderObj.GB_Towndist_ = ' '
        }
        if(customerDB.CITYPROVINCE.getDataValue('Name')){
            renderObj.Province_ = customerDB.CITYPROVINCE.getDataValue('Name').slice(5)
        }else{
            renderObj.Province_ = ' '
        }
        if(customerDB.COUNTRY.getDataValue('GB_Country')){
            renderObj.GB_Country_ = customerDB.COUNTRY.getDataValue('GB_Country')
        }else{
            renderObj.GB_Country_ = ' '
        }
        if(individualCustomerDB.getDataValue('EmailAddress')){
            renderObj.EmailAddress_ = individualCustomerDB.getDataValue('EmailAddress')
        }else{
            renderObj.EmailAddress_ = ' '
        }
        if(customerDB.getDataValue('PhoneNumber')){
            renderObj.PhoneNumber_ = customerDB.getDataValue('PhoneNumber')
        }else{
            renderObj.PhoneNumber_ = ' '
        }
        if(individualCustomerDB.getDataValue('FaxNumber')){
            renderObj.FaxNumber_ = individualCustomerDB.getDataValue('FaxNumber')
        }else{
            renderObj.FaxNumber_ = ' '
        }
        // FILE RENDER
        doc.render(renderObj)

        const docBuf = doc.getZip().generate({type: 'nodebuffer'})
        // const customerPath = individualCustomerDB.getDataValue('id')
        // const filePath = '../../../client/src/resources/Files/individual/' + customerPath.toString() +'.docx'
        // fs.writeFileSync(path.resolve(__dirname, filePath), docBuf)

        const
        blobName = getBlobName(`${customerDB.getDataValue('GB_FullName')}.docx`),
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
            data: URLRes,
            blobName: blobName
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
    }),

    exportCorporate: asyncHandler(async (req, res, next) => {
        // FILE RESOLVE
        const customerIDReq = req.params.id
        const content = fs.readFileSync(path.resolve(__dirname, '../../public/file/corporate.docx'), 'binary')

        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip, {
            paragraphLoop: true,
            linebreaks: true,
        })
        // .catch(err => {
        //     return next(new appError("Docxtemplate Error: ", err), 404)
        // })


        // GET INFO
        const corporateCustomerDB = await corporateCustomerModel.findOne({
            where: { CustomerID: customerIDReq},
            include: [{
                model: customerModel,
                include: [{
                    model: cityProvinceModel, attributes: ['Name']
                }, {
                    model: countryModel, attributes: ['Name']
                }, {
                    model: sectorModel, attributes: ['Name']
                }, {
                    model: industryModel, attributes: ['Name']
                }]
            }]
        })
        .catch(err => {
            return next(new appError('Get Customer Error: ', customerDB))
        })

        const customerDB = corporateCustomerDB.CUSTOMER
        
        let renderObj = {}
        // CHECK RENDER
        if(customerDB.getDataValue('GB_FullName')){
            renderObj.CustomerName_ = customerDB.getDataValue('GB_FullName')
        }else{
            renderObj.CustomerName_ = ' '
        }
        if(customerDB.getDataValue('DocID')){
            renderObj.DocID_ = customerDB.getDataValue('DocID')
        }else{
            renderObj.DocID_ = ' '
        }
        
        
        if(customerDB.getDataValue('GB_Street')){
            renderObj.GB_Street_ = customerDB.getDataValue('GB_Street')
        }else{
            renderObj.GB_Street_ = ' '
        }
        if(customerDB.getDataValue('GB_Towndist')){
            renderObj.GB_Towndist_ = customerDB.getDataValue('GB_Towndist')
        }else{
            renderObj.GB_Towndist_ = ' '
        }
        if(customerDB.CITYPROVINCE.getDataValue('Name')){
            renderObj.Province_ = customerDB.CITYPROVINCE.getDataValue('Name').slice(5)
        }else{
            renderObj.Province_ = ' '
        }
        if(customerDB.COUNTRY.getDataValue('GB_Country')){
            renderObj.GB_Country_ = customerDB.COUNTRY.getDataValue('GB_Country')
        }else{
            renderObj.GB_Country_ = ' '
        }
        if(corporateCustomerDB.getDataValue('EmailAddress')){
            renderObj.EmailAddress_ = corporateCustomerDB.getDataValue('EmailAddress')
        }else{
            renderObj.EmailAddress_ = ' '
        }
        if(customerDB.getDataValue('PhoneNumber')){
            renderObj.PhoneNumber_ = customerDB.getDataValue('PhoneNumber')
        }else{
            renderObj.PhoneNumber_ = ' '
        }
        if(corporateCustomerDB.getDataValue('EmployeesNo')){
            renderObj.EmployeesNo_ = corporateCustomerDB.getDataValue('EmployeesNo')
        }else{
            renderObj.EmployeesNo_ = ' '
        }
        //Sector - Industry - TotalRevenue ContactPerson - 
        if(customerDB.getDataValue('PhoneNumber')){
            renderObj.PhoneNumber_ = customerDB.getDataValue('PhoneNumber')
        }else{
            renderObj.PhoneNumber_ = ' '
        }
        if(customerDB.SECTOR.getDataValue('Name')){
            renderObj.Sector_ = customerDB.SECTOR.getDataValue('Name')
        }else{
            renderObj.Sector_ = ' '
        }
        if(customerDB.INDUSTRY.getDataValue('Name')){
            renderObj.Industry_ = customerDB.INDUSTRY.getDataValue('Name')
        }else{
            renderObj.Industry_ = ' '
        }
        if(corporateCustomerDB.getDataValue('ContactPerson')){
            renderObj.ContactPerson_ = corporateCustomerDB.getDataValue('ContactPerson')
        }else{
            renderObj.ContactPerson_ = ' '
        }
        if(corporateCustomerDB.getDataValue('TotalRevenue')){
            renderObj.TotalRevenue_ = corporateCustomerDB.getDataValue('TotalRevenue')
        }else{
            renderObj.TotalRevenue_ = ' '
        }


        // FILE RENDER
        doc.render(renderObj)

        const docBuf = doc.getZip().generate({type: 'nodebuffer'})
        // const customerPath = individualCustomerDB.getDataValue('id')
        // const filePath = '../../../client/src/resources/Files/individual/' + customerPath.toString() +'.docx'
        // fs.writeFileSync(path.resolve(__dirname, filePath), docBuf)

        const
        blobName = getBlobName(`${customerDB.getDataValue('GB_FullName')}.docx`),
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
            data: URLRes,
            blobName: blobName
        })
    }),

    exportDeposit: asyncHandler(async (req, res, next) =>{
        //------------------------------CASH DEPOSIT--------------------------------
        //File resolve
        const depositID = req.params.id
        const content = fs.readFileSync(path.resolve(__dirname, '../../public/file/deposit.docx'), 'binary')
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip)
        //Get info
        const depositDB = await DepositTrans.findByPk(depositID, {
            include: [{
                model: Currency, attributes: ['Name']
            }]
        })
        if(!depositDB){
            return res.status(404).json({
                message: 'Info Error'
            })
        }
        const accountID = depositDB.getDataValue('Account')
        const accountType = depositDB.getDataValue('AccountType')
        console.log(accountType)
        let accountDB
        if(accountType == 1){
            accountDB = await DebitAccount.findByPk(accountID, {
                include: [{
                    model: customerModel, as: 'Customer', 
                    include: [{
                        model: countryModel, attributes:['Name']
                    }, {
                        model: cityProvinceModel, attributes: ['Name']
                    }]
                }]
            })
            if(!accountDB){
                return res.status(404).json({
                    message: 'Info Error'
                })
            }
        }
        // render
        let render = {}
        let subCustomer = accountDB.get('Customer')
        let today = new Date()
        let day = today.getDate()
        let month = (today.getMonth() + 1).toString()
        let year = today.getFullYear()
        render.Date_ = day
        render.Month_ = month
        render.Year_ = year
        render.CustomerName_ = subCustomer.GB_FullName? accountDB.get('Customer').GB_FullName : ''
        render.Street = subCustomer.GB_Street?  subCustomer.GB_Street : ''
        render.Towndist_ = subCustomer.GB_Towndist ? subCustomer.GB_Towndist : ''
        render.Country_ = subCustomer.COUNTRY.Name ? subCustomer.COUNTRY.Name : ''
        render.City_ = subCustomer.CITYPROVINCE.Name ? subCustomer.CITYPROVINCE.Name.slice(5) : ''
        render.Identify_ = subCustomer.DocID ?  subCustomer.DocID : ''
        render.IssueDate_ = subCustomer.DocExpiryDate ? subCustomer.DocExpiryDate : '           '
        render.IssuePlace_ = subCustomer.DocIssuePlace ? subCustomer.DocIssuePlace : '            '
        render.Amount_ = depositDB.DepositAmount ? depositDB.DepositAmount : ''
        render.Currency_ = depositDB.CURRENCY.Name ? depositDB.CURRENCY.Name: ''
        render.Narrative_ = depositDB.Narrative ?  depositDB.Narrative : ''
        render.TransNo_ =  `TT.20144.${subCustomer.DocID}`
        render.Teller_ = depositDB.TellerID ? depositDB.TellerID : ''
        render.PaymentNo_ = `${day}${month}${year}.${depositID}`
        render.Account_ = depositID
        render.AmountText = readAmount.to_vietnamese(render.Amount_).toUpperCase()
        // FILE RENDER
        doc.render(render)
        const docBuf = doc.getZip().generate({type: 'nodebuffer'})

        const
        blobName = getBlobName(`CashDeposit${accountDB.id}.docx`),
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
            message: 'Exported Account',
            data: URLRes,
            blobName: blobName
        })
    }),

    exportAccount: asyncHandler(async (req, res, next) => {
        const accountID = req.params.id
        // -------------------------------------- OPEN ACCOUNT ---------------------------------
        const content = fs.readFileSync(path.resolve(__dirname, '../../public/file/OpenAccount.docx'), 'binary')
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip)

        //Get info

        const accountDB = await DebitAccount.findByPk(accountID, {
            include: [{
                model: customerModel, as: 'Customer', 
                include: [{
                    model: countryModel, attributes:['Name']
                }, {
                    model: cityProvinceModel, attributes: ['Name']
                }]
            },{
                model: Currency , attributes: ['Name']
            }, {
                model: customerModel, as: 'JoinHolder'
            }]
        })
        if(!accountDB){
            return res.status(404).json({
                message: 'Info Error'
            })
        }
        
        // render
        let render = {}
        let subCustomer = accountDB.get('Customer')
        let today = new Date()
        let day = today.getDate()
        let month = (today.getMonth() + 1).toString()
        let year = today.getFullYear()
        render.Date_ = day
        render.Month_ = month
        render.Year_ = year
        render.CustomerName_ = subCustomer.GB_FullName? subCustomer.GB_FullName : ''
        render.Street = subCustomer.GB_Street?  subCustomer.GB_Street : ''
        render.Towndist_ = subCustomer.GB_Towndist ? subCustomer.GB_Towndist : ''
        render.Country_ = subCustomer.COUNTRY.Name ? subCustomer.COUNTRY.Name : ''
        render.City_ = subCustomer.CITYPROVINCE.Name.slice(5) ? subCustomer.CITYPROVINCE.Name.slice(5) : ''
        render.Identify_ = subCustomer.DocID ?  subCustomer.DocID : ''
        render.IssueDate = '           '
        render.IssuePlace_ = subCustomer.DocIssuePlace ? subCustomer.DocIssuePlace : '            '
        render.TransNo_ =  `TT.20144.${subCustomer.DocID}`
        render.Currency_ = accountDB.CURRENCY.Name? accountDB.CURRENCY.Name : ''
        render.ValueDate_ = ''
        render.CustomerID_ = subCustomer.id
        render.AccountID_ = accountID
        render.JoinHolder_ = accountDB.JoinHolder.GB_FullName ? accountDB.JoinHolder.GB_FullName : ''
        // FILE RENDER
        doc.render(render)
        const docBuf = doc.getZip().generate({type: 'nodebuffer'})

        const
        blobName = getBlobName(`Account${accountID}.docx`),
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
            message: 'Exported Account',
            data: URLRes,
            blobName: blobName,
            account: accountDB
        })
    }), 

    exportWithdrawal : asyncHandler( async (req, res, next)=> {
        //
        const idReq = req.params.id // transaction id
        
        //File Resolve
        const content = fs.readFileSync(path.resolve(__dirname, '../../public/file/withdrawal.docx'), 'binary')
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip)

        //Get Info
        // -- Withdrawal
        const withdrawalDB = await WithdrawalTrans.findByPk(idReq, {
            include: [{
                model: Currency, attributes: ['Name'], as:'Currencyt'
            }]
        })
        if(!withdrawalDB){
            return res.status(404).json({
                message: 'Info Error'
            })
        }
        const accountType = withdrawalDB.getDataValue('AccountType')
        const accountID = withdrawalDB.getDataValue('Account')
        let accountDB
        if(accountType == 1){
            accountDB = await DebitAccount.findByPk(accountID, {
                include: [{
                    model: customerModel, as: 'Customer', 
                    include: [{
                        model: countryModel, attributes:['Name']
                    }, {
                        model: cityProvinceModel, attributes: ['Name']
                    }]
                }]
            })
            if(!accountDB){
                return res.status(404).json({
                    message: 'Info Error'
                })
            }
        }

        // Render
        let render = {}
        let today = new Date()
        let day = today.getDate()
        let month = (today.getMonth() + 1).toString()
        let year = today.getFullYear()
        render.Date = year + month + day
        render.day = day
        render.month = month
        render.year = year
        render.TransNo = `TT.20144.${accountDB.id}`
        render.TellerID = withdrawalDB.TellerID ?? 'VietVictory'
        render.TransID = withdrawalDB.id ?? ''
        render.AccountID = withdrawalDB.Account ?? ''
        render.CustomerName = accountDB.Customer?.GB_FullName ?? ''
        render.Street = accountDB.Customer?.GB_Street ?? ''
        render.Towndist = accountDB.Customer?.GB_Towndist ?? ''
        render.City =  accountDB.Customer?.CITYPROVINCE.Name ?? ''
        render.Country = accountDB.Customer?.COUNTRY.Name ?? ''
        render.DocID = accountDB.Customer?.DocID ?? ''
        render.IssueDate = ''
        render.PlaceOfIssue = accountDB.Customer?.DocIssuePlace ?? ''
        render.Amount = withdrawalDB.WithdrawalAmount ?? ''
        render.Currency = withdrawalDB.Currencyt.Name ?? ''
        render.Narrative = withdrawalDB.Narrative ?? 'RUT TIEN'
        render.AmountText = readAmount.to_vietnamese(render.Amount).toUpperCase() ?? ''

        // FILE RENDER
        doc.render(render)
        const docBuf = doc.getZip().generate({type: 'nodebuffer'})

        const
        blobName = getBlobName(`CashWithdrawal${accountDB.id}.docx`),
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
            message: 'Exported Withdrawal',
            data: URLRes,
            blobName: blobName
        })
    }),

    exportTransfer: asyncHandler( async (req, res, next) => {
        //
        const idReq = req.params.id // transaction id

        //File Resolve
        const content = fs.readFileSync(path.resolve(__dirname, '../../public/file/transfer.docx'), 'binary')
        const zip = new PizZip(content)
        const doc = new Docxtemplater(zip)

        //Get Info
        // Transfer
        const transferDB = await TransferTrans.findByPk(idReq)

        if(!transferDB){
            return res.status(404).json({
                message: 'Info Error'
            })
        }

        const debitAccountID = transferDB.getDataValue('DebitAccount')
        const creditAccountID = transferDB.getDataValue('CreditAccount')
        const debitAccountDB = await DebitAccount.findByPk(debitAccountID, {
            include: [{
                model: customerModel, as: 'Customer', 
                include: [{
                    model: countryModel, attributes:['Name']
                }, {
                    model: cityProvinceModel, attributes: ['Name']
                }]
            }, {
                model: Currency, attributes: ['Name']
            }]
        })
        if(!debitAccountDB){
            return res.status(404).json({
                message: 'Info Error'
            })
        }

        const creditAccountDB = await DebitAccount.findByPk(creditAccountID, {
            include: [{
                model: customerModel, as: 'Customer', 
                include: [{
                    model: countryModel, attributes:['Name']
                }, {
                    model: cityProvinceModel, attributes: ['Name']
                }]
            }, {
                model: Currency, attributes: ['Name']
            }]
        })
        if(!creditAccountDB){
            return res.status(404).json({
                message: 'Info Error'
            })
        }

        let render = {}
        let today = new Date()
        let day = today.getDate()
        let month = (today.getMonth() + 1).toString()
        let year = today.getFullYear()
        render.Date = year + month + day
        render.day = day
        render.month = month
        render.year = year 
        render.TransNo = `TT.20144.${debitAccountDB.id}`
        render.TellerID = transferDB.TellerID ?? 'VietVictory'
        render.AccountID = transferDB.DebitAccount ?? ''
        render.CustomerName = debitAccountDB.Customer?.GB_FullName ?? '  '
        render.DocID =  debitAccountDB.Customer?.DocID ?? ''
        render.Amount = transferDB.TransferAmount
        render.Currency = debitAccountDB.CURRENCY?.Name ?? ''
        render.AmountText = readAmount.to_vietnamese(render.Amount).toUpperCase() ?? ''
        render.TransferredCustomer = creditAccountDB.Customer?.GB_FullName ?? ''
        render.TransferredID = transferDB.CreditAccount ?? ''
        render.DocID_ = creditAccountDB.Customer?.DocID ?? ''
        render.Amount_ = transferDB.CreditAmount ?? ''
        render.Currency_ = creditAccountDB.CURRENCY?.Name ?? ''
        render.AmountText_ = readAmount.to_vietnamese(render.Amount_).toUpperCase() ?? ''
        render.Narrative = transferDB.Narrative ?? 'CHUYEN TIEN'

        // FILE RENDER
        doc.render(render)
        const docBuf = doc.getZip().generate({type: 'nodebuffer'})

        const
        blobName = getBlobName(`CashTransfer${debitAccountDB.id}.docx`),
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
            message: 'Exported Transfer',
            data: URLRes,
            blobName: blobName
        })
    })
}

module.exports = exportFileController
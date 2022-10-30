const customerModel = require('../../models/customer/customer')
const corporateCustomerModel = require('../../models/customer/corporateCustomer')
const asyncHandler = require('../../utils/async')
const AppError = require('../../utils/appError')
const constValue = require('../const')

const countryModel = require('../../models/storage/country')
const cityModel = require('../../models/storage/cityProvince')
const docTypeModel = require('../../models/storage/doctype')
const sectorModel = require('../../models/storage/sector')
const subSectorModel = require('../../models/storage/subSector')
const industryModel = require('../../models/storage/industry')
const subIndustryModel = require('../../models/storage/industry')
const accountOfficerModel = require('../../models/storage/accountOfficer')
const relationCodeModel = require('../../models/storage/relation')

const corporateCustomerController = {
    create: asyncHandler( async (req, res, next) => {
        const customerReq = {
            GB_ShortName: req.body.GB_ShortName,
            GB_FullName: req.body.GB_FullName,
            IncorpDate: req.body.incorpDate,
            ContactPerson: req.body.contactPerson,
            Position: req.body.position,
            Telephone: req.body.telephone,
            EmailAddress: req.body.emailAddress,
            Remarks: req.body.remarks,
            ContactDate: req.body.contactDate,
            OfficeNumber: req.body.officeNumber,
            TotalCapital: req.body.totalCapital,
            TotalAssets: req.body.totalAssets,
            TotalRevenue: req.body.totalRevenue,
            EmployeesNo: req.body.employeesNo,
            Sector: req.body.sector,
            GB_Street: req.body.GB_Street,
            GB_Towndist: req.body.GB_Towndist,
            GB_Country: req.body.GB_Country,
            DocID: req.body.docID,
            DocIssuePlace: req.body.docIssuePlace,
            DocIssueDate: req.body.docIssueDate,
            DocExpiryDate: req.body.docExpiryDate,
            CompanyBook: req.body.companyBook,
            Liability: req.body.liability,
            CityProvince: req.body.cityProvince,
            Nationality: req.body.nationality,
            Residence: req.body.residence,
            Doctype: req.body.doctype,
            MainSector: req.body.mainSector,
            MainIndustry: req.body.mainIndustry,
            Industry: req.body.industry,
            AccountOfficer: req.body.accountOfficer,
            RelationCode: req.body.relationCode
        }

        console.log(customerReq)

        /*if(!customerReq.GB_ShortName || !customerReq.GB_FullName || !customerReq.IncorpDate 
            || !customerReq.GB_Street || !customerReq.GB_Towndist || !customerReq.CityProvince
            || !customerReq.Doctype || !customerReq.DocID || !customerReq.DocIssuePlace
            || !customerReq.DocIssueDate || !customerReq.MainSector || !customerReq.Sector){
                return next(new AppError("Enter required fields!", 404))
        }*/

        const customerDB = await customerModel.findOne({where: {
            DocID: customerReq.DocID,
            Doctype: customerReq.Doctype
        }})

        if(customerDB){
            return res.status(400).json({
                message: 'customer existed'
            })
        }

        const newCustomer = await customerModel.create({
            GB_ShortName: customerReq.GB_ShortName,
            GB_FullName: customerReq.GB_FullName,
            GB_Street: customerReq.GB_Street,
            GB_Towndist: customerReq.GB_Towndist,
            GB_Country: customerReq.GB_Country,
            DocID: customerReq.DocID,
            DocIssuePlace: customerReq.DocIssuePlace,
            DocExpiryDate: customerReq.DocExpiryDate,
            DocIssueDate: customerReq.DocIssueDate,
            CompanyBook: customerReq.CompanyBook,
            Liability: customerReq.Liability,
            CityProvince: customerReq.CityProvince,
            Nationality: customerReq.Nationality,
            Residence: customerReq.Residence,
            Doctype: customerReq.Doctype,
            MainSector: customerReq.MainSector,
            MainIndustry: customerReq.MainIndustry,
            Industry: customerReq.Industry,
            AccountOfficer: customerReq.AccountOfficer,
            RelationCode: customerReq.RelationCode,
            PhoneNumber: customerReq.OfficeNumber,
            CustomerType: constValue.customer.corporateCustomer,
            SubSector: customerReq.Sector
        })
        .catch(err => {
            return next(new AppError(err, 404))
        })
        // UPDATE REF ID
        const newCustomerID = newCustomer.getDataValue("id")
        let refTemp = newCustomerID.toString().padStart(5, '0')
        refTemp = '2' + refTemp
        const refID = `${refTemp}`
        const updatedCustomer = await newCustomer.update({
            RefID: refID
        })

        const newCorporateCustomer = await corporateCustomerModel.create({
            IncorpDate: customerReq.IncorpDate,
            ContactPerson: customerReq.ContactPerson,
            Position: customerReq.Position,
            Telephone: customerReq.Telephone,
            EmailAddress: customerReq.EmailAddress,
            Remarks: customerReq.Remarks,
            ContactDate: customerReq.ContactDate,
            OfficeNumber: customerReq.OfficeNumber,
            TotalAssets: customerReq.TotalAssets,
            TotalRevenue: customerReq.TotalRevenue,
            EmployeesNo: customerReq.EmployeesNo,
            CustomerID: newCustomerID
        })
        .catch(err => {
            return next(new AppError(err, 404))
        })

        return res.status(200).json({
            message: "inserted",
            data: {
                customer: updatedCustomer,
                corporateCustomer: newCorporateCustomer
            }
        })
    }),

    findByID: asyncHandler(async (req, res, next) => {
        const customerIDReq = req.params.id
        console.log(customerIDReq)
        const corporateCustomerDB = await corporateCustomerModel.findOne({
            where: {CustomerID: customerIDReq},
            include: [{
                model: customerModel, 
                include: [{
                    model: countryModel, attributes: ['Name', 'Code']
                }, {
                    model: cityModel, attributes: ['Name']
                }, {
                    model: docTypeModel, attributes: ['Name']
                }, {
                    model: sectorModel, attributes: ['Name']
                }, {
                    model: subSectorModel, attributes: ['Name']
                }, {
                    model: industryModel, attributes: ['Name']
                }, {
                    model: subIndustryModel, attributes: ['Name']
                }, {
                    model: accountOfficerModel, attributes: ['Name']
                }, {
                    model: relationCodeModel, attributes: ['Name']
                }]
            }]
            
        })
        if( !corporateCustomerDB) {
            return next(new AppError("Customer not found!", 404))
        }
        return res.status(200).json({
            message: "Corporate Customer",
            data: corporateCustomerDB
        })
    }),

    getAll: asyncHandler(async (req, res, next) =>{
        const {rows, count} = await corporateCustomerModel.findAndCountAll({
            include:[customerModel]
        })

        return res.status(200).json({
            message: "get all customer",
            data: {
                quantity: count,
                customers: rows
            }
        })
    }),

    update: asyncHandler(async (req, res, next) => {
        const customerIDReq = req.params.id
        const customerReq = {
            GB_ShortName: req.body.GB_ShortName,
            GB_FullName: req.body.GB_FullName,
            IncorpDate: req.body.incorpDate,
            ContactPerson: req.body.contactPerson,
            Position: req.body.position,
            Telephone: req.body.telephone,
            EmailAddress: req.body.emailAddress,
            Remarks: req.body.remarks,
            ContactDate: req.body.contactDate,
            OfficeNumber: req.body.officeNumber,
            TotalCapital: req.body.totalCapital,
            TotalAssets: req.body.totalAssets,
            TotalRevenue: req.body.totalRevenue,
            EmployeesNo: req.body.employeesNo,
            Sector: req.body.sector,
            GB_Street: req.body.GB_Street,
            GB_Towndist: req.body.GB_Towndist,
            GB_Country: req.body.GB_Country,
            DocID: req.body.docID,
            DocIssuePlace: req.body.docIssuePlace,
            DocIssueDate: req.body.docIssueDate,
            DocExpiryDate: req.body.docExpiryDate,
            CompanyBook: req.body.companyBook,
            Liability: req.body.liability,
            CityProvince: req.body.cityProvince,
            Nationality: req.body.nationality,
            Residence: req.body.residence,
            Doctype: req.body.doctype,
            MainSector: req.body.mainSector,
            MainIndustry: req.body.mainIndustry,
            Industry: req.body.industry,
            AccountOfficer: req.body.accountOfficer,
            RelationCode: req.body.relationCode
        }

        const customerDB = await customerModel.findOne({where: {id: customerIDReq}})
        if(!customerDB){
            return next(new AppError('Customer not found!', 400))
        }

        const customerUpdate = await customerDB.update({
            GB_Street: customerReq.GB_Street,
            GB_Towndist: customerReq.GB_Towndist,
            GB_Country: customerReq.GB_Country,
            DocID: customerReq.DocID,
            DocIssuePlace: customerReq.DocIssuePlace,
            DocExpiryDate: customerReq.DocExpiryDate,
            CompanyBook: customerReq.CompanyBook,
            Liability: customerReq.Liability,
            CityProvince: customerReq.CityProvince,
            Nationality: customerReq.Nationality,
            Residence: customerReq.Residence,
            Doctype: customerReq.Doctype,
            MainSector: customerReq.MainSector,
            MainIndustry: customerReq.MainIndustry,
            Industry: customerReq.Industry,
            SubSector: customerReq.Sector,
            AccountOfficer: customerReq.AccountOfficer,
            RelationCode: customerReq.RelationCode,
            GB_ShortName: customerReq.GB_ShortName,
            GB_FullName: customerReq.GB_FullName
        })

        const customerID = customerDB.getDataValue('id')
        console.log(customerID)

        const corporateCustomerDB = await corporateCustomerModel.findOne({where: {CustomerID: customerID}})
        if(!corporateCustomerDB){
            return next(new AppError("error", 400))
        }
        const corporateCustomerUpdate = await corporateCustomerDB.update({
            IncorpDate: customerReq.IncorpDate,
            ContactPerson: customerReq.ContactPerson,
            Position: customerReq.Position,
            Telephone: customerReq.Telephone,
            EmailAddress: customerReq.EmailAddress,
            Remarks: customerReq.Remarks,
            ContactDate: customerReq.ContactDate,
            OfficeNumber: customerReq.OfficeNumber,
            TotalAssets: customerReq.TotalAssets,
            TotalRevenue: customerReq.TotalRevenue,
            EmployeesNo: customerReq.EmployeesNo
        })

        return res.status(200).json({
            message: "updated",
            data: {
                corporateCustomer: corporateCustomerUpdate,
                customer: customerUpdate
            }
        })
    }),

    delete: asyncHandler(async (req, res, next) => {
        const customerIDReq = req.params.id
        const isDestroyed_corpo= await corporateCustomerModel.destroy({
            where: {CustomerID: customerIDReq}
        })
        let isDestroyed
        if(isDestroyed_corpo){
            isDestroyed = await customerModel.destroy({
                where: {id: customerIDReq}
            })
        }

        return res.status(200).json({
            message: "deleted",
            data: {
                result: isDestroyed,
                resultCorpo: isDestroyed_corpo
            }
        })
    })
}
module.exports = corporateCustomerController
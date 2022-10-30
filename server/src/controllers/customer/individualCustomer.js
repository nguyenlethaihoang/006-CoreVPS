const customerModel = require('../../models/customer/customer')
const customerTypeModel = require('../../models/customer/customerType')
const individualCustomerModel = require('../../models/customer/individualCustomer')
const constValue = require('../const')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')
const AppError = require('../../utils/appError')

const countryModel = require('../../models/storage/country')
const cityModel = require('../../models/storage/cityProvince')
const docTypeModel = require('../../models/storage/doctype')
const sectorModel = require('../../models/storage/sector')
const subSectorModel = require('../../models/storage/subSector')
const industryModel = require('../../models/storage/industry')
const subIndustryModel = require('../../models/storage/industry')
const accountOfficerModel = require('../../models/storage/accountOfficer')
const relationCodeModel = require('../../models/storage/relation')

// gtri request(Name) => BE: search ID => luu tru foreignKey = id
// gtri request(ID) => FE: lay value cho <option> la ID + hien thi <option> la Name
const individualCustomerController = {
    create: asyncHandler( async (req, res, next) => {
        const customerReq = {
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MiddleName: req.body.middleName,
            GB_ShortName: req.body.GB_ShortName,
            GB_FullName: req.body.GB_FullName,
            Birthday: req.body.birthday,
            MobilePhone: req.body.mobilePhone,
            EmailAddress: req.body.emailAddress,
            SubSector: req.body.subSector,
            GB_Street: req.body.GB_Street,
            GB_Towndist: req.body.GB_Towndist,
            GB_Country: req.body.GB_Country,
            CityProvince: req.body.cityProvince,
            Nationality: req.body.nationality,
            Residence: req.body.residence,
            Doctype: req.body.doctype,
            DocID: req.body.docID,
            DocIssuePlace: req.body.docIssuePlace,
            DocIssueDate: req.body.docIssueDate,
            DocExpiryDate: req.body.docExpiryDate,
            MainSector: req.body.mainSector,
            MainIndustry: req.body.mainIndustry,
            Industry: req.body.industry,
            AccountOffice: req.body.accountOfficer,
            Gender: req.body.gender,
            Title: req.body.title,
            MaritalStatus: req.body.maritalStatus,
            ContactDate: req.body.contactDate,
            RelationCode: req.body.relationCode,
            OfficeNumber: req.body.officeNumber,
            FaxNumber: req.body.faxNumber,
            DependantsNo: req.body.dependantsNo,
            ChildUnder15: req.body.childUnder15,
            Childfr15to25: req.body.childfr15to25,
            ChildOver25: req.body.childOver25,
            HomeOwnership: req.body.homeOwnership,
            ResidenceType: req.body.residenceType,
            EmploymentStatus: req.body.employmentStatus,
            CompanyName: req.body.companyName,
            Currency: req.body.currency,
            MonthlyIncome: req.body.monthlyIncome,
            OfficeAddress: req.body.officeAddress,
            Liability: req.body.customerLiability,
            CityzenIdentify: req.body.cityzenIdentify
        }

        // CHECK EXISTED
        const customerDB = await customerModel.findOne({where: {
            DocID: customerReq.DocID,
            Doctype: customerReq.Doctype
        }})

        if(customerDB){
            return res.status(400).json({
                message: 'customer existed'
            })
        }

        /*if(!customerReq.GB_ShortName || !customerReq.GB_FullName || !customerReq.Birthday ||
            !customerReq.GB_Street || !customerReq.GB_Towndist || !customerReq.CityProvince || 
            !customerReq.Doctype || !customerReq.DocID || !customerReq.DocIssuePlace ||
            !customerReq.DocIssueDate || !customerReq.MainSector || !customerReq.SubSector ||
            !customerReq.MainIndustry || !customerReq.Industry){
                return next(new AppError("Enter required fields!", 400))
        }*/

        const newCustomer = await customerModel.create({
            GB_ShortName: customerReq.GB_ShortName,
            GB_FullName: customerReq.GB_FullName,
            GB_Street: customerReq.GB_Street,
            GB_Towndist: customerReq.GB_Towndist,
            GB_Country: customerReq.GB_Country,
            DocID: customerReq.DocID,
            DocIssuePlace: customerReq.DocIssuePlace,
            DocIssueDate: customerReq.DocIssueDate,
            DocExpiryDate: customerReq.DocExpiryDate,
            CompanyBook: customerReq.CompanyName,
            Liability: customerReq.Liability,
            CityProvince: customerReq.CityProvince,
            Nationality: customerReq.Nationality,
            Residence: customerReq.Residence,
            Doctype: customerReq.Doctype,
            MainSector: customerReq.MainSector,
            MainIndustry: customerReq.MainIndustry,
            Industry: customerReq.Industry,
            AccountOfficer: customerReq.AccountOffice,
            CustomerType: constValue.customer.individualCustomer,
            RelationCode: customerReq.RelationCode,
            PhoneNumber: customerReq.MobilePhone,
            SubSector: customerReq.SubSector,
        })
        .catch(err => {
            console.log(err)
        })

        // UPDATE REF ID
        const customerID = newCustomer.getDataValue("id")
            let refTemp = customerID.toString().padStart(5, '0')
            refTemp = '1' + refTemp
            const refID = `${refTemp}`
            const updatedCustomer = await newCustomer.update({
                RefID: refID
        })


        
        const newIndividualCustomer = await individualCustomerModel.create({
            FirstName: customerReq.FirstName,
            LastName: customerReq.LastName,
            MiddleName: customerReq.MiddleName,
            Birthday: customerReq.Birthday,
            MobilePhone: customerReq.MobilePhone,
            EmailAddress: customerReq.EmailAddress,
            CustomerID: customerID,
            Currency: customerReq.Currency,
            CityzenIdentify: customerReq.CityzenIdentify
        })
        .catch(err =>{
            console.log(err)
        })

        return res.status(200).json({
            message: "inserted",
            data: {
                customer: updatedCustomer,
                individualCustomer: newIndividualCustomer
            }
        })
    }),

    getAll: asyncHandler(async (req, res, next) => {
        const {rows, count} = await individualCustomerModel.findAndCountAll({
            //where: {CustomerType: constValue.customer.individualCustomer},
            include: [{
                model: customerModel
            }]
        })

        return res.status(200).json({
            message: "get all posts",
            data: {
                quantity: count,
                customers: rows
            }
        })
    }),

    // MSKH
    findByID: asyncHandler(async (req, res, next) => {
        const customerIDReq = req.params.id
        const customerDB = await individualCustomerModel.findOne({
            where: {CustomerID: customerIDReq },
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
        }).catch(err=> {
            console.log(err)
        })

        return res.status(200).json({
            message: "individual customer",
            data: customerDB
        })
    }),
    
    update: asyncHandler(async (req, res, next) => {
        const customerIDReq = req.params.id 
        const customerReq = {
            FirstName: req.body.firstName,
            LastName: req.body.lastName,
            MiddleName: req.body.middleName,
            GB_ShortName: req.body.GB_ShortName,
            GB_FullName: req.body.GB_FullName,
            Birthday: req.body.birthday,
            MobilePhone: req.body.mobilePhone,
            EmailAddress: req.body.emailAddress,
            SubSector: req.body.subSector,
            GB_Street: req.body.GB_Street,
            GB_Towndist: req.body.GB_Towndist,
            GB_Country: req.body.GB_Country,
            CityProvince: req.body.cityProvince,
            Nationality: req.body.nationality,
            Residence: req.body.residence,
            Doctype: req.body.doctype,
            DocID: req.body.docID,
            DocIssuePlace: req.body.docIssuePlace,
            DocIssueDate: req.body.docIssueDate,
            DocExpiryDate: req.body.docExpiryDate,
            MainSector: req.body.mainSector,
            MainIndustry: req.body.mainIndustry,
            Industry: req.body.industry,
            AccountOffice: req.body.accountOfficer,
            Gender: req.body.gender,
            Title: req.body.title,
            MaritalStatus: req.body.maritalStatus,
            ContactDate: req.body.contactDate,
            RelationCode: req.body.relationCode,
            OfficeNumber: req.body.officeNumber,
            FaxNumber: req.body.faxNumber,
            DependantsNo: req.body.dependantsNo,
            ChildUnder15: req.body.childUnder15,
            Childfr15to25: req.body.childfr15to25,
            ChildOver25: req.body.childOver25,
            HomeOwnership: req.body.homeOwnership,
            ResidenceType: req.body.residenceType,
            EmploymentStatus: req.body.employmentStatus,
            CompanyName: req.body.companyName,
            Currency: req.body.currency,
            MonthlyIncome: req.body.monthlyIncome,
            OfficeAddress: req.body.officeAddress,
            Liability: req.body.customerLiability
        }

        const customerDB = await customerModel.findOne({where: {id: customerIDReq}})
        if( !customerDB ){
            return next(new AppError("Customer not found!", 400))
        }

        const customerUpdated = await customerDB.update({
            GB_Street: customerReq.GB_Street,
            GB_Towndist: customerReq.GB_Towndist,
            GB_Country: customerReq.GB_Country,
            DocID: customerReq.DocID,
            DocIssuePlace: customerReq.DocIssuePlace,
            DocExpiryDate: customerReq.DocExpiryDate,
            CompanyBook: customerReq.CompanyName,
            Liability: customerReq.Liability,
            CityProvince: customerReq.CityProvince,
            Nationality: customerReq.Nationality,
            Residence: customerReq.Residence,
            Doctype: customerReq.Doctype,
            MainSector: customerReq.MainSector,
            MainIndustry: customerReq.MainIndustry,
            Industry: customerReq.Industry,
            AccountOfficer: customerReq.AccountOffice,
            CustomerType: constValue.customer.individualCustomer,
            RelationCode: customerReq.RelationCode,
            GB_ShortName: customerReq.GB_ShortName,
            GB_FullName: customerReq.GB_FullName,
        })

        const individualCustomerDB = await individualCustomerModel.findOne({where: {CustomerID: customerIDReq}})
        if( !individualCustomerDB ){
            return next(new AppError("error", 404))
        }
        const individualCustomerUpdate = await individualCustomerDB.update({
            FirstName: customerReq.FirstName,
            LastName: customerReq.LastName,
            MiddleName: customerReq.MiddleName,
            Birthday: customerReq.Birthday,
            MobilePhone: customerReq.MobilePhone,
            EmailAddress: customerReq.EmailAddress,
            SubSector: customerReq.SubSector,
            Currency: customerReq.Currency
        })

        return res.status(200).json({
            message: "updated",
            data: {
                individualCustomer: individualCustomerUpdate,
                customer: customerUpdated
            }
        })
    }),
    delete: asyncHandler( async (req, res, next) => {
        const customerIDReq = req.params.id
        
        const isDestroyed_indi = await individualCustomerModel.destroy({
            where: {CustomerID: customerIDReq}
        })
        let isDestroyed
        if(isDestroyed_indi){
            isDestroyed = await customerModel.destroy({
                where: {id: customerIDReq}
            })
        }

        return res.status(200).json({
            message: "deleted",
            data: {
                result: isDestroyed,
                resultIndi: isDestroyed_indi
            }
        })
    })
}

module.exports = individualCustomerController
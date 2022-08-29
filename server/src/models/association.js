const cityProvince = require('./storage/cityProvince')
const customer = require('./customer/customer')
const customerType = require('./customer/customerType')
const individualCustomer = require('./customer/individualCustomer')
const corporateCustomer = require('./customer/corporateCustomer')
const country = require('./storage/country')
const doctype = require('./storage/doctype')
const sector = require('./storage/sector')
const industry = require('./storage/industry')
const accountOfficer = require('./storage/accountOfficer')
const relation = require('./storage/relation')
const currency = require('./storage/currency')
const subSector = require('./storage/subSector')
const subIndustry = require('./storage/subIndustry')
const category = require('./storage/category')
const productLine = require('./storage/productLine')
const signature = require('./signature/signature')
const debitAccount = require('./account/debitAccount')
const chargeCode = require('./storage/chargeCode')
const blockage = require('./account/blockage')
const closure = require('./account/closure')
const accountType = require('./transaction/accountType')
const deposit = require('./transaction/deposit')
const statusType = require('./signature/statusType')
const savingAccount = require('./account/savingAccount')
const arrearSA = require('./account/ArrearSA')
const periodicSA = require('./account/PeriodicSA')
const discountedSA = require('./account/DiscountedSA')
const savingTerm = require('./account/savingTerm')
const creditAccount = require('./account/creditAccount')
const foreignExchange = require('./exchange/foreignExchange')

const withdrawalTrans = require('./transaction/withdrawal')

const association = () => {
    // CUSTOMER 
    // -- FkCustomer_CityProvinceId
    customer.belongsTo(cityProvince, {
        foreignKey: 'CityProvince'
    })
    cityProvince.hasMany(customer,{
        foreignKey: 'CityProvince'
    })
    // -- FkCustomer_NationalityId
    customer.belongsTo(country, {
        foreignKey: 'Nationality'
    })
    country.hasMany(customer, {
        foreignKey: 'Nationality'
    })
    // --FkCustomer_ResidenceId
    customer.belongsTo(country, {
        foreignKey: 'Residence'
    })
    country.hasMany(customer, {
        foreignKey: 'Residence'
    })
    // --FkCustomer_DoctypeID
    customer.belongsTo(doctype, {
        foreignKey: 'Doctype'
    })
    doctype.hasMany(customer, {
        foreignKey: 'Doctype'
    })
    // --FkCustomer_SectorId
    customer.belongsTo(sector, {
        foreignKey: 'MainSector',
    })
    sector.hasMany(customer, {
        foreignKey: 'MainSector'
    })
    // --FkCustomer_IndustryId
    customer.belongsTo(industry, {
        foreignKey: 'MainIndustry'
    })
    industry.hasMany(customer, {
        foreignKey: 'MainIndustry'
    })
    // --FkCustomer_IndustryId
    customer.belongsTo(industry, {
        foreignKey: 'Industry'
    })
    industry.hasMany(customer, {
        foreignKey: 'Industry'
    })
    // --FkCustomer_AccountOfficerId
    customer.belongsTo(accountOfficer, {
        foreignKey: 'AccountOfficer'
    })
    accountOfficer.hasMany(customer, {
        foreignKey: 'AccountOfficer'
    })
    // --FkCustomer_Type
    customer.belongsTo(customerType, {
        foreignKey: 'CustomerType'
    })
    customerType.hasMany(customer, {
        foreignKey: 'CustomerType'
    })
    // --FkCorporateCustomer_Relation
    customer.belongsTo(relation, {
        foreignKey: 'RelationCode'
    })
    relation.hasMany(customer, {
        foreignKey: 'RelationCode'
    })
    // --FkCustomer-SubSector
    customer.belongsTo(subSector, {
        foreignKey: 'SubSector'
    })
    subSector.hasMany(customer, {
        foreignKey: 'SubSector'
    })

    // INDIVIDUAL CUSTOMER 
    // --FkIndividualCustomer
    individualCustomer.belongsTo(customer,{
        foreignKey: 'CustomerID'
    })
    
    // --FkIndividualCustomer_Currency
    individualCustomer.belongsTo(currency, {
        foreignKey: 'Currency'
    })
    currency.hasMany(individualCustomer, {
        foreignKey: 'Currency'
    })

    // CORPORATE CUSTOMER
    corporateCustomer.belongsTo(customer, {
        foreignKey: 'CustomerID'
    })

    //SECTOR - SUBSECTOR 
    // --FkSector_Subsector
    subSector.belongsTo(sector, {
        foreignKey: 'Sector'
    })

    //INDUSTRY - SUBINDUSTRY
    industry.hasMany(subIndustry, {
        foreignKey: 'Industry'
    })
    subIndustry.belongsTo(industry, {
        foreignKey: 'Industry'
    })

    //CATEGORY - PRODUCTLINE
    productLine.belongsTo(category, {
        foreignKey: 'Category'
    })
    category.hasMany(productLine, {
        foreignKey: 'Category'
    })


    // SIGNATURE
    signature.belongsTo(statusType, {
        foreignKey: 'Status'
    })
    signature.belongsTo(customer, {
        foreignKey: 'CustomerID'
    })

    // DEBIT ACCOUNT
    debitAccount.belongsTo(customer, {
        foreignKey: 'CustomerID',
        as: 'Customer'
    })
    customer.hasMany(debitAccount, {
        foreignKey: 'CustomerID',
        as: 'Customer'
    })

    debitAccount.belongsTo(category, {
        foreignKey: 'Category'
    })
    category.hasMany(debitAccount, {
        foreignKey: 'Category'
    })

    debitAccount.belongsTo(productLine, {
        foreignKey: 'ProductLine'
    })
    productLine.hasMany(debitAccount, {
        foreignKey: 'ProductLine'
    })

    debitAccount.belongsTo(currency, {
        foreignKey: 'Currency'
    })
    currency.hasMany(debitAccount, {
        foreignKey: 'Currency'
    })

    debitAccount.belongsTo(accountOfficer, {
        foreignKey: 'AccountOfficer'
    })
    accountOfficer.hasMany(debitAccount, {
        foreignKey: 'AccountOfficer'
    })

    debitAccount.belongsTo(chargeCode, {
        foreignKey: 'ChargeCode'
    })
    chargeCode.hasMany(debitAccount, {
        foreignKey: 'ChargeCode'
    })

    debitAccount.belongsTo(customer, {
        foreignKey: 'JoinHolderID',
        as: 'JoinHolder'
    })
    customer.hasMany(debitAccount, {
        foreignKey: 'JoinHolderID',
        as: 'JoinHolder'
    })

    debitAccount.belongsTo(relation, {
        foreignKey: 'RelationCode'
    })
    relation.hasMany(debitAccount, {
        foreignKey: 'RelationCode'
    })

    // BLOCKAGE
    blockage.belongsTo(debitAccount, {
        foreignKey: 'Account'
    })
    debitAccount.hasMany(blockage, {
        foreignKey: 'Account'
    })

    //ACCOUNT CLOSURE
    closure.belongsTo(debitAccount, {
        foreignKey: 'Account'
    })
    debitAccount.hasOne(closure, {
        foreignKey: 'Account'
    })
    closure.belongsTo(debitAccount, {
        foreignKey: 'TransferredAccount'
    })
    debitAccount.hasOne(closure, {
        foreignKey: 'TransferredAccount'
    })

    //DEPOSIT
    deposit.belongsTo(accountType, {
        foreignKey: 'AccountType'
    })
    accountType.hasMany(deposit, {
        foreignKey: 'AccountType'
    })
    deposit.belongsTo(currency, {
        foreignKey: 'CurrencyDeposited'
    })
    currency.hasMany(deposit, {
        foreignKey: 'CurrencyDeposited'
    })
    deposit.belongsTo(statusType, {
        foreignKey: 'Status'
    })

    //CREDIT ACCOUNT
    creditAccount.belongsTo(customer, {
        foreignKey: 'CustomerID'
    })
    creditAccount.belongsTo(currency, {
        foreignKey: 'Currency'
    })

    // SAVING ACCOUNT
    savingAccount.belongsTo(accountType, {
        foreignKey: 'Type'
    })
    accountType.hasMany(savingAccount, {
        foreignKey: 'Type'
    })
    savingAccount.belongsTo(customer, {
        foreignKey: 'CustomerID'
    })
    customer.hasMany(savingAccount, {
        foreignKey: 'CustomerID'
    })
    savingAccount.belongsTo(statusType, {
        foreignKey: 'Status'
    })
    
    
    // ARREAR SAVING ACCOUNT
    arrearSA.belongsTo(savingAccount, {
        foreignKey: 'Account'
    })
    arrearSA.belongsTo(category, {
        foreignKey: 'Category'
    })
    arrearSA.belongsTo(currency, {
        foreignKey: 'Currency', 
        as: 'CurrencyT'
    })
    arrearSA.belongsTo(productLine, {
        foreignKey: 'ProductLine'
    })
    arrearSA.belongsTo(customer, {
        foreignKey: 'JoinHolder'
    })
    arrearSA.belongsTo(relation, {
        foreignKey: 'RelationShip'
    })
    arrearSA.belongsTo(accountOfficer, {
        foreignKey: 'AccountOfficer'
    })
    arrearSA.belongsTo(savingTerm, {
        foreignKey: 'Term'
    })
    arrearSA.belongsTo(currency, {
        foreignKey: 'PaymentCurrency', 
        as: 'PaymentCurrencyT'
    })
    arrearSA.belongsTo(debitAccount, {
        foreignKey: 'DebitAccount'
    })

    // PERIODIC SAVING ACCOUNT
    periodicSA.belongsTo(savingAccount, {
        foreignKey: 'Account'
    })
    periodicSA.belongsTo(category, {
        foreignKey: 'Category'
    })
    periodicSA.belongsTo(currency, {
        foreignKey: 'Currency',
        as: 'CurrencyT'
    })
    periodicSA.belongsTo(productLine, {
        foreignKey: 'ProductLine'
    })
    periodicSA.belongsTo(customer, {
        foreignKey: 'JoinHolder'
    })
    periodicSA.belongsTo(relation, {
        foreignKey: 'RelationShip'
    })
    periodicSA.belongsTo(accountOfficer, {
        foreignKey: 'AccountOfficer'
    })
    periodicSA.belongsTo(savingTerm, {
        foreignKey: 'Term'
    })
    periodicSA.belongsTo(currency, {
        foreignKey: 'PaymentCurrency', 
        as: 'PaymentCurrencyT'
    })
    periodicSA.belongsTo(debitAccount, {
        foreignKey: 'DebitAccount'
    })

    // DISCOUNTED SAVING ACCOUNT
    discountedSA.belongsTo(savingAccount, {
        foreignKey: 'Account'
    })
    discountedSA.belongsTo(customer, {
        foreignKey: 'CustomerID'
    })
    discountedSA.belongsTo(currency, {
        foreignKey: 'PaymentCurrency', 
        as: 'PaymentCurrencyT'
    })
    discountedSA.belongsTo(currency, {
        foreignKey: 'Currency', 
        as: 'CurrencyT'
    })
    discountedSA.belongsTo(debitAccount, {
        foreignKey: 'DebitAccount'
    })
    discountedSA.belongsTo(customer, {
        foreignKey: 'JoinHolder'
    })
    discountedSA.belongsTo(productLine, {
        foreignKey: 'ProductLine'
    })
    discountedSA.belongsTo(savingTerm, {
        foreignKey: 'Term'
    })
    discountedSA.belongsTo(accountOfficer, {
        foreignKey: 'AccountOfficer'
    })
    discountedSA.belongsTo(creditAccount, {
        foreignKey: 'CreditAccount'
    })


    // FOREIGN EXCHANGE
    foreignExchange.belongsTo(currency, {
        foreignKey: 'DebitCurrencyID', 
        as: 'DebitCurrency'
    })
    foreignExchange.belongsTo(currency, {
        foreignKey: 'CurrencyPaidID', 
        as: 'CurrencyPaid'
    })
    foreignExchange.belongsTo(debitAccount, {
        foreignKey: 'DebitAccount'
    })
    foreignExchange.belongsTo(creditAccount, {
        foreignKey: 'CreditAccount'
    })
    foreignExchange.belongsTo(statusType, {
        foreignKey: 'Status'
    })

    //WITHDRAWAL
    withdrawalTrans.belongsTo(accountType, {
        foreignKey: 'AccountType'
    })
    withdrawalTrans.hasMany(deposit, {
        foreignKey: 'AccountType'
    })
    withdrawalTrans.belongsTo(currency, {
        foreignKey: 'Currency',
        as: 'Currencyt'
    })
    withdrawalTrans.belongsTo(currency, {
        foreignKey: 'CurrencyPaid',
        as: 'CurrencyPaidt'
    })
    withdrawalTrans.belongsTo(statusType, {
        foreignKey: 'Status'
    })
}


module.exports = association
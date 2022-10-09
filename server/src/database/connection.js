const sequelize = require('./sequelize')
const userModel = require('../models/user')
const chargeCategoryModel = require('../models/storage/chargeCategory')
const chargeCollectionModel = require('../models/chargeCollection/chargeCollection')
const chargeCollectionTypeModel = require('../models/chargeCollection/chargeCollectionType')
const ChargeCollectionfrAccountModel = require('../models/chargeCollection/chargeCollectionfrAccount')
const ChargeCollectionfrCashModel = require('../models/chargeCollection/chargeCollectionfrCash')
const association = require('../models/association')

const database = {
    connection: {
        isConnected: async () => {
            await sequelize.authenticate()
            .then(()=>{
                console.log('Connection has been established successfully!')
            })
            .catch((error) => {
                console.error('Unable to connect to the database:', error)
            })
        },
        
        migrate: async () => {
            association()
            await sequelize.sync({force: false})
            .then(()=>{
                console.log('Migrated')
            })
            .catch(error=>{
                console.log(error)
            })
        }
    }


    
}

module.exports = database
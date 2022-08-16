const sequelize = require('./sequelize')
const userModel = require('../models/user')
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
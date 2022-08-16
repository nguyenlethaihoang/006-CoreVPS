const currencyModel = require('../../models/storage/currency')

const currencyController = {
    getAll: async (req, res, next) => {
        await currencyModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = currencyController
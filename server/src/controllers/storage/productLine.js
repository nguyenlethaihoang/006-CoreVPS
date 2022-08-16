const productLineModel = require('../../models/storage/productLine')

const productLineController = {
    getAll: async (req, res, next) => {
        await productLineModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = productLineController
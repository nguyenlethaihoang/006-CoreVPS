const chargeCodeModel = require('../../models/storage/chargeCode')

const chargeCodeController = {
    getAll: async (req, res, next) => {
        await chargeCodeModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = chargeCodeController
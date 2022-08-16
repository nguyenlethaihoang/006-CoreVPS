const cityProvinceModel = require('../../models/storage/cityProvince')

const cityProvinceController = {
    getAll: async (req, res, next) => {
        await cityProvinceModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = cityProvinceController
const chargeCategoryModel = require('../../models/storage/chargeCategory')
const chargeTypeModel = require('../../models/chargeCollection/chargeCollectionType')

const chargeCategoryController = {
    getAll: async (req, res, next) => {
        await chargeCategoryModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    },

    getAllChargeType: async (req, res, next) => {
        await chargeTypeModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = chargeCategoryController
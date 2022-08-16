const countryModel = require('../../models/storage/country')

const countryController = {
    getAll: async (req, res, next) => {
        await countryModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = countryController
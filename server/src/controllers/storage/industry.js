const industryModel = require('../../models/storage/industry')

const industryController = {
    getAll: async (req, res, next) => {
        await industryModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = industryController
const doctypeModel = require('../../models/storage/doctype')

const doctypeController = {
    getAll: async (req, res, next) => {
        await doctypeModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = doctypeController
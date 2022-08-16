const sectorModel = require('../../models/storage/sector')

const sectorController = {
    getAll: async (req, res, next) => {
        await sectorModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = sectorController
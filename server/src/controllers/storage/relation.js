const relationModel = require('../../models/storage/relation')

const relationController = {
    getAll: async (req, res, next) => {
        await relationModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = relationController
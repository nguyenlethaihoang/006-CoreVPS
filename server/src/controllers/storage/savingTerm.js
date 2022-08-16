const savingTermModel = require('../../models/account/savingTerm')

const savingTermController = {
    getAll: async (req, res, next) => {
        await savingTermModel.findAndCountAll()
        .then(result => {
            return res.status(200).json(result)
        })
        .catch(err => {
            return res.status(400).json(err)
        })
    }
}

module.exports = savingTermController
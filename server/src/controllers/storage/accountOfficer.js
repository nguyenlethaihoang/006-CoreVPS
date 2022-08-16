const accountOfficerModel = require('../../models/storage/accountOfficer')

const accountOfficerController = {
    getAll: async (req, res, next) => {
        await accountOfficerModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = accountOfficerController
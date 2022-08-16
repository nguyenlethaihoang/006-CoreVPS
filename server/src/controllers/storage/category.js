const categoryModel = require('../../models/storage/category')

const categoryController = {
    getAll: async (req, res, next) => {
        await categoryModel.findAndCountAll()
        .then((result)=>{
            return res.status(200).json(result)
        })
        .catch(error => {
            return res.status(400).json(error)
        })
    }
}

module.exports = categoryController
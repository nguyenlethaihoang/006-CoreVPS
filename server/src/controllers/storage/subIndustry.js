const industry = require('../../models/storage/industry')
const subIndustryModel = require('../../models/storage/subIndustry')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')

const subIndustryController = {
    getAll: asyncHandler( async (req, res, next) => {
        const {count, rows} = await subIndustryModel.findAndCountAll()

        return res.status(200).json({
            message: "get all subIndustry",
            data: {
                quantity: count, 
                subIndustry: rows
            }
        })
    }),
    
    getByIndustry: asyncHandler(async (req, res, next) => {
        const industryIDReq = req.params.industryid
        const subIndustryDB = await subIndustryModel.findAll({
            where: {Industry: industryIDReq}
        })

        return res.status(200).json({
            message: "subIndustry",
            data: subIndustryDB
        })
    })
}

module.exports = subIndustryController
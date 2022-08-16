const industry = require('../../models/storage/industry')
const subIndustry = require('../../models/storage/subindustry')
const asyncHandler = require('../../utils/async')
const appError = require('../../utils/appError')

const subIndustryController = {
    getAll: asyncHandler( async (req, res, next) => {
        const {count, rows} = await subIndustry.findAndCountAll()

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
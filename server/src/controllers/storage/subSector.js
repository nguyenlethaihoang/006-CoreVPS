const subSectorModel = require('../../models/storage/subSector')
const sectorModel = require('../../models/storage/sector')
const asyncHandler = require('../../utils/async')

const subSectorController = {
    getAll: asyncHandler( async (req, res, next) => {
        const {count, rows} = await subSectorModel.findAndCountAll()
        return res.status(200).json({
            message: "get sub sector",
            data: {
                quantity: count,
                subsector: rows
            }
        })
    }),
    getBySector: asyncHandler( async(req, res, next) => {
        const sectorIDReq = req.params.sectorid
        const sectorDB = subSectorModel.findAll({
            where: {Sector: sectorIDReq},
            include: [sectorModel]
        })

        return res.status(200).json({
            message: "sub sector",
            data: sectorDB
        })
    })
}

module.exports = subSectorController
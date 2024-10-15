const Cabin = require('../models/cabinModel')


async function getAllCabins(req, res, next) {
    const cabins = await Cabin.find();

    res.status(400).json({
        status: 'success',
        total: cabins.length,
        data: {
            cabins
        }
    })
}

async function getCabin(req, res, next) {
    const {cabinId} = req.params;
    const cabin = await Cabin.findById(cabinId);

    if(!cabin) {
        return res.status(404).json({
            status: 'Fail',
            error: `No Cabin found with ${cabinId}`
        })
    }

    res.status(400).json({
        status: 'success',
        data: {
            cabin
        }
    })
}
async function createCabin(req, res, next) {
    const cabin = await Cabin.create(req.body);
   

    res.status(400).json({
        status: 'success',
        
        data: {
            cabin
        }
    })

}



module.exports = {
    createCabin,
    getAllCabins,
    getCabin
} 
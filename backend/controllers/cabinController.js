const Cabin = require('../models/cabins')

const createCabin = async (req, res) => {
    try{
        const newCabin = await Cabin.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newCabin
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })

    }
}

// get all cabins
const getCabins = async (req, res) => {
    try{
        const cabins = await Cabin.find();
        console.log(cabins)

        res.status(200).json({
            status: 'success',
            total: cabins.length,
            data: cabins
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,

        })
    }
}

const getCabin = async (req, res) => {
    try{
        console.log(req.params)
        const {cabin_id} = req.params;
        const cabin = await Cabin.findById(cabin_id);

        if(!cabin) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cabin not found'
            })
        }

        res.status(200).json({
            status: 'success',
            data: cabin
        })

    }catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}


const updateCabin = async (req, res) => {
        try{
            const {cabin_id} = req.params;
            const updatedCabin = await Cabin.findByIdAndUpdate(cabin_id, req.body, {
                new: true,
                runValidators: true
            })

            if(!updatedCabin){
                return res.status(404).json({
                    status: 'fail',
                    message: 'Cabin not found'
                })
            }

            res.status(200).json({
                status: 'success',
                data: updatedCabin
            })

        }catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message
            })

        }
}

const deleteCabin = async (req, res) => {
    try{
        const {cabin_id} = req.params;
        const cabin = await Cabin.findByIdAndDelete(cabin_id);

        if(!cabin) {
            return res.status(404).json({
                status: 'fail',
                message: 'Cabin not found'
            })
        }

        res.status(204).json({
            status: 'success',
            data: null,
        })
    }catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }

}



module.exports = {createCabin, getCabins, getCabin, updateCabin, deleteCabin}
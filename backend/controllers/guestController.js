const Guest = require('../models/guests')

const createGuest = async (req, res) => {
    try{
        const newGuest = await Guest.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newGuest
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })

    }
}

// get all cabins
const getGuests = async (req, res) => {
    try{
        const guests = await Guest.find();

        res.status(200).json({
            status: 'success',
            total: guests.length,
            data: guests
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,

        })
    }
}

const getGuest = async (req, res) => {
    try{
        const {guest_id} = req.params;
        const guest = await Guest.findById(guest_id);

        if(!guest) {
            return res.status(404).json({
                status: 'fail',
                message: 'guest not found'
            })
        }

        res.status(200).json({
            status: 'success',
            data: guest
        })

    }catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}


const updateGuest = async (req, res) => {
        try{
            const {guest_id} = req.params;
            const updatedGuest = await Guest.findByIdAndUpdate(guest_id, req.body, {
                new: true,
                runValidators: true
            })

            if(!updatedGuest){
                return res.status(404).json({
                    status: 'fail',
                    message: 'Cabin not found'
                })
            }

            res.status(200).json({
                status: 'success',
                data: updatedGuest
            })

        }catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message
            })

        }
}

const deleteGuest = async (req, res) => {
    try{
        const {guest_id} = req.params;
        const guest = await Guest.findByIdAndDelete(guest_id);

        if(!guest) {
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



module.exports = {createGuest, getGuests, getGuest, updateGuest, deleteGuest}
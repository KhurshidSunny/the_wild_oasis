const Booking = require('../models/bookings')

const createBooking = async (req, res) => {
    try{
        const newBooking = await Booking.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newBooking
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })

    }
}

// get all cabins
const getBookings = async (req, res) => {
    try{
        const bookings = await Booking.find();
        console.log(bookings) // just for testing github actions

        res.status(200).json({
            status: 'success',
            total: bookings.length,
            data: bookings
        })

    }catch(err) {
        res.status(400).json({
            status: 'fail',
            message: err.message,

        })
    }
}

const getBooking = async (req, res) => {
    try{
        const {booking_id} = req.params;
        const booking = await Booking.findById(booking_id);

        if(!booking) {
            return res.status(404).json({
                status: 'fail',
                message: 'Booking not found'
            })
        }

        res.status(200).json({
            status: 'success',
            data: booking
        })

    }catch(err) {
        res.status(500).json({
            status: 'fail',
            message: err.message
        })
    }
}


const updateBooking = async (req, res) => {
        try{
            const {booking_id} = req.params;
            const updatedBooking = await Booking.findByIdAndUpdate(booking_id, req.body, {
                new: true,
                runValidators: true
            })

            if(!updatedBooking){
                return res.status(404).json({
                    status: 'fail',
                    message: 'Booking not found'
                })
            }

            res.status(200).json({
                status: 'success',
                data: updatedBooking
            })

        }catch(err) {
            res.status(400).json({
                status: 'fail',
                message: err.message
            })

        }
}

const deleteBooking = async (req, res) => {
    try{
        const {booking_id} = req.params;
        const booking = await Booking.findByIdAndDelete(booking_id);

        if(!booking) {
            return res.status(404).json({
                status: 'fail',
                message: 'Booking not found'
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



module.exports = {createBooking, getBookings, getBooking, updateBooking, deleteBooking}
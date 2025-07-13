const Booking = require('../models/bookings')
const AppError = require('../utils/appError')
const catchAsync = require("../utils/catchAsync")

const createBooking = catchAsync(async (req, res) => {
  
        const newBooking = await Booking.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newBooking
        })
})

// get all cabins
const getBookings = catchAsync(async (req, res) => {

        const bookings = await Booking.find();

        res.status(200).json({
            status: 'success',
            total: bookings.length,
            data: bookings
        })
})

const getBooking = catchAsync(async (req, res) => {

        const {booking_id} = req.params;
        const booking = await Booking.findById(booking_id);

         if(!booking){
                return next(new AppError('Booking not found', 404))
            }

        res.status(200).json({
            status: 'success',
            data: booking
        })
})


const updateBooking = catchAsync(async (req, res) => {

            const {booking_id} = req.params;
            const updatedBooking = await Booking.findByIdAndUpdate(booking_id, req.body, {
                new: true,
                runValidators: true
            })

             if(!updatedBooking){
                return next(new AppError('Booking not found', 404))
            }

            res.status(200).json({
                status: 'success',
                data: updatedBooking
            })
})

const deleteBooking = catchAsync(async (req, res) => {
        const {booking_id} = req.params;
        const booking = await Booking.findByIdAndDelete(booking_id);

        if(!booking){
            return next(new AppError('Booking not found', 404))
        }

        res.status(204).json({
            status: 'success',
            data: null,
        })
})



module.exports = {createBooking, getBookings, getBooking, updateBooking, deleteBooking}
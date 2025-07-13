const Guest = require('../models/guests')
const AppError = require('../utils/appError')
const catchAsync = require('../utils/catchAsync')

const createGuest = catchAsync(async (req, res) => {
        const newGuest = await Guest.create(req.body)

        res.status(201).json({
            status: 'success',
            data: newGuest
        })
})

// get all cabins
const getGuests = catchAsync(async (req, res) => {
        const guests = await Guest.find();

        res.status(200).json({
            status: 'success',
            total: guests.length,
            data: guests
        })
})

const getGuest = catchAsync(async (req, res) => {
        const {guest_id} = req.params;
        const guest = await Guest.findById(guest_id);

         if(!guest){
                return next(new AppError('Guest not found', 404))
            }

        res.status(200).json({
            status: 'success',
            data: guest
        })
})


const updateGuest =catchAsync(async (req, res) => {
            const {guest_id} = req.params;
            const updatedGuest = await Guest.findByIdAndUpdate(guest_id, req.body, {
                new: true,
                runValidators: true
            })

            if(!updateGuest){
                return next(new AppError('Guest not found', 404))
            }

            res.status(200).json({
                status: 'success',
                data: updatedGuest
            })
})

const deleteGuest =catchAsync(async (req, res) => {
        const {guest_id} = req.params;
        const guest = await Guest.findByIdAndDelete(guest_id);

        if(!guest){
                return next(new AppError('Guest not found', 404))
            }

        res.status(204).json({
            status: 'success',
            data: null,
        })
})



module.exports = {createGuest, getGuests, getGuest, updateGuest, deleteGuest}
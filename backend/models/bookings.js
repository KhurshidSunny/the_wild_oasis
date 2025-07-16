const mongoose = require('mongoose')

const bookingsSchema = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false,
    },
    startDate: Date,
    endDate: Date,
    numNights: Number,
    numGuests: Number,
    cabinPrice:{
        type: Number,
        min: 1,
    },
    extrasprice: Number,
    status: {
        type: String,
        enum: {
            values: ['checked-in', 'checked-out', 'unconfirmed'],
            message: "status must be either checked-in, checked-out or unconfirmed"
        }
    },
    hasBreakfast: Boolean,
    isPaid: Boolean,
    observations: String,

    cabin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cabin',
        required: true,
    },
    guest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guest', 
        required: true
    }

}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


// virtual property
bookingsSchema.virtual('totalPrice').get(function() {
    return this.cabinPrice * this.extrasprice;
})


// middleware for populating the cabin and guest from booking table
bookingsSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'cabin',
        select: '-__v'
    }).populate({
        path: 'guest',
        select: "-__v"
    })
    next()
})

const Booking = mongoose.model('Booking', bookingsSchema)

module.exports = Booking;
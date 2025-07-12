const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
    minBookingLength: Number,
    maxBookingLength: Number,
    maxGuestsPerBooking: Number,
    breakfastPrice: Number,
})

const Setting = mongoose.model('Setting', settingSchema)

module.exports = Setting; 
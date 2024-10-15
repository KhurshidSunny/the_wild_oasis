const mongoose = require('mongoose');

const cabinSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: [true, 'Cabin name should be different'],
        required: [true, 'The booking must have name'],
        max: [40, 'The name not be longer than 40 characters'],
        min: [8, 'The name not be less than 8 characters'],
    },
    description: {
        type: String,
    },
    maxCapacity: {
        type: Number,
        default: 1,
        max: [15, 'the max capacity should not be more than 15']
    },
    regularPrice: {
        type: Number,
        required: [true, 'The booking must have price'],
    },
    discount: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default:  Date.now()
    }
})

const Cabin = mongoose.model('Cabin', cabinSchema);

module.exports = Cabin; 
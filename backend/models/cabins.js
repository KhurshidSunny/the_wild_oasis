const mongoose = require('mongoose')

const cabinSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'cabin name is required'],
        unique: true,
        trim: true,
    },
    maxCapacity: {
        type: Number,
        min: [1, 'max capacity must be atleast 1']
    },
    regularPrice: {
        type: Number,
        min: [1, 'regular price me not be zero']
    },
    discount: {
        type: Number,
        validate: {
            validator: function (val) {
                return val < this.regularPrice
            },
            message: 'Discount value ({VALUE}) must be below the regular price'
        }
    },
    discription: String,
    image: String,
    createdAt: Date,
})


const Cabin = mongoose.model('Cabin', cabinSchema)

module.exports = Cabin;
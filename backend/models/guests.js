const mongoose = require('mongoose')
const validator = require('validator')

const guestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'guest name is required'],
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        validate: [validator.isEmail, 'The email must be correct']
    },
    nationalID: String,
    nationality: String,
    countryFlag: String,
    createAt: Date
})

const Guest = mongoose.model('Guest', guestSchema)

module.exports = Guest;
const mongoose = require('mongoose')
const validator  = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    photo: String,
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minLength: 8,
        select: false
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please confirm your password'],
        validate: {
            validator: function (val) {
                return val === this.password
            },
            message: 'Passwords are not the same'
        } 
    },
    passwordChangedAt: Date
})


// HASH the password
userSchema.pre('save', async function(next) {
    // if the password is modified
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);

    // delete passwordConfirm field
    this.passwordConfirm = undefined;

    next()
})

// compare passwords
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword)
}

// check if the password was changed
userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    const changedTimestamp = parseInt(this.passwordChangedAt/1000, 10) // convert to seconds
    if(this.passwordChangedAt) {
        return JWTTimestamp < changedTimestamp
    }

    // default false: means password not changed
    return false;
}


const User = mongoose.model('User', userSchema)

module.exports = User;
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "A user must have name"],
    minlength: [8, "name must be at least 8 characters long"],
    maxlength: [40, "name must not be more than 40 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "user must have email"],
    validate: [validator.isEmail, "Please provide valid email"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User account must have the password"],
    minlength: [8, "the password must have at least 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "User must confirm the password"],
    validate: {
      // This works only on CREATE and SAVE (not for UPDATE)
      validator: function (val) {
        return this.password === val;
      },
      message: "passwords are not same",
    },
  },
});

// for password encryption
userSchema.pre("save", async function (next) {
  if (this.password.isModified("password")) return next();
  // Encrypt the password
  this.password = await bcrypt.hash(this.password, 12);

  // not storing the passwordConfirm in DB
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

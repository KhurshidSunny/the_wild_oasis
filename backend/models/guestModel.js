const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Guest must have a name"],
    max: [40, "the Guest name must be at least 8 characters"],
    min: [8, "the guest name must be at most 40 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    required: [true, "A Guest must have an email"],
  },
  nationalID: {
    type: String,
  },
  nationality: {
    type: String,
    required: [true, "Guest must enter their nationality"],
  },
  countryFlag: {
    type: String,
  },
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;

const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  minBookingLength: {
    type: Number,
  },
  maxBookingLength: {
    type: Number,
  },
  maxGuestsPerBooking: {
    type: Number,
  },
  breakFastPrice: {
    type: Number,
  },
});

const Setting = mongoose.model("Setting", settingSchema);

module.exports = Setting;

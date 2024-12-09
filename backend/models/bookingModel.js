const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  created_at: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  cabinId: {
    type: mongoose.Schema.ObjectId,
    ref: "Cabin",
    required: [true, "booking must have a cabin"],
  },
  guestId: {
    type: mongoose.Schema.ObjectId,
    ref: "Guest",
    required: [true, "Booking must have guest"],
  },
  settingId: {
    type: mongoose.Schema.ObjectId,
    ref: "Setting",
  },
  numNights: {
    type: Number,
  },
  status: {
    type: String,
    default: "unconfirmed",
    enum: ["unconfirmed", "checked-out", "checked-in"],
  },
  hasBreakfast: {
    type: Boolean,
    default: false,
  },
  observation: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  numGuests: {
    type: Number,
    default: 1,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;

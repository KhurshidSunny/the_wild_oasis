const Booking = require("../models/bookingModel");
const APIFeatures = require("../utils/apiFeatures");
const catchAsync = require("../utils/catchAsync");

const getAllBookings = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Booking.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const bookings = await features.query;

  res.status(200).json({
    status: "success",
    total: bookings.length,
    data: {
      bookings,
    },
  });
});

const createBooking = catchAsync(async (req, res, next) => {
  const booking = await Booking.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      booking,
    },
  });
});

module.exports = {
  getAllBookings,
  createBooking,
};

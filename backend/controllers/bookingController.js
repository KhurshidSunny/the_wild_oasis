const Booking = require("../models/bookings");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

// Default page size
const PAGE_SIZE = 10;

const getBookingsAfterDate = catchAsync(async (req, res) => {
  const { date } = req.query;
  const bookings = await Booking.find({
    createdAt: { $gte: new Date(date) },
  });

  res.status(200).json({
    status: "success",
    results: bookings.length,
    date: { bookings },
  });
});

const getStaysTodayActivity = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const bookings = await Booking.find({
      startDate: { $gte: today, $lt: tomorrow },
    });

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: { stays: bookings },
    });
  } catch (err) {
    next(err);
  }
};

// e.g., /api/v1/bookings/getStaysAfterDate?date=2024-07-01
const getStaysAfterDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    const bookings = await Booking.find({
      startDate: { $gte: new Date(date) },
    });

    res.status(200).json({
      status: "success",
      results: bookings.length,
      data: { stays: bookings },
    });
  } catch (err) {
    next(err);
  }
};

const createBooking = catchAsync(async (req, res) => {
  const newBooking = await Booking.create(req.body);

  res.status(201).json({
    status: "success",
    data: newBooking,
  });
});

const getBookings = catchAsync(async (req, res, next) => {
  const { status, sortBy = "startDate", page = 1 } = req.query;

  const filter = {};
  if (status) filter.status = status;

  const sort = {};
  if (sortBy === "startDate" || sortBy === "endDate") {
    sort[sortBy] = -1;
  }

  const skip = (page - 1) * PAGE_SIZE;

  const bookings = await Booking.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(PAGE_SIZE);

  const total = await Booking.countDocuments(filter);

  res.status(200).json({
    status: "success",
    total,
    results: bookings.length,
    data: bookings,
  });
});

const getBooking = catchAsync(async (req, res, next) => {
  const { booking_id } = req.params;
  const booking = await Booking.findById(booking_id);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: booking,
  });
});

const updateBooking = catchAsync(async (req, res, next) => {
  const { booking_id } = req.params;
  const updatedBooking = await Booking.findByIdAndUpdate(booking_id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedBooking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedBooking,
  });
});

const deleteBooking = catchAsync(async (req, res, next) => {
  const { booking_id } = req.params;
  const booking = await Booking.findByIdAndDelete(booking_id);

  if (!booking) {
    return next(new AppError("Booking not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const getBookingsForGuest = catchAsync(async (req, res, next) => {
  const { guest_id } = req.params;

  const bookings = await Booking.find({ guest: guest_id });

  if (bookings.length === 0) {
    return next(new AppError("No bookings found for this guest", 404));
  }

  res.status(200).json({
    status: "success",
    results: bookings.length,
    data: bookings,
  });
});

module.exports = {
  createBooking,
  getBookings,
  getBooking,
  updateBooking,
  deleteBooking,
  getBookingsAfterDate,
  getStaysTodayActivity,
  getStaysAfterDate,
  getBookingsForGuest,
};

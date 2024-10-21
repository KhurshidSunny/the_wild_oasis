const Guest = require("../models/guestModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const getAllGuests = catchAsync(async (req, res, next) => {
  const guests = await Guest.find();

  res.status(200).json({
    status: "success",
    total: guests.length,
    data: {
      guests,
    },
  });
});

const getGuest = catchAsync(async (req, res, next) => {
  const { guestId } = req.params;
  const guest = await Guest.findById(guestId);

  if (!guest) {
    return next(new AppError(`There is no Guest with this ${guestId} Id`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      guest,
    },
  });
});

const createGuest = catchAsync(async (req, res, next) => {
  const guest = await Guest.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      guest,
    },
  });
});

const updateGuest = catchAsync(async (req, res, next) => {
  const { guestId } = req.params;
  const guest = await Guest.findByIdAndUpdate(guestId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!guest) {
    return next(new AppError(`There is no Guest with this ${guestId} Id`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      guest,
    },
  });
});

const deleteGuest = catchAsync(async (req, res, next) => {
  const { guestId } = req.params;
  const guest = await Guest.findByIdAndDelete(guestId);

  if (!guest) {
    return next(new AppError(`There is no Guest with this ${guestId} Id`, 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  createGuest,
  getAllGuests,
  getGuest,
  updateGuest,
  deleteGuest,
};

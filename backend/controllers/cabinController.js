const Cabin = require("../models/cabinModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");

const getAllCabins = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Cabin.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const cabins = await features.query;
  res.status(200).json({
    status: "success",
    total: cabins.length,
    data: {
      cabins,
    },
  });
});

const getCabin = catchAsync(async (req, res, next) => {
  const { cabinId } = req.params;
  const cabin = await Cabin.findById(cabinId);

  if (!cabin) {
    return next(new AppError(`No tour found with this ${cabinId} Id`, 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
});
const createCabin = catchAsync(async (req, res, next) => {
  const cabin = await Cabin.create(req.body);

  res.status(200).json({
    status: "success",

    data: {
      cabin,
    },
  });
});

const updateCabin = catchAsync(async (req, res, next) => {
  const cabin = await Cabin.findByIdAndUpdate(req.params.cabinId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!cabin) {
    return next(
      new AppError(`No tour found with this ${req.params.cabinId} Id`, 404)
    );
  }

  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
});

const deleteCabin = catchAsync(async (req, res, next) => {
  const { cabinId } = req.params;
  const cabin = await Cabin.findByIdAndDelete(cabinId);

  if (!cabin) {
    return next(new AppError(`No tour found with this ${cabinId} Id`, 404));
  }

  res.status(204).json({
    status: "success",
  });
});

module.exports = {
  createCabin,
  getAllCabins,
  getCabin,
  updateCabin,
  deleteCabin,
};

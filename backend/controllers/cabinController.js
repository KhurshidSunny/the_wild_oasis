const Cabin = require("../models/cabinModel");
const catchAsync = require("../utils/catchAsync");

const getAllCabins = catchAsync(async (req, res, next) => {
  const cabins = await Cabin.find();

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

  res.status(200).json({
    status: "success",
    data: {
      cabin,
    },
  });
});

const deleteCabin = catchAsync(async (req, res, next) => {
  const { cabinId } = req.params;
  await Cabin.findByIdAndDelete(cabinId);

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

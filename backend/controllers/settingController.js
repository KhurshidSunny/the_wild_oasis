const Setting = require("../models/settingModel");
const catchAsync = require("../utils/catchAsync");

const getAllSettings = catchAsync(async (req, res, next) => {
  const settings = await Setting.find();

  res.status(200).json({
    status: "success",
    total: settings.length,
    data: {
      settings,
    },
  });
});

const createSetting = catchAsync(async (req, res, next) => {
  const settings = await Setting.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      settings,
    },
  });
});

const updateSetting = catchAsync(async (req, res, next) => {
  const settings = await Setting.findByIdAndUpdate(
    req.params.settingId,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    total: settings.length,
    data: {
      settings,
    },
  });
});

module.exports = {
  getAllSettings,
  createSetting,
  updateSetting,
};

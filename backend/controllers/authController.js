const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
    secure: true,
    sameSite: "None",
  };

  // sending token via cookie
  res.cookie("jwt", token, cookieOptions);

  res.status(200).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

module.exports = {
  signup,
};

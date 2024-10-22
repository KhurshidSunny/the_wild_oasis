const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, res, statusCode) => {
  const token = signToken(user._id);
  console.log(token);

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

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

// signup
const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, res, 201);
});

// login
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if email and password exist
  if (!email || !password) {
    return next(new AppError(`Please enter email and password`, 400));
  }

  // 2. check if the user exist and the password is correct
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError(`Incorrect password or email`, 401));
  }

  // 3. send the jwt token to the client
  createSendToken(user, res, 200);
});

module.exports = {
  signup,
  login,
};

const express = require("express");
const cabinRouter = require("./routes/cabinRoutes");
const guestRouter = require("./routes/guestRoutes");
const settingRouter = require("./routes/settingRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

// ROUTES
app.use("/api/v1/cabins", cabinRouter);
app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/settings", settingRouter);
app.use("/api/v1/users", userRouter);

// unhnadled routes error middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error
app.use(globalErrorHandler);

module.exports = app;

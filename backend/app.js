const express = require("express");
const cabinRouter = require("./routes/cabinRoutes");
const guestRouter = require("./routes/guestRoutes");
const settingRouter = require("./routes/settingRoutes");
const bookingRouter = require("./routes/bookingRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const cors = require("cors");
const path = require("path");

const app = express();

// Enable cors for all routes
app.use(cors());

app.use(express.json());

// serve static files
app.use("/api/v1/images", express.static(path.join(__dirname, "data")));
// app.use("/api/v1/images", express.static(path.join(__dirname, "data")));

// ROUTES
app.use("/api/v1/cabins", cabinRouter);
app.use("/api/v1/guests", guestRouter);
app.use("/api/v1/settings", settingRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bookings", bookingRouter);

// unhnadled routes error middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error
app.use(globalErrorHandler);

module.exports = app;

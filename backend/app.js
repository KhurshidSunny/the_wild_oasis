const express = require("express");
const cabinRouter = require("./routes/cabinRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use("/api/v1/cabins", cabinRouter);

// unhnadled routes error middleware
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// Global Error
app.use(globalErrorHandler);

module.exports = app;

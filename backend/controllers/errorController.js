const AppError = require("../utils/appError");

function handleCastErrorDB(err) {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 404);
}

function sendErrorDev(err, res) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
}

function sendErrorProd(err, res) {
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }

  // programming or other unknown error: don't leak error details
  else {
    // log the error
    console.log("ERROR ", err);

    // send generic message
    res.status(500).json({
      status: "fail",
      message: `Something went wrong`,
    });
  }
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";
  err.message = err.message;

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // copy of the err object
    let error = JSON.parse(JSON.stringify(err));

    if (error.name === "CastError") error = handleCastErrorDB(error);
    sendErrorProd(error, res);
  }
};

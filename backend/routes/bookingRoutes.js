const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

router
  .route("/")
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

module.exports = router;

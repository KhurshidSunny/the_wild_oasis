const express = require("express");
const bookingController = require("../controllers/bookingController");

const router = express.Router();

// ✅ Move more specific routes first
router.get("/guest/:guest_id", bookingController.getBookingsForGuest);
router.get("/getBookingsAfterDate", bookingController.getBookingsAfterDate);
router.get("/getStaysTodayActivity", bookingController.getStaysTodayActivity);
router.get("/getStaysAfterDate", bookingController.getStaysAfterDate);

router
  .route("/:booking_id")
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

router
  .route("/")
  .get(bookingController.getBookings)
  .post(bookingController.createBooking);

module.exports = router;

const express = require('express')
const bookingController = require('../controllers/bookingController')

const router = express.Router();
router.get('/getBookingsAfterDate', bookingController.getBookingsAfterDate)
router.get('/getStaysTodayActivity', bookingController.getStaysTodayActivity);
router.get('/getStaysAfterDate', bookingController.getStaysAfterDate);


router.route('/').get(bookingController.getBookings).post(bookingController.createBooking)
router.route('/:booking_id').get(bookingController.getBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking)


module.exports = router
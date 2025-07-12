const express = require('express')
const bookingController = require('../controllers/bookingController')

const router = express.Router();

router.route('/').get(bookingController.getBookings).post(bookingController.createBooking)
router.route('/:booking_id').get(bookingController.getBooking).patch(bookingController.updateBooking).delete(bookingController.deleteBooking)


module.exports = router
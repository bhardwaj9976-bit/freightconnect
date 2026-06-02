const express = require('express');
const { createBooking, getAvailableTrucks, acceptBooking, getBookingDetails, uploadProofOfDelivery, getUserBookings, cancelBooking, rateBooking } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

const router = express.Router();

// Create booking
router.post('/create', auth, createBooking);

// Get available trucks
router.get('/trucks', auth, getAvailableTrucks);

// Get user bookings
router.get('/my-bookings', auth, getUserBookings);

// Get booking details
router.get('/:bookingId', auth, getBookingDetails);

// Accept booking (driver)
router.post('/:bookingId/accept', auth, acceptBooking);

// Cancel booking
router.post('/:bookingId/cancel', auth, cancelBooking);

// Upload proof of delivery
router.post('/:bookingId/proof-of-delivery', auth, uploadProofOfDelivery);

// Rate booking
router.post('/:bookingId/rate', auth, rateBooking);

module.exports = router;

const express = require('express');
const { initiatePayment, verifyPayment, getPaymentHistory, refundPayment, getPaymentDetails } = require('../controllers/paymentController');
const auth = require('../middleware/auth');

const router = express.Router();

// Initiate payment
router.post('/initiate', auth, initiatePayment);

// Verify payment
router.post('/verify', auth, verifyPayment);

// Get payment history
router.get('/history', auth, getPaymentHistory);

// Get payment details
router.get('/:transactionId', auth, getPaymentDetails);

// Refund payment
router.post('/refund', auth, refundPayment);

module.exports = router;

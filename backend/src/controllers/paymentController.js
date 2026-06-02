const Payment = require('../models/Payment');
const Booking = require('../models/Booking');
const { v4: uuidv4 } = require('uuid');

// Initiate Payment
exports.initiatePayment = async (req, res) => {
  try {
    const { bookingId, amount, paymentMethod } = req.body;

    if (!bookingId || !amount || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    const transactionId = 'TXN' + Date.now();

    // Create payment record
    const payment = new Payment({
      transactionId,
      bookingId,
      userId: req.userId,
      amount,
      paymentMethod,
      status: 'initiated'
    });

    await payment.save();

    // In production, call Razorpay API here
    res.status(201).json({
      success: true,
      message: 'Payment initiated',
      transactionId,
      payment
    });
  } catch (error) {
    console.error('Payment initiation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify Payment
exports.verifyPayment = async (req, res) => {
  try {
    const { transactionId, razorpayPaymentId, razorpaySignature } = req.body;

    if (!transactionId || !razorpayPaymentId) {
      return res.status(400).json({ success: false, message: 'Missing payment details' });
    }

    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    // Verify with Razorpay (mock implementation)
    payment.razorpayPaymentId = razorpayPaymentId;
    payment.razorpaySignature = razorpaySignature;
    payment.status = 'completed';

    await payment.save();

    // Update booking payment status
    await Booking.findByIdAndUpdate(payment.bookingId, {
      paymentStatus: 'completed'
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      payment
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Payment History
exports.getPaymentHistory = async (req, res) => {
  try {
    const { limit = 10, page = 1 } = req.query;

    const payments = await Payment.find({ userId: req.userId })
      .populate('bookingId', 'bookingId totalFare bookingStatus')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    const total = await Payment.countDocuments({ userId: req.userId });

    res.status(200).json({
      success: true,
      count: payments.length,
      total,
      page: parseInt(page),
      payments
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Refund Payment
exports.refundPayment = async (req, res) => {
  try {
    const { transactionId, reason } = req.body;

    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    if (payment.status !== 'completed') {
      return res.status(400).json({ success: false, message: 'Only completed payments can be refunded' });
    }

    const refundId = 'RFD' + Date.now();
    payment.refund = {
      refundAmount: payment.amount,
      refundId,
      refundStatus: 'initiated',
      refundDate: new Date(),
      refundReason: reason,
      refundInitiatedAt: new Date()
    };
    payment.status = 'refunded';

    await payment.save();

    res.status(200).json({
      success: true,
      message: 'Refund initiated',
      refundId,
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Payment Details
exports.getPaymentDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;

    const payment = await Payment.findOne({ transactionId })
      .populate('bookingId')
      .populate('userId', 'name email phone');

    if (!payment) {
      return res.status(404).json({ success: false, message: 'Payment not found' });
    }

    res.status(200).json({
      success: true,
      payment
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

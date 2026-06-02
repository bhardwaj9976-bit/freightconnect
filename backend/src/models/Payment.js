const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  transactionId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  bookingId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Booking', 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  currency: { 
    type: String, 
    default: 'INR' 
  },
  paymentMethod: { 
    type: String, 
    enum: ['card', 'upi', 'wallet', 'netbanking', 'cash'], 
    required: true 
  },
  paymentGateway: { 
    type: String, 
    enum: ['razorpay', 'stripe', 'paypal'], 
    default: 'razorpay' 
  },
  status: { 
    type: String, 
    enum: ['initiated', 'pending', 'completed', 'failed', 'refunded'], 
    default: 'initiated' 
  },
  razorpayPaymentId: String,
  razorpayOrderId: String,
  razorpaySignature: String,
  cardDetails: {
    last4: String,
    brand: String, // visa, mastercard, amex
    expiry: String,
    holderName: String
  },
  upiDetails: {
    upiId: String,
    vpa: String,
    bank: String
  },
  walletDetails: {
    walletProvider: String, // e.g., Paytm, GooglePay
    walletId: String,
    previousBalance: Number,
    newBalance: Number
  },
  refund: {
    refundAmount: Number,
    refundId: String,
    refundStatus: String,
    refundDate: Date,
    refundReason: String,
    refundInitiatedAt: Date
  },
  failureReason: String,
  failureCode: String,
  description: String,
  receiptUrl: String,
  invoiceUrl: String,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Indexes for faster queries
paymentSchema.index({ transactionId: 1 });
paymentSchema.index({ bookingId: 1 });
paymentSchema.index({ userId: 1 });
paymentSchema.index({ status: 1 });
paymentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Payment', paymentSchema);

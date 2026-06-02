const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingId: { 
    type: String, 
    unique: true, 
    required: true 
  },
  shipperId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  driverId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  truckId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Truck', 
    default: null 
  },
  pickupLocation: {
    address: String,
    lat: Number,
    lng: Number,
    placeName: String,
    contactPerson: String,
    contactPhone: String
  },
  dropoffLocation: {
    address: String,
    lat: Number,
    lng: Number,
    placeName: String,
    contactPerson: String,
    contactPhone: String
  },
  pickupDate: Date,
  expectedDeliveryDate: Date,
  actualDeliveryDate: Date,
  cargoDetails: {
    description: String,
    weight: Number, // in kg
    volume: Number, // in cubic meters
    category: { 
      type: String, 
      enum: ['general', 'fragile', 'hazardous', 'perishable'],
      default: 'general'
    },
    itemCount: Number,
    images: [String]
  },
  estimatedDistance: Number, // in km
  estimatedDuration: Number, // in hours
  baseFare: Number,
  tolls: { type: Number, default: 0 },
  taxes: { type: Number, default: 0 },
  discountCode: String,
  discountAmount: { type: Number, default: 0 },
  totalFare: Number,
  paymentMethod: { 
    type: String, 
    enum: ['card', 'upi', 'wallet', 'cash'], 
    required: true 
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded'], 
    default: 'pending' 
  },
  bookingStatus: {
    type: String,
    enum: ['requested', 'accepted', 'in_transit', 'delivered', 'cancelled'],
    default: 'requested'
  },
  proofOfDelivery: {
    receiverName: String,
    receiverPhone: String,
    photos: [String],
    signature: String,
    uploadedAt: Date
  },
  specialInstructions: String,
  cancelledBy: String, // 'shipper', 'driver', 'admin'
  cancellationReason: String,
  cancellationRefund: Number,
  driverRating: { type: Number, min: 1, max: 5 },
  driverReview: String,
  shipperRating: { type: Number, min: 1, max: 5 },
  shipperReview: String,
  invoiceUrl: String,
  ewayBillNumber: String,
  gstDetails: {
    gstNumber: String,
    invoiceNumber: String,
    invoiceDate: Date,
    hsnCode: String
  },
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
bookingSchema.index({ bookingId: 1 });
bookingSchema.index({ shipperId: 1 });
bookingSchema.index({ driverId: 1 });
bookingSchema.index({ bookingStatus: 1 });
bookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Booking', bookingSchema);

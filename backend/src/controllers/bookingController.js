const Booking = require('../models/Booking');
const Truck = require('../models/Truck');
const Payment = require('../models/Payment');
const { v4: uuidv4 } = require('uuid');

// Create Booking
exports.createBooking = async (req, res) => {
  try {
    const { pickupLocation, dropoffLocation, pickupDate, cargoDetails, paymentMethod, specialInstructions } = req.body;

    // Validate required fields
    if (!pickupLocation || !dropoffLocation || !pickupDate || !cargoDetails) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const bookingId = 'BK' + Date.now().toString().slice(-8);

    // Calculate distance (placeholder - integrate with Google Maps API)
    const distance = 100;

    // Calculate fare
    const baseFare = distance * 10; // Base rate per km
    const taxes = Math.round(baseFare * 0.18); // 18% GST
    const totalFare = baseFare + taxes;

    const booking = new Booking({
      bookingId,
      shipperId: req.userId,
      pickupLocation,
      dropoffLocation,
      pickupDate,
      cargoDetails,
      estimatedDistance: distance,
      baseFare,
      taxes,
      totalFare,
      paymentMethod,
      specialInstructions,
      bookingStatus: 'requested'
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Available Trucks
exports.getAvailableTrucks = async (req, res) => {
  try {
    const { capacity, vehicleType, limit = 20 } = req.query;

    const query = { isAvailable: true, isVerified: true };
    if (capacity) query.capacity = { $gte: parseInt(capacity) };
    if (vehicleType) query.vehicleType = vehicleType;

    const trucks = await Truck.find(query)
      .populate('ownerId', 'name phone email averageRating')
      .limit(parseInt(limit))
      .lean();

    res.status(200).json({
      success: true,
      count: trucks.length,
      trucks
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Accept Booking (Driver)
exports.acceptBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { truckId } = req.body;

    if (!truckId) {
      return res.status(400).json({ success: false, message: 'Truck ID is required' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.bookingStatus !== 'requested') {
      return res.status(400).json({ success: false, message: 'Booking cannot be accepted' });
    }

    // Verify truck belongs to driver
    const truck = await Truck.findById(truckId);
    if (!truck || truck.ownerId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Truck not found or unauthorized' });
    }

    booking.driverId = req.userId;
    booking.truckId = truckId;
    booking.bookingStatus = 'accepted';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking accepted successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get Booking Details
exports.getBookingDetails = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate('shipperId', 'name phone email profilePicture')
      .populate('driverId', 'name phone email averageRating')
      .populate('truckId', 'registrationNumber vehicleType capacity make model');

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Check authorization
    if (booking.shipperId._id.toString() !== req.userId && booking.driverId?._id.toString() !== req.userId) {
      // Only allow if user is admin
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Upload Proof of Delivery
exports.uploadProofOfDelivery = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { receiverName, receiverPhone, photos, signature } = req.body;

    if (!receiverName || !receiverPhone || !photos) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.driverId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: 'Only driver can upload proof' });
    }

    booking.proofOfDelivery = {
      receiverName,
      receiverPhone,
      photos,
      signature,
      uploadedAt: new Date()
    };
    booking.bookingStatus = 'delivered';
    booking.actualDeliveryDate = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Proof of delivery uploaded successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get User Bookings
exports.getUserBookings = async (req, res) => {
  try {
    const { status, limit = 10, page = 1 } = req.query;

    const query = {
      $or: [
        { shipperId: req.userId },
        { driverId: req.userId }
      ]
    };

    if (status) query.bookingStatus = status;

    const bookings = await Booking.find(query)
      .populate('shipperId', 'name phone email')
      .populate('driverId', 'name phone email')
      .populate('truckId', 'registrationNumber vehicleType')
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .lean();

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      page: parseInt(page),
      bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Cancel Booking
exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (['delivered', 'cancelled', 'in_transit'].includes(booking.bookingStatus)) {
      return res.status(400).json({ success: false, message: 'Booking cannot be cancelled' });
    }

    booking.bookingStatus = 'cancelled';
    booking.cancelledBy = booking.shipperId.toString() === req.userId ? 'shipper' : 'driver';
    booking.cancellationReason = reason;

    // Calculate refund
    if (booking.paymentStatus === 'completed') {
      booking.cancellationRefund = booking.totalFare * 0.9; // 90% refund
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Rate Booking
exports.rateBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { rating, review } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    if (booking.shipperId.toString() === req.userId) {
      booking.driverRating = rating;
      booking.driverReview = review;
    } else if (booking.driverId?.toString() === req.userId) {
      booking.shipperRating = rating;
      booking.shipperReview = review;
    } else {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Rating submitted successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  ownerId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  registrationNumber: { 
    type: String, 
    unique: true, 
    required: true,
    uppercase: true
  },
  vehicleType: {
    type: String,
    enum: ['hcv', 'lcv', 'temp', '2wheeler', '3wheeler'],
    required: true
  },
  truckName: String,
  make: String, // Manufacturer (e.g., Tata, Ashok Leyland)
  model: String,
  year: Number,
  capacity: { // in kg
    type: Number,
    required: true
  },
  volume: Number, // in cubic meters
  color: String,
  fuelType: { 
    type: String, 
    enum: ['diesel', 'petrol', 'cng'], 
    default: 'diesel' 
  },
  mileage: Number, // km/liter
  insuranceNumber: String,
  insuranceExpiry: Date,
  fitnessNumber: String,
  fitnessExpiry: Date,
  pollutionCertificate: String,
  pollutionExpiry: Date,
  documents: {
    rc: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    insurance: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    fitness: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    pollution: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    photos: [String]
  },
  isAvailable: { 
    type: Boolean, 
    default: true 
  },
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  averageRating: { 
    type: Number, 
    default: 5.0, 
    min: 1, 
    max: 5 
  },
  totalTrips: { 
    type: Number, 
    default: 0 
  },
  totalEarnings: { 
    type: Number, 
    default: 0 
  },
  currentLocation: {
    lat: Number,
    lng: Number,
    lastUpdated: Date,
    address: String
  },
  maintenanceSchedule: [{
    date: Date,
    description: String,
    cost: Number,
    completed: { type: Boolean, default: false }
  }],
  gpsDevice: {
    deviceId: String,
    imei: String,
    active: Boolean,
    provider: String // e.g., Samsara, Geotab
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

// Indexes
truckSchema.index({ registrationNumber: 1 });
truckSchema.index({ ownerId: 1 });
truckSchema.index({ isAvailable: 1 });
truckSchema.index({ isVerified: 1 });

module.exports = mongoose.model('Truck', truckSchema);

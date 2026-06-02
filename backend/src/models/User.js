const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true,
    trim: true
  },
  phone: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  role: { 
    type: String, 
    enum: ['shipper', 'driver', 'admin'], 
    required: true 
  },
  profilePicture: { 
    type: String, 
    default: null 
  },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  gstNumber: {
    type: String,
    sparse: true
  },
  companyName: String,
  isVerified: { 
    type: Boolean, 
    default: false 
  },
  verificationToken: String,
  licenseNumber: String, // For drivers
  licenseExpiry: Date, // For drivers
  vehicleCount: { 
    type: Number, 
    default: 0 
  }, // For drivers
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
  bankAccount: {
    accountHolderName: String,
    accountNumber: String,
    ifscCode: String,
    bankName: String
  },
  walletBalance: { 
    type: Number, 
    default: 0 
  },
  documentVerification: {
    aadhar: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    pan: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    license: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    },
    insurance: { 
      verified: Boolean, 
      documentUrl: String,
      verifiedAt: Date
    }
  },
  language: { 
    type: String, 
    default: 'en', 
    enum: ['en', 'hi', 'mr', 'ta', 'te'] 
  },
  emergencyContact: {
    name: String,
    phone: String,
    relation: String
  },
  fcmToken: String, // Firebase Cloud Messaging token
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: Date,
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Hide sensitive fields
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  delete user.verificationToken;
  delete user.bankAccount;
  return user;
};

module.exports = mongoose.model('User', userSchema);

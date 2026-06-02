const express = require('express');
const { register, login, getCurrentUser, logout, updatePassword } = require('../controllers/authController');
const { body } = require('express-validator');
const auth = require('../middleware/auth');

const router = express.Router();

// Register
router.post('/register', [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be 6+ characters'),
  body('role').isIn(['shipper', 'driver']).withMessage('Invalid role')
], register);

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required')
], login);

// Get Current User
router.get('/me', auth, getCurrentUser);

// Logout
router.post('/logout', auth, logout);

// Update Password
router.post('/update-password', auth, updatePassword);

module.exports = router;

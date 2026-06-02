const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/users', auth, (req, res) => {
  res.json({ success: true, message: 'Get all users' });
});

router.get('/bookings', auth, (req, res) => {
  res.json({ success: true, message: 'Get all bookings' });
});

router.get('/payments', auth, (req, res) => {
  res.json({ success: true, message: 'Get all payments' });
});

router.get('/analytics', auth, (req, res) => {
  res.json({ success: true, message: 'Get analytics dashboard' });
});

router.post('/verify-document/:userId', auth, (req, res) => {
  res.json({ success: true, message: 'Document verified' });
});

module.exports = router;

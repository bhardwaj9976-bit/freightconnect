const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

// Placeholder routes
router.get('/profile', auth, (req, res) => {
  res.json({ success: true, message: 'Get user profile' });
});

router.put('/profile', auth, (req, res) => {
  res.json({ success: true, message: 'Update profile' });
});

router.get('/trips', auth, (req, res) => {
  res.json({ success: true, message: 'Get user trips' });
});

router.get('/wallet', auth, (req, res) => {
  res.json({ success: true, message: 'Get wallet balance' });
});

module.exports = router;

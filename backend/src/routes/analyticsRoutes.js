const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', auth, (req, res) => {
  res.json({ success: true, message: 'Get analytics dashboard' });
});

router.get('/trips', auth, (req, res) => {
  res.json({ success: true, message: 'Get trip analytics' });
});

router.get('/revenue', auth, (req, res) => {
  res.json({ success: true, message: 'Get revenue analytics' });
});

router.get('/utilization', auth, (req, res) => {
  res.json({ success: true, message: 'Get truck utilization' });
});

module.exports = router;

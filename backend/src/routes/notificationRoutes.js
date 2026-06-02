const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  res.json({ success: true, message: 'Get notifications' });
});

router.post('/mark-read', auth, (req, res) => {
  res.json({ success: true, message: 'Mark notification as read' });
});

router.post('/mark-all-read', auth, (req, res) => {
  res.json({ success: true, message: 'Mark all notifications as read' });
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/messages/:userId', auth, (req, res) => {
  res.json({ success: true, message: 'Get messages' });
});

router.post('/send', auth, (req, res) => {
  res.json({ success: true, message: 'Message sent' });
});

router.get('/conversations', auth, (req, res) => {
  res.json({ success: true, message: 'Get conversations' });
});

module.exports = router;

const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/:bookingId', auth, (req, res) => {
  res.json({ success: true, message: 'Get tracking location' });
});

router.post('/update', auth, (req, res) => {
  res.json({ success: true, message: 'Update location' });
});

router.ws('/:bookingId', (ws, req) => {
  ws.on('message', (msg) => {
    ws.send('Location updated');
  });
});

module.exports = router;

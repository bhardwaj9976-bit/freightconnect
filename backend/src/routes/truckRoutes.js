const express = require('express');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/add', auth, (req, res) => {
  res.json({ success: true, message: 'Add truck' });
});

router.get('/my-trucks', auth, (req, res) => {
  res.json({ success: true, message: 'Get user trucks' });
});

router.get('/:truckId', auth, (req, res) => {
  res.json({ success: true, message: 'Get truck details' });
});

router.put('/:truckId', auth, (req, res) => {
  res.json({ success: true, message: 'Update truck' });
});

module.exports = router;

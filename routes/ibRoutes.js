const express = require('express');
const Ib = require('../models/Ib');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newIb = new Ib(req.body);
    await newIb.save();
    res.status(201).json({ success: true, message: 'IB registered successfully' });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    if(err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
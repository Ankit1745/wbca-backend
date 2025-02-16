const express = require('express');
const Consultant = require('../models/Consultant');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const newConsultant = new Consultant(req.body);
    await newConsultant.save();
    res.status(201).json({ success: true, message: 'Consultant registered successfully' });
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
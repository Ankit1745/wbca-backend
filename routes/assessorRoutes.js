const express = require('express');
const router = express.Router();
const Assessor = require('../models/Assessor');

router.post('/', async (req, res, next) => {
  try {
    const newAssessor = new Assessor(req.body);
    await newAssessor.save();
    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (err) {
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ success: false, errors: messages });
    }
    if(err.code === 11000) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }
    next(err);
  }
});

module.exports = router;
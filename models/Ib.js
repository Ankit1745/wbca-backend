const mongoose = require('mongoose');

const ibSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Name is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email is required'],
    unique: [true, 'Email already registered'],
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  number: { 
    type: String, 
    required: [true, 'Phone number is required'],
    match: [/^[0-9]{10}$/, 'Invalid phone number']
  },
  pan: { 
    type: String, 
    required: true,
    match: [/^[A-Z]{5}[0-9]{4}[A-Z]$/, 'Invalid PAN format']
  },
  workProject: { type: String, required: true },
  runningProject: { type: String, required: true },
  inHouseTeam: { type: String, required: true },
  manpowerTeam: { type: String, required: true },
  terms: { 
    type: Boolean, 
    required: [true, 'You must accept terms'],
    validate: [v => v === true, 'Terms must be accepted']
  }
});

module.exports = mongoose.model('Ib', ibSchema);
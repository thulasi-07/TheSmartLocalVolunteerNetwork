// backend/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['organizer', 'volunteer'],
    required: true
  },
  // Volunteer-only fields
  skills: String,
  location: String,
  availability: String
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);

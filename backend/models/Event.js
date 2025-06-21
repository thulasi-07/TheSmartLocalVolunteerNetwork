// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: String,
  time: String,
  location: String,
  volunteersNeeded: Number,
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
notInterested: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
completedVolunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
 // ✅ NEW FIELD
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);

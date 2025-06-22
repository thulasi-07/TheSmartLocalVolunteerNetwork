const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  eventTitle: String,
  volunteerName: String,
  organizerName: String,
  stars: Number
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);

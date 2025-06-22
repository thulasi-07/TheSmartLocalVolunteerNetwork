const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stars: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.models.Certificate || mongoose.model('Certificate', certificateSchema);

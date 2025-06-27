const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);

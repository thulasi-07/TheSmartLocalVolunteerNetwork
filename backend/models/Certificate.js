const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },

  description: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Certificate', certificateSchema);

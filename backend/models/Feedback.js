const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

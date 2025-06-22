const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
  message: String
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

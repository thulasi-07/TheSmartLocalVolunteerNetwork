const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badgeTitle: { type: String, required: true },
  stars: { type: Number, min: 1, max: 5 },
  category: { type: String },
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);
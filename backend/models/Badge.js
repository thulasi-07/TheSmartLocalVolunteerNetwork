const mongoose = require('mongoose');

const badgeSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  organizerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  badgeTitle: { type: String, required: true },
  stars: { type: Number, default: 0 },
  category: { type: String },
  reason: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Badge', badgeSchema);

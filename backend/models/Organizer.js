const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  organization: String,
  password: String,
});

module.exports = mongoose.model('Organizer', organizerSchema);

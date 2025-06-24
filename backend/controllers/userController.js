const User = require('../models/User');

exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await User.find({ role: 'volunteer' }).select('name email');
    res.json(volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching volunteers', error: err.message });
  }
};

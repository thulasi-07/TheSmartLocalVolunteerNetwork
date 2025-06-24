const Badge = require('../models/Badge');
const User = require('../models/User');

// Assign badge to a volunteer
exports.assignBadge = async (req, res) => {
  try {
    const { volunteerId, organizerId, badgeTitle, stars, category, reason } = req.body;

    const badge = new Badge({
      volunteerId,
      organizerId,
      badgeTitle,
      stars,
      category,
      reason,
    });

    await badge.save();
    res.status(201).json({ message: 'Badge assigned successfully', badge });
  } catch (err) {
    res.status(500).json({ message: 'Error assigning badge', error: err.message });
  }
};

// Get badges for a specific volunteer
exports.getBadgesForVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const badges = await Badge.find({ volunteerId });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching badges', error: err.message });
  }
};

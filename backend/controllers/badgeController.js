const Badge = require('../models/Badge');

exports.assignBadge = async (req, res) => {
  try {
    const { organizerId, volunteerId, badgeTitle, stars, category, reason } = req.body;

    const badge = new Badge({ organizerId, volunteerId, badgeTitle, stars, category, reason });
    await badge.save();
    res.status(201).json({ message: 'Badge assigned successfully!' });
  } catch (err) {
    console.error('Error assigning badge:', err);
    res.status(500).json({ error: 'Failed to assign badge' });
  }
};

exports.getBadgesForVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const badges = await Badge.find({ volunteerId });
    res.status(200).json(badges);
  } catch (err) {
    console.error('Error fetching badges:', err);
    res.status(500).json({ error: 'Failed to load badges' });
  }
};
// ✅ Get all badges assigned to a specific volunteer
exports.getBadgesByVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    const badges = await Badge.find({ volunteerId }).sort({ createdAt: -1 });

    res.status(200).json(badges);
  } catch (err) {
    console.error('❌ Error fetching volunteer badges:', err);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

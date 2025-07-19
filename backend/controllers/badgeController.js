const Badge = require('../models/Badge');

// Assign a new badge to a volunteer
// Assign a new badge to a volunteer
exports.assignBadge = async (req, res) => {
  try {
    const { organizerId, volunteerId, badgeTitle, stars, category, reason } = req.body;

    // ✅ Check if a badge is already assigned
    const existing = await Badge.findOne({ organizerId, volunteerId });
    if (existing) {
      return res.status(400).json({ error: 'You have already assigned a badge to this volunteer.' });
    }

    const badge = new Badge({
      organizerId,
      volunteerId,
      badgeTitle,
      stars,
      category,
      reason
    });

    await badge.save();
    res.status(201).json({ message: '🏅 Badge assigned successfully!', badge });
  } catch (err) {
    console.error('❌ Error assigning badge:', err);
    res.status(500).json({ error: 'Failed to assign badge' });
  }
};


// Get all badges for a specific volunteer (used in volunteer view)
exports.getBadgesByVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    const badges = await Badge.find({ volunteerId }).sort({ createdAt: -1 });
    res.status(200).json(badges);
  } catch (err) {
    console.error('❌ Error fetching badges:', err);
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
};

const Badge = require('../models/Badge');

exports.assignBadge = async (req, res) => {
  const { volunteerId, eventId, badgeType, givenBy } = req.body;
  try {
    const badge = new Badge({ volunteerId, eventId, badgeType, givenBy });
    await badge.save();
    res.status(201).json({ message: 'Badge assigned', badge });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBadgesForVolunteer = async (req, res) => {
  const { volunteerId } = req.params;
  try {
    const badges = await Badge.find({ volunteerId }).populate('eventId', 'title');
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

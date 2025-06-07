const Badge = require('../models/Badge');

// Get all badges
const getAllBadges = async (req, res) => {
  try {
    const badges = await Badge.find({});
    res.status(200).json(badges);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch badges', error });
  }
};

// Get badge by ID
const getBadgeById = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    res.status(200).json(badge);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch badge', error });
  }
};

// Create new badge
const createBadge = async (req, res) => {
  try {
    const { name, description, criteria, iconUrl } = req.body;

    const newBadge = new Badge({
      name,
      description,
      criteria,   // e.g., 'Participated in 5 events'
      iconUrl     // optional icon/image url for the badge
    });

    await newBadge.save();
    res.status(201).json(newBadge);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create badge', error });
  }
};

// Update badge
const updateBadge = async (req, res) => {
  try {
    const badge = await Badge.findById(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }

    const { name, description, criteria, iconUrl } = req.body;

    badge.name = name || badge.name;
    badge.description = description || badge.description;
    badge.criteria = criteria || badge.criteria;
    badge.iconUrl = iconUrl || badge.iconUrl;

    await badge.save();
    res.status(200).json(badge);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update badge', error });
  }
};

// Delete badge
const deleteBadge = async (req, res) => {
  try {
    const badge = await Badge.findByIdAndDelete(req.params.id);
    if (!badge) {
      return res.status(404).json({ message: 'Badge not found' });
    }
    res.status(200).json({ message: 'Badge deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete badge', error });
  }
};

module.exports = {
  getAllBadges,
  getBadgeById,
  createBadge,
  updateBadge,
  deleteBadge,
};

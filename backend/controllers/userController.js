const Event = require('../models/Event');
const User = require('../models/User');

// ✅ Fetch volunteers who completed the organizer's events
exports.getVolunteersByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;

    // 1. Find all events created by this organizer
    const events = await Event.find({ organizerId });

    // 2. Collect all volunteers who completed those events
    const volunteerSet = new Set();

    events.forEach(event => {
      if (event.completedVolunteers && event.completedVolunteers.length > 0) {
        event.completedVolunteers.forEach(volId => {
          volunteerSet.add(volId.toString());
        });
      }
    });

    // 3. If no one completed, return empty
    if (volunteerSet.size === 0) {
      return res.status(200).json([]);
    }

    // 4. Fetch volunteer user details from the User collection
    const volunteers = await User.find({
      _id: { $in: Array.from(volunteerSet) },
      role: 'volunteer'
    }).select('_id name email');

    res.status(200).json(volunteers);

  } catch (err) {
    console.error('❌ Error fetching completed volunteers:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};

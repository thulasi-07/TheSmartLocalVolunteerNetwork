const Event = require('../models/Event');
const User = require('../models/User');

// GET: /users/volunteers/by-organizer/:organizerId
exports.getVolunteersByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;

    // Fetch events by organizer
    const events = await Event.find({ organizerId });

    const volunteerSet = new Set();
    events.forEach(event => {
      if (event.completedVolunteers && event.completedVolunteers.length > 0) {
        event.completedVolunteers.forEach(v => volunteerSet.add(v.toString()));
      }
    });

    if (volunteerSet.size === 0) return res.status(200).json([]);

    const volunteers = await User.find({
      _id: { $in: Array.from(volunteerSet) },
      role: 'volunteer'
    }).select('_id name email');

    res.status(200).json(volunteers);
  } catch (err) {
    console.error('❌ Error fetching volunteers:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};


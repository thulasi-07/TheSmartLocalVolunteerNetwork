// backend/controllers/volunteerMatchController.js

const VolunteerMatch = require('../models/VolunteerMatch');
const User = require('../models/User');
const Event = require('../models/Event');

/**
 * Example matching logic:
 * - Get all volunteers and events
 * - For each event, find volunteers who match criteria (skills, availability)
 * - Save or return the matches
 */

// Fetch matches for a given event
exports.getMatchesForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    // Get event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Get all volunteers (you can add filters if needed)
    const volunteers = await User.find({ role: 'volunteer' });

    // Simple matching logic example (customize as needed)
    const matches = volunteers.filter(volunteer => {
      // Example criteria: volunteer skills include at least one event skill
      if (!volunteer.skills || !event.requiredSkills) return false;

      return volunteer.skills.some(skill => event.requiredSkills.includes(skill));
    });

    // Optionally, save these matches in VolunteerMatch model (for record keeping)
    // Clear old matches for this event
    await VolunteerMatch.deleteMany({ event: eventId });

    // Save new matches
    const savedMatches = await Promise.all(
      matches.map(volunteer => {
        const match = new VolunteerMatch({
          event: eventId,
          volunteer: volunteer._id,
        });
        return match.save();
      })
    );

    res.status(200).json({ matches: savedMatches });
  } catch (error) {
    console.error('Error in getMatchesForEvent:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get matches for a volunteer
exports.getMatchesForVolunteer = async (req, res) => {
  try {
    const { volunteerId } = req.params;

    // Find matches for this volunteer
    const matches = await VolunteerMatch.find({ volunteer: volunteerId })
      .populate('event');

    res.status(200).json({ matches });
  } catch (error) {
    console.error('Error in getMatchesForVolunteer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

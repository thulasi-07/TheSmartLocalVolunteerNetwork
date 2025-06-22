const Organizer = require('../models/Organizer');
const Volunteer = require('../models/Volunteer');
const Event = require('../models/Event');
const Feedback = require('../models/Feedback');
const Badge = require('../models/Badge');
const Certificate = require('../models/Certificate');
const User = require('../models/User');

// Get Organizer Profile with Created Events
exports.getOrganizerProfile = async (req, res) => {
  try {
    const organizer = await User.findById(req.params.organizerId).select('-password');
    const events = await Event.find({ organizerId: req.params.organizerId });
    res.json({ organizer, events });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};

// Get Feedbacks for Organizer Events
exports.getFeedbacksForOrganizer = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.params.organizerId });
    const eventIds = events.map(event => event._id);
    const feedbacks = await Feedback.find({ eventId: { $in: eventIds } }).populate('volunteerId', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching feedbacks' });
  }
};

// Assign Badge to Volunteer
exports.assignBadgeToVolunteer = async (req, res) => {
  try {
    const { volunteerId, eventId, stars, organizerId } = req.body;
    const badge = new Badge({ volunteerId, eventId, stars, organizerId });
    await badge.save();
    res.status(201).json({ message: 'Badge assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning badge' });
  }
};

// Generate Certificate
exports.generateCertificateForVolunteer = async (req, res) => {
  try {
    const { volunteerId, eventId, organizerName, stars } = req.body;
    const event = await Event.findById(eventId);
    const volunteer = await User.findById(volunteerId);
    if (!event || !volunteer) return res.status(404).json({ message: 'Event or Volunteer not found' });

    const certificate = new Certificate({
      volunteerId,
      eventId,
      eventTitle: event.title,
      volunteerName: volunteer.name,
      organizerName,
      stars,
    });

    await certificate.save();
    res.status(201).json({ message: 'Certificate generated and saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error generating certificate' });
  }
};

const Organizer = require('../models/Organizer');
const Volunteer = require('../models/Volunteer');
const Event = require('../models/Event');
const Feedback = require('../models/Feedback');
const Badge = require('../models/Badge');
const Certificate = require('../models/Certificate');

// GET Organizer Profile
exports.getOrganizerProfile = async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.organizerId);
    if (!organizer) return res.status(404).json({ message: 'Organizer not found' });
    res.json(organizer);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
};

// GET Feedbacks given to events created by this organizer
exports.getOrganizerFeedbacks = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.params.organizerId });
    const eventIds = events.map(event => event._id);
    const feedbacks = await Feedback.find({ eventId: { $in: eventIds } }).populate('volunteerId', 'name');
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching feedbacks' });
  }
};

// POST Assign Badge to a Volunteer for a specific event
exports.assignBadge = async (req, res) => {
  try {
    const { volunteerId, eventId, stars, organizerId } = req.body;
    const badge = new Badge({ volunteerId, eventId, stars, organizerId });
    await badge.save();
    res.status(201).json({ message: 'Badge assigned successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Error assigning badge' });
  }
};

// POST Generate Certificate for a Volunteer
exports.generateCertificate = async (req, res) => {
  try {
    const { volunteerId, eventId, organizerName, stars } = req.body;
    const event = await Event.findById(eventId);
    const volunteer = await Volunteer.findById(volunteerId);
    if (!event || !volunteer) return res.status(404).json({ message: 'Event or Volunteer not found' });

    const certificate = new Certificate({
      volunteerId,
      eventId,
      eventTitle: event.title,
      volunteerName: volunteer.name,
      organizerName,
      stars
    });
    await certificate.save();

    res.status(201).json({ message: 'Certificate generated and saved' });
  } catch (err) {
    res.status(500).json({ error: 'Error generating certificate' });
  }
};
exports.getOrganizerById = async (req, res) => {
  try {
    const organizer = await User.findById(req.params.id);
    if (!organizer || organizer.role !== 'organizer') {
      return res.status(404).json({ error: 'Organizer not found' });
    }
    res.json(organizer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
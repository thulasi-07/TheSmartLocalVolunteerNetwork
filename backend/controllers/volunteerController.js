const Feedback = require('../models/Feedback');
const Badge = require('../models/Badge');
const Certificate = require('../models/Certificate');

exports.submitFeedback = async (req, res) => {
  const { eventId } = req.params;
  const { volunteerId, message } = req.body;
  try {
    const feedback = new Feedback({ eventId, volunteerId, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting feedback', error: err.message });
  }
};

exports.getBadgesByVolunteer = async (req, res) => {
  const { volunteerId } = req.params;
  try {
    const badges = await Badge.find({ volunteerId });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching badges', error: err.message });
  }
};

exports.getCertificatesByVolunteer = async (req, res) => {
  const { volunteerId } = req.params;
  try {
    const certificates = await Certificate.find({ volunteerId });
    res.json(certificates);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching certificates', error: err.message });
  }
};

exports.getVolunteerProfile = async (req, res) => {
  try {
    const volunteerId = req.params.id;
    const volunteer = await Volunteer.findById(volunteerId).select('-password');
    const completedEvents = await Event.find({
      registeredVolunteers: volunteerId
    });

    res.json({ volunteer, completedEvents });
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  }
};
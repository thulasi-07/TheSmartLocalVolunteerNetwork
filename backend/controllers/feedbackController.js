// backend/controllers/feedbackController.js
const Feedback = require('../models/Feedback');
const Event = require('../models/Event');
const User = require('../models/User');

// ✅ Save feedback
// ✅ Save feedback - updated with duplicate check
exports.submitFeedback = async (req, res) => {
  try {
    const { volunteerId, eventId, message } = req.body;

    // Validate input
    if (!volunteerId || !eventId || !message) {
      return res.status(400).json({ message: 'volunteerId, eventId, and message are required.' });
    }

    // Check if event and volunteer exist
    const [event, volunteer] = await Promise.all([
      Event.findById(eventId),
      User.findById(volunteerId)
    ]);

    if (!event || !volunteer) {
      return res.status(404).json({ message: 'Event or volunteer not found' });
    }

    // Check if feedback already exists
    const existingFeedback = await Feedback.findOne({ volunteerId, eventId });
    if (existingFeedback) {
      return res.status(400).json({ message: 'You have already submitted feedback for this event.' });
    }

    // Create and save new feedback
    const newFeedback = new Feedback({
      volunteerId,
      eventId,
      organizerId: event.organizerId,
      message
    });

    await newFeedback.save();

    return res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    console.error('Feedback submission error:', err);
    return res.status(500).json({ message: 'Error submitting feedback', error: err.message });
  }
};

// ✅ Organizer views feedback
exports.getFeedbacksForOrganizer = async (req, res) => {
  try {
    const organizerId = req.params.organizerId;

    const feedbacks = await Feedback.find({ organizerId })
      .populate('volunteerId', 'name')
      .populate('eventId', 'title')
      .sort({ createdAt: -1 });

    const formatted = feedbacks.map(fb => ({
      _id: fb._id,
      volunteerName: fb.volunteerId.name,
      eventTitle: fb.eventId.title,
      message: fb.message,
      createdAt: fb.createdAt
    }));

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching feedback', error: err.message });
  }
};

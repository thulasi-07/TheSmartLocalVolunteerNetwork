// backend/controllers/feedbackController.js
const Feedback = require('../models/Feedback');
const Event = require('../models/Event');
const User = require('../models/User');

// ✅ Save feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { volunteerId, eventId, message } = req.body;

    const event = await Event.findById(eventId);
    const volunteer = await User.findById(volunteerId);

    if (!event || !volunteer) {
      return res.status(404).json({ message: 'Event or volunteer not found' });
    }

    const newFeedback = new Feedback({
      volunteerId,
      eventId,
      organizerId: event.organizerId,
      message
    });

    await newFeedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error submitting feedback', error: err.message });
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

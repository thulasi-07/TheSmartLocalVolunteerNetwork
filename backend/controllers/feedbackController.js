const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  const { volunteerId, eventId, message } = req.body;
  try {
    const feedback = new Feedback({ volunteerId, eventId, message });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted', feedback });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFeedbacksByOrganizer = async (req, res) => {
  const { organizerId } = req.params;
  try {
    const feedbacks = await Feedback.find()
      .populate('volunteerId', 'name')
      .populate('eventId', 'title organizerId')
      .sort({ date: -1 });

    const filtered = feedbacks.filter(fb => fb.eventId.organizerId.toString() === organizerId);
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const Feedback = require('../models/Feedback');
const Event = require('../models/Event');
const User = require('../models/User');

// Create Feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { userId, eventId, rating, comments } = req.body;

    // Check if user and event exist
    const user = await User.findById(userId);
    const event = await Event.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ message: 'User or event not found' });
    }

    const feedback = new Feedback({
      user: userId,
      event: eventId,
      rating,
      comments,
    });

    await feedback.save();

    res.status(201).json({
      message: 'Feedback submitted successfully',
      feedback,
    });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Failed to submit feedback' });
  }
};

// Get All Feedbacks (optional filter by event)
exports.getAllFeedbacks = async (req, res) => {
  try {
    const { eventId } = req.query;

    let filter = {};
    if (eventId) {
      filter.event = eventId;
    }

    const feedbacks = await Feedback.find(filter)
      .populate('user', 'name email')
      .populate('event', 'title');

    res.status(200).json(feedbacks);
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    res.status(500).json({ message: 'Failed to fetch feedbacks' });
  }
};

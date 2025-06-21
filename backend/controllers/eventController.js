const Event = require('../models/Event');

// ✅ Create a new event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};

// ✅ Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// ✅ Volunteer participates in an event
exports.participateInEvent = async (req, res) => {
  const { eventId } = req.params;
  const { volunteerId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event.participants.includes(volunteerId)) {
      event.participants.push(volunteerId);
      await event.save();
    }
    res.status(200).json({ message: 'Participation successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error participating in event', error: err.message });
  }
};

// ✅ Mark volunteer as not interested
exports.markNotInterested = async (req, res) => {
  const { eventId } = req.params;
  const { volunteerId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event.notInterested.includes(volunteerId)) {
      event.notInterested.push(volunteerId);
      await event.save();
    }
    res.status(200).json({ message: 'Marked as not interested' });
  } catch (err) {
    res.status(500).json({ message: 'Error', error: err.message });
  }
};

// ✅ Mark event as completed by volunteer
exports.markEventCompleted = async (req, res) => {
  const { eventId } = req.params;
  const { volunteerId } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.participants.includes(volunteerId)) {
      return res.status(400).json({ message: 'Volunteer not registered' });
    }

    if (!event.completedVolunteers.includes(volunteerId)) {
      event.completedVolunteers.push(volunteerId);
      await event.save();
    }

    return res.json({ message: 'Event marked as completed' });
  } catch (err) {
    console.error('Error in markEventCompleted:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ✅ Organizer can see all volunteer activities
exports.getVolunteerActivities = async (req, res) => {
  const { organizerId } = req.params;
  try {
    const events = await Event.find({ organizerId })
      .select('title participants notInterested completedVolunteers')
      .populate('participants', 'name')
      .populate('notInterested', 'name')
      .populate('completedVolunteers', 'name');

    const activities = [];

    events.forEach(evt => {
      evt.participants.forEach(u => {
        activities.push({ eventTitle: evt.title, volunteerName: u.name, status: 'participated' });
      });
      evt.completedVolunteers.forEach(u => {
        activities.push({ eventTitle: evt.title, volunteerName: u.name, status: 'completed' });
      });
      evt.notInterested.forEach(u => {
        activities.push({ eventTitle: evt.title, volunteerName: u.name, status: 'not_interested' });
      });
    });

    res.json(activities);
  } catch (err) {
    console.error('Error fetching volunteer activities:', err);
    res.status(500).json({ error: 'Failed to fetch volunteer activities' });
  }
};

// ✅ Organizer view
exports.getParticipantsByOrganizer = async (req, res) => {
  const { organizerId } = req.params;

  try {
    const events = await Event.find({ organizerId });
    const participants = events.map(event => ({
      title: event.title,
      participants: event.participants,
      notInterested: event.notInterested,
      completedVolunteers: event.completedVolunteers
    }));
    res.status(200).json(participants);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching participants', error: err.message });
  }
};

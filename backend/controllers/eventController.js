const Event = require('../models/Event');
const User = require('../models/User');

// ✅ Create new event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};

// ✅ Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizerId', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// ✅ Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

// ✅ Participate in an event
exports.participateInEvent = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.volunteers.includes(volunteerId)) {
      event.volunteers.push(volunteerId);
    }

    // Remove from notInterested if previously marked
    event.notInterested = event.notInterested.filter(
      (id) => id.toString() !== volunteerId
    );

    await event.save();
    res.json({ message: 'Participation successful', event });
  } catch (err) {
    res.status(500).json({ message: 'Error participating in event', error: err.message });
  }
};

// ✅ Mark event as completed by volunteer
exports.markEventCompleted = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.completedVolunteers.includes(volunteerId)) {
      event.completedVolunteers.push(volunteerId);
    }

    await event.save();
    res.json({ message: 'Marked as completed', event });
  } catch (err) {
    res.status(500).json({ message: 'Error marking as completed', error: err.message });
  }
};

// ✅ Mark event as not interested
exports.markNotInterested = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.notInterested.includes(volunteerId)) {
      event.notInterested.push(volunteerId);
    }

    // Remove from volunteers if they previously joined
    event.volunteers = event.volunteers.filter(
      (id) => id.toString() !== volunteerId
    );

    await event.save();
    res.json({ message: 'Marked as not interested', event });
  } catch (err) {
    res.status(500).json({ message: 'Error marking as not interested', error: err.message });
  }
};

// ✅ Get participants of an event
exports.getParticipantsForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate('volunteers', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json(event.volunteers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching participants', error: err.message });
  }
};

exports.getVolunteerStats = async (req, res) => {
  try {
    const volunteerId = req.params.volunteerId;
    const allEvents = await Event.find();

    const participated = allEvents.filter(event =>
      event.participants.includes(volunteerId)
    );
    const completed = allEvents.filter(event =>
      event.completedVolunteers.includes(volunteerId)
    );
    const notInterested = allEvents.filter(event =>
      event.notInterested.includes(volunteerId)
    );

    res.json({
      participated: participated.length,
      completed: completed.length,
      notInterested: notInterested.length,
      participatedEvents: participated,
      completedEvents: completed,
      notInterestedEvents: notInterested
    });
  } catch (err) {
    res.status(500).json({ error: 'Error fetching stats' });
  }
};

// controllers/eventController.js

exports.getParticipantsForEvent = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId)
      .populate('participants', 'name email')
      .populate('completedVolunteers', 'name email')
      .populate('notInterested', 'name email');

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({
      participants: event.participants,
      completed: event.completedVolunteers,
      notInterested: event.notInterested
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching participants', error: err.message });
  }
};
// ✅ Get volunteer activity for all events created by a specific organizer
exports.getVolunteerActivityByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;

    // Find all events created by this organizer
    const events = await Event.find({ organizerId })
      .populate('volunteers', 'name')
      .populate('notInterested', 'name')
      .populate('completedVolunteers', 'name');

    const activityList = [];

    for (const event of events) {
      // Participated Volunteers
      event.volunteers.forEach(volunteer => {
        activityList.push({
          volunteerName: volunteer.name,
          eventTitle: event.title,
          status: 'Participated'
        });
      });

      // Not Interested Volunteers
      event.notInterested.forEach(volunteer => {
        activityList.push({
          volunteerName: volunteer.name,
          eventTitle: event.title,
          status: 'Not Interested'
        });
      });

      // Completed Volunteers
      event.completedVolunteers.forEach(volunteer => {
        activityList.push({
          volunteerName: volunteer.name,
          eventTitle: event.title,
          status: 'Completed'
        });
      });
    }

    res.json(activityList);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching volunteer activity', error: err.message });
  }
};




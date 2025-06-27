const Event = require('../models/Event');
const User = require('../models/User');

// Create Event
exports.createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: 'Error creating event', error: err.message });
  }
};

// Get All Events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizerId', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching events', error: err.message });
  }
};

// Get Event By ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching event', error: err.message });
  }
};

// Participate
exports.participateInEvent = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.volunteers.includes(volunteerId)) {
      event.volunteers.push(volunteerId);
    }

    event.notInterested = event.notInterested.filter(id => id.toString() !== volunteerId);
    await event.save();
    res.json({ message: 'Participation successful', event });
  } catch (err) {
    res.status(500).json({ message: 'Error participating in event', error: err.message });
  }
};

// Mark Not Interested
exports.markNotInterested = async (req, res) => {
  try {
    const { volunteerId } = req.body;
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (!event.notInterested.includes(volunteerId)) {
      event.notInterested.push(volunteerId);
    }

    event.volunteers = event.volunteers.filter(id => id.toString() !== volunteerId);
    await event.save();
    res.json({ message: 'Marked as not interested', event });
  } catch (err) {
    res.status(500).json({ message: 'Error marking as not interested', error: err.message });
  }
};

// Mark Completed
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

// Participants Summary
exports.getParticipantsForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate('volunteers', 'name email')
      .populate('completedVolunteers', 'name email')
      .populate('notInterested', 'name email');

    if (!event) return res.status(404).json({ message: 'Event not found' });

    res.json({
      participants: event.volunteers,
      completed: event.completedVolunteers,
      notInterested: event.notInterested
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching participants', error: err.message });
  }
};

// Volunteer Stats
exports.getVolunteerStats = async (req, res) => {
  try {
    const volunteerId = req.params.volunteerId;
    const allEvents = await Event.find();

    const participated = allEvents.filter(event => event.volunteers.includes(volunteerId));
    const completed = allEvents.filter(event => event.completedVolunteers.includes(volunteerId));
    const notInterested = allEvents.filter(event => event.notInterested.includes(volunteerId));

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

// Events by Organizer
exports.getEventsByOrganizer = async (req, res) => {
  try {
    const events = await Event.find({ organizerId: req.params.organizerId });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events for organizer' });
  }
};

// Completed Volunteers for Certificate
exports.getCompletedVolunteersForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId).populate('completedVolunteers', '_id name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.status(200).json(event.completedVolunteers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch completed volunteers' });
  }
};

// Organizer Activity Tracker
exports.getVolunteerActivityByOrganizer = async (req, res) => {
  try {
    const { organizerId } = req.params;

    const events = await Event.find({ organizerId })
      .populate('volunteers', 'name')
      .populate('notInterested', 'name')
      .populate('completedVolunteers', 'name');

    const activityList = [];

    for (const event of events) {
      event.completedVolunteers.forEach(volunteer => {
        activityList.push({
          volunteerName: volunteer.name,
          volunteerId: volunteer._id,
          eventId: event._id,
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

// Organizer Stats for Dashboard
exports.getEventsByOrganizerStats = async (req, res) => {
  try {
    const { organizerId } = req.params;
    const events = await Event.find({ organizerId });

    const totalEvents = events.length;
    const completedEvents = events.filter(event => event.status === 'completed').length;
    const totalParticipants = events.reduce((acc, event) => acc + (event.volunteers?.length || 0), 0);

    res.status(200).json({
      totalEvents,
      completedEvents,
      totalParticipants,
    });
  } catch (err) {
    console.error('❌ Error fetching organizer stats:', err);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

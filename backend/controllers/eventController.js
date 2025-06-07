const Event = require('../models/Event');
const User = require('../models/User');

// @desc Create a new event (Organizer)
exports.createEvent = async (req, res) => {
  try {
    const { title, description, date, location, maxVolunteers } = req.body;

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      maxVolunteers,
      organizer: req.user.id,
      volunteers: [],
    });

    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ message: 'Server error creating event' });
  }
};

// @desc Get all events (public)
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('organizer', 'name email');
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

// @desc Get event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('organizer', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching event' });
  }
};

// @desc Register volunteer for event
exports.registerVolunteer = async (req, res) => {
  try {
    const eventId = req.params.id;
    const volunteerId = req.user.id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if volunteer already registered
    if (event.volunteers.includes(volunteerId)) {
      return res.status(400).json({ message: 'Already registered for this event' });
    }

    // Check if max volunteers reached
    if (event.volunteers.length >= event.maxVolunteers) {
      return res.status(400).json({ message: 'Event volunteer limit reached' });
    }

    // Optional: Check for multiple registrations on same date (if needed)
    const existingEventsOnDate = await Event.find({
      volunteers: volunteerId,
      date: event.date,
    });
    if (existingEventsOnDate.length > 0) {
      return res.status(400).json({ message: 'You have already registered for another event on this date' });
    }

    event.volunteers.push(volunteerId);
    await event.save();

    res.json({ message: 'Registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error registering volunteer' });
  }
};

// @desc Get events registered by volunteer
exports.getMyEvents = async (req, res) => {
  try {
    const volunteerId = req.user.id;

    const events = await Event.find({ volunteers: volunteerId }).populate('organizer', 'name email');

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching your events' });
  }
};

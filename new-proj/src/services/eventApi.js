// src/services/eventApi.js
import API from './api'; // This is your axios instance from api.js

// Create a new event
export const createEvent = (eventData) => {
  return API.post('/events', eventData);
};

// Get all events (for Volunteer Dashboard)
export const fetchAllEvents = () => {
  return API.get('/events');
};

// Get events by organizer ID
export const fetchEventsByOrganizer = (organizerId) => {
  return API.get(`/events/organizer/${organizerId}`);
};

// (Optional) Register a volunteer for an event
export const registerVolunteerForEvent = (eventId, volunteerId) => {
  return API.post(`/events/${eventId}/register`, { volunteerId });
};

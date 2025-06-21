// src/services/eventApi.js
import API from './api'; // Make sure your base API URL is set correctly

/** 
 * ✅ Create a new event by the organizer
 * @param {Object} eventData - All event form data including organizerId
 */
export const createEvent = (eventData) => {
  return API.post('/events', eventData);
};

/** 
 * ✅ Fetch all events (Volunteer dashboard)
 */
export const fetchAllEvents = () => {
  return API.get('/events');
};

/** 
 * ✅ Get a single event by its ID
 * @param {String} id - Event ID
 */
export const fetchEventById = (id) => {
  return API.get(`/events/${id}`);
};

/** 
 * ✅ Volunteer participates in an event
 * @param {String} eventId 
 * @param {String} volunteerId 
 */
export const participateInEvent = (eventId, volunteerId) => {
  return API.post(`/events/${eventId}/participate`, { volunteerId });
};

/** 
 * ✅ Organizer fetches volunteers who joined a specific event
 * @param {String} eventId 
 */
export const getParticipantsForEvent = (eventId) => {
  return API.get(`/events/${eventId}/participants`);
};


export const fetchEventsByOrganizer = (organizerId) => {
  return API.get(`/events?organizerId=${organizerId}`);
};

// export const markCompleted = (eventId, volunteerId) =>
//   API.post(`/events/${eventId}/complete`, { volunteerId });

export const markNotInterested = (eventId, volunteerId) => 
  API.post(`/events/${eventId}/not-interested`, { volunteerId });

export const markEventCompleted = (eventId, volunteerId) => {
  return API.post(`/events/${eventId}/complete`, { volunteerId });
};



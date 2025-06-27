import API from './api';

/** Event operations */
export const createEvent = (eventData) => API.post('/events', eventData);
export const fetchAllEvents = () => API.get('/events');
export const fetchEventById = (id) => API.get(`/events/${id}`);
export const participateInEvent = (eventId, volunteerId) =>
  API.post(`/events/${eventId}/participate`, { volunteerId });
export const markEventCompleted = (eventId, volunteerId) =>
  API.post(`/events/${eventId}/complete`, { volunteerId });
export const markNotInterested = (eventId, volunteerId) =>
  API.post(`/events/${eventId}/not-interested`, { volunteerId });
export const getParticipantsForEvent = (eventId) =>
  API.get(`/events/${eventId}/participants`);
export const fetchEventsByOrganizer = (organizerId) => {
  return API.get(`/events/by-organizer/${organizerId}`);
};

export const getCompletedVolunteersForEvent = (eventId) => {
  return API.get(`/events/${eventId}/completed-volunteers`);
};

export const getOrganizerStats = (organizerId) =>
  API.get(`/events/organizer/${organizerId}`);
export const getEventVolunteerActivities = (organizerId) =>
  API.get(`/events/activities/${organizerId}`);

/** Volunteer stats */
export const getVolunteerEventsStats = (volunteerId) =>
  API.get(`/events/stats/${volunteerId}`);

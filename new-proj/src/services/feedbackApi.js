// src/services/feedbackApi.js
import API from './api';

/**
 * ✅ Submit feedback (Volunteer side)
 * @param {Object} data - { volunteerId, eventId, message }
 */
export const submitFeedback = (data) => {
  return API.post('/auth/feedback/submit', data);
};

/**
 * ✅ Get feedbacks for all events created by organizer
 * @param {String} organizerId
 */
export const getFeedbacksForOrganizer = (organizerId) => {
  return API.get(`/organizers/feedbacks/${organizerId}`);
};

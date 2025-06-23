// src/services/organizerApi.js
import API from './api';

/**
 * ✅ Get full organizer profile including events they created
 * @param {String} organizerId
 */
export const getOrganizerProfile = (organizerId) => {
  return API.get(`/organizers/profile/${organizerId}`);
};

/**
 * ✅ Get organizer details by ID (basic info)
 * @param {String} organizerId
 */
export const getOrganizerById = (organizerId) => {
  return API.get(`/organizers/${organizerId}`);
};

export const getFeedbacksForOrganizer = (organizerId) => {
  return API.get(`/organizers/${organizerId}/feedbacks`);
};

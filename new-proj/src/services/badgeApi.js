// src/services/badgeApi.js
import API from './api';

/**
 * ✅ Assign badge/stars to volunteer
 * @param {Object} data - { volunteerId, eventId, stars, organizerId }
 */
export const assignBadge = (data) => {
  return API.post('/organizers/badges/assign', data);
};

/**
 * ✅ Get all badges for a specific volunteer
 * @param {String} volunteerId
 */
export const getBadgesByVolunteer = (volunteerId) => {
  return API.get(`/badges/volunteer/${volunteerId}`);
};

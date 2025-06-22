// src/services/certificateApi.js
import API from './api';

/**
 * ✅ Generate certificate for a volunteer
 * @param {Object} data - { volunteerId, eventId, stars, organizerName }
 */
export const generateCertificate = (data) => {
  return API.post('/organizers/certificates/generate', data);
};

/**
 * ✅ Get certificates issued to a volunteer
 * @param {String} volunteerId
 */
export const getCertificatesByVolunteer = (volunteerId) => {
  return API.get(`/certificates/volunteer/${volunteerId}`);
};

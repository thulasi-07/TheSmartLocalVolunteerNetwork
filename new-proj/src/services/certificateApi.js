// src/services/certificateApi.js
import API from './api';

/**
 * ✅ Generate a certificate for a volunteer
 * @param {Object} data - { volunteerId, eventId, organizerId, description }
 */
export const generateCertificate = (data) => {
  return API.post('/certificates/generate', data); // ✅ Correct endpoint
};

/**
 * ✅ Get all certificates issued to a volunteer
 * @param {String} volunteerId
 */
export const getCertificatesByVolunteer = (volunteerId) => {
  return API.get(`/certificates/volunteer/${volunteerId}`);
};

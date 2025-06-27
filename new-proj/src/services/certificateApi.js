// src/services/certificateApi.js
import API from './api';

/**
 * ✅ Generate a certificate for a volunteer
 * @param {Object} data - { volunteerId, eventId, organizerId, description }
 */
export const generateCertificate = (data) => {
  return API.post('/certificates/generate', data);
};

/**
 * ✅ Get all certificates issued to a volunteer
 * @param {String} volunteerId
 */
export const getCertificatesByVolunteer = (volunteerId) => {
  return API.get(`/certificates/volunteer/${volunteerId}`);
};

/**
 * ✅ Download certificate as PDF from server (optional if using client-side PDF)
 * @param {String} certificateId
 */
export const downloadCertificatePDF = (certificateId) => {
  return API.get(`/certificates/download/${certificateId}`, {
    responseType: 'blob', // Ensure binary file (PDF) is returned correctly
  });
};

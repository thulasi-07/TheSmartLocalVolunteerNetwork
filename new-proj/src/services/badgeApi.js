// src/services/badgeApi.js
import axios from './api'; // assuming axios is set up here with baseURL

// Assign badge
export const assignBadge = (badgeData) =>
  axios.post('/badges/assign', data);

// Get badges by volunteer ID
export const getVolunteerBadges = (volunteerId) =>
  axios.get(`/badges/volunteer/${volunteerId}`);

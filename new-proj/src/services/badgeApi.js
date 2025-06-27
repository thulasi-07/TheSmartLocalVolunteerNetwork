import axios from './api'; // Axios instance with baseURL setup

// Assign badge to a volunteer
export const assignBadge = (badgeData) => axios.post('/badges/assign', badgeData);

// Get badges by volunteer ID
export const getVolunteerBadges = (volunteerId) => axios.get(`/badges/volunteer/${volunteerId}`);

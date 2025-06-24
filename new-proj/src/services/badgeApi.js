import axios from './api'; // Your pre-configured axios instance

// Assign a badge (organizer side)
export const assignBadge = async (data) => {
  return axios.post('/badges', data);
};

// Get badges for a volunteer
export const getBadgesForVolunteer = async (volunteerId) => {
  return axios.get(`/badges/${volunteerId}`);
};

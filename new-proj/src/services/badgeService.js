import API from './api';

export const fetchBadges = async () => {
  const response = await API.get('/badges'); // Make sure your backend endpoint matches
  return response.data;
};

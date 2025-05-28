import API from './api';

export const fetchBadges = async () => {
  const response = await API.get('/badges');
  return response.data;
};

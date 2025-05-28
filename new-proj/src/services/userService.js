import API from './api';

export const fetchUserProfile = async (userId) => {
  const response = await API.get(`/users/${userId}`);
  return response.data;
};

export const updateUserProfile = async (userId, userData) => {
  const response = await API.put(`/users/${userId}`, userData);
  return response.data;
};

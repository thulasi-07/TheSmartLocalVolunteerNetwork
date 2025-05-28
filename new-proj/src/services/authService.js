import API from './api';

export const login = async (email, password) => {
  const response = await API.post('/auth/login', { email, password });
  return response.data;
};

export const logout = async () => {
  const response = await API.post('/auth/logout');
  return response.data;
};

export const register = async (userData) => {
  const response = await API.post('/auth/register', userData);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await API.get('/auth/current');
  return response.data;
};

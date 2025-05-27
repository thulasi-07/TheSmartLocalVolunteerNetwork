import API from './api';

export const fetchCertificates = async () => {
  const response = await API.get('/certificates'); // Replace with your backend route
  return response.data;
};

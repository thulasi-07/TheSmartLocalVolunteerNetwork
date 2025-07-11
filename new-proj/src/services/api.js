// src/services/api.js
import axios from 'axios';

// Create the base axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // No /auth here; keep it clean
});

// Automatically attach token if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default API;

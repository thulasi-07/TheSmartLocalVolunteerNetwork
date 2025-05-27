// src/services/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend base URL
  withCredentials: true,                 // Include credentials for cookies/auth
});

export default API;

import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Your backend URL
  withCredentials: true,                 // Include cookies/session if any
});

export default API;

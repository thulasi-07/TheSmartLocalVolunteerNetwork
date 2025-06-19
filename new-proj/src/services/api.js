// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api', // Your backend URL
//   withCredentials: true,                 // Include cookies/session if any
// });

// export default API;


// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

export default api;


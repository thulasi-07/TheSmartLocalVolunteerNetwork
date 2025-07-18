// src/services/aiApi.js

// import axios from "axios";

// export const getRecommendedEvents = async (input) => {
//   const res = await axios.post("http://localhost:5000/api/ai/recommend", input);
//   return res.data;
// };


import axios from "axios";

export const getRecommendedEvents = async (input) => {
  const response = await axios.post("http://localhost:5000/api/ai/recommend", input);
  return response.data;
};

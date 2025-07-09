// services/aiApi.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/ai';  // Update if using proxy or deployed

export const getRecommendations = async (volunteerId) => {
  try {
    const res = await axios.get(`${API_URL}/recommend/${volunteerId}`);
    return res.data;
  } catch (err) {
    console.error("AI API error:", err);
    throw err;
  }
};

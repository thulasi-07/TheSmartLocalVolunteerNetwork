import API from './api';

export const fetchFeedbacks = async () => {
  const response = await API.get('/feedbacks');
  return response.data;
};

export const submitFeedback = async (feedbackData) => {
  const response = await API.post('/feedbacks', feedbackData);
  return response.data;
};

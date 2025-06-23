import API from './api';

export const submitFeedback = (data) => {
  return API.post('/feedback', data);
};

export const getFeedbacksForOrganizer = (organizerId) => {
  return API.get(`/feedback/organizer/${organizerId}`);
};

import axios from "axios";

export const getVolunteerProfileById = async (id) => {
  const response = await axios.get(`/api/volunteers/profile/${id}`);
  return response.data;
};

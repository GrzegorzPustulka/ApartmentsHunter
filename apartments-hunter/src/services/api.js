import axios from 'axios';

const API_URL = 'https://your-api-url.com';

export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const subscribe = async (subscriptionData) => {
  try {
    const response = await axios.post(`${API_URL}/subscribe`, subscriptionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/access-token`, {
      grant_type: 'password',
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.detail || 'Login failed');
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/`, {
      email,
      password,
    });
    return response.status;
  } catch (error) {
    throw new Error(error.response.data.detail || 'Registration failed');
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

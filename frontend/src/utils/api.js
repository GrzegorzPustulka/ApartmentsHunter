// src/utils/api.js
const API_URL = 'http://127.0.0.1:8000';

export const loginUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/access-token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ username: email, password }),
  });
  if (!response.ok) throw new Error('Błędne dane logowania');
  return response.json();
};

export const registerUser = async (email, password) => {
  const response = await fetch(`${API_URL}/users/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Rejestracja nie powiodła się');
  return response.json();
};

export const fetchSubscriptions = async (token) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Nie udało się pobrać subskrypcji');
  return response.json();
};

export const createSubscription = async (token, data) => {
  const response = await fetch(`${API_URL}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Nie udało się utworzyć subskrypcji');
  return response.json();
};

export const deleteSubscription = async (token, id) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Nie udało się usunąć subskrypcji');
};

export const toggleSubscriptionStatus = async (token, id, isPaused) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}/toggle-status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ is_paused: isPaused }),
  });
  if (!response.ok) throw new Error('Nie udało się zmienić statusu subskrypcji');
  return response.json();
};

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

export const updateSubscriptionStatus = async (token, id, newStatus) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Nie udało się zaktualizować statusu subskrypcji');
  }
  return response.json();
};

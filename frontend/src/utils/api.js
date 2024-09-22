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


export const getSubscription = async (token, id) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error('Nie udało się pobrać subskrypcji');
  return response.json();
};

export const updateSubscription = async (token, id, data) => {
  const response = await fetch(`${API_URL}/subscriptions/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
};

export const getUserInfo = async (token) => {
  const response = await fetch(`${API_URL}/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Nie udało się pobrać informacji o użytkowniku');
  }

  const data = await response.json();
  return {
    id: data.id,
    email: data.email,
    subscription_limit: data.subscription_limit
  };
};

export const requestPasswordReset = async (token, email) => {
  const response = await fetch(`${API_URL}/users/request-password-reset`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Nie udało się wysłać żądania resetowania hasła');
  }
};



export const resetPassword = async (token, currentPassword, newPassword) => {
  const response = await fetch(`${API_URL}/users/reset-password/${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });

  if (!response.ok) {
    throw new Error('Nie udało się zresetować hasła');
  }
};

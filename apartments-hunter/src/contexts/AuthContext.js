import React, { createContext, useState, useContext, useEffect } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Sprawdzenie, czy istnieje token w localStorage przy pierwszym załadowaniu aplikacji
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
      // Możesz dodać funkcję, która pobierze dane użytkownika na podstawie tokena
    }
  }, []);

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Login error:', error);
      // Obsługa błędów
    }
  };

  const register = async (email, password) => {
    try {
      const data = await registerUser(email, password);
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUser(data.user);
    } catch (error) {
      console.error('Registration error:', error);
      // Obsługa błędów
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = () => {
    return token !== null;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

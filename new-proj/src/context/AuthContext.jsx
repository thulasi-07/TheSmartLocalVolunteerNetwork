// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import API from '../services/api';

// Create context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // Stores logged-in user info
  const [loading, setLoading] = useState(true); // Loading while checking auth status
  const [error, setError] = useState(null);

  // Check if user is already logged in (on app load)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await API.get('/auth/current');  // Backend endpoint to get current user
        setUser(response.data.user);                       // Adjust according to your backend response
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post('/auth/login', { email, password });
      setUser(response.data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async () => {
    setLoading(true);
    try {
      await API.post('/auth/logout');
      setUser(null);
    } catch (err) {
      // Optional: handle error
    } finally {
      setLoading(false);
    }
  };

  // Register function (for volunteers or organizers)
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await API.post('/auth/register', userData);
      setUser(response.data.user);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

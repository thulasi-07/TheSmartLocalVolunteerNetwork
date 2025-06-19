import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

const Login = () => {
  const { user, login, loading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // If already logged in, redirect based on role
  if (user) {
    return user.role === 'organizer' ? (
      <Navigate to="/organizer-dashboard" replace />
    ) : (
      <Navigate to="/volunteer-dashboard" replace />
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);

    if (success) {
      // ✅ Redirect based on role
      if (success.role === 'organizer') {
        navigate('/organizer-dashboard');
      } else if (success.role === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        navigate('/');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-cyan-100 px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-100 p-3 rounded text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

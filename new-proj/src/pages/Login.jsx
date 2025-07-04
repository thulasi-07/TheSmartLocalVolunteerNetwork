import React, { useState } from 'react';
import axios from '../services/authApi'; // your custom axios instance
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('/login', formData);
      const { token, role, user } = response.data;

      // ✅ Save data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
    localStorage.setItem('user', JSON.stringify(response.data.user));

 // important

      // ✅ Redirect based on role
      if (role === 'organizer') {
        navigate('/organizer-dashboard');
      } else if (role === 'volunteer') {
        navigate('/volunteer-dashboard');
      } else {
        setError('Unknown user role');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700">Login</h2>

        {error && <p className="text-center text-red-600">{error}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            maxLength={10}
            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-300 font-semibold"
        >
          Login
        </button>

        <p className="text-sm text-center text-gray-500">
          Not registered yet? Choose from{' '}
          <a href="/register-organizer" className="text-blue-600 font-medium hover:underline">
            Organizer
          </a>{' '}
          or{' '}
          <a href="/register-volunteer" className="text-blue-600 font-medium hover:underline">
            Volunteer
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

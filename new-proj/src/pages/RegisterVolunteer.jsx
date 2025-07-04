// src/pages/RegisterVolunteer.jsx

import React, { useState } from 'react';
import axios from '../services/authApi';
import { useNavigate } from 'react-router-dom';

const RegisterVolunteer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    skills: '',
    location: '',
    availability: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('/register-volunteer', formData);
      setSuccess('Volunteer registered successfully!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-white flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-lg space-y-6"
      >
        <h2 className="text-3xl font-extrabold text-center text-green-700">Register as Volunteer</h2>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <div>
          <label className="block text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
  type="password"
  name="password"
  value={formData.password}
  onChange={handleChange}
  required
  maxLength={10}
  className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
  placeholder="Create a password (max 10 characters)"
/>

        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Skills</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="e.g. First Aid, Teaching"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
            placeholder="City or region"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Availability</label>
          <select
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="">-- Select Availability --</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="anytime">Anytime</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition duration-300 font-semibold"
        >
          Register Volunteer
        </button>
      </form>
    </div>
  );
};

export default RegisterVolunteer;

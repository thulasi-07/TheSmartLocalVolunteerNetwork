import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterOrganizer = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: '',
    contact: '',
    location: '',
    designation: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register({
      ...formData,
      role: 'organizer',
    });
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-sky-100 to-purple-200 px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Organizer Registration 🎯
        </h2>

        {error && (
          <p className="mb-4 text-red-700 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@org.com' },
            { label: 'Password', name: 'password', type: showPassword ? 'text' : 'password', placeholder: 'Minimum 6 characters' },
            { label: 'Organization', name: 'organization', type: 'text', placeholder: 'NGO / Institution' },
            { label: 'Contact Info', name: 'contact', type: 'text', placeholder: 'Phone or email' },
            { label: 'Location', name: 'location', type: 'text', placeholder: 'City or Address' },
            { label: 'Designation', name: 'designation', type: 'text', placeholder: 'Coordinator, Manager, etc.' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                required={name !== 'designation'}
                value={formData[name]}
                onChange={handleChange}
                onDoubleClick={name === 'password' ? () => setShowPassword(!showPassword) : undefined}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder={placeholder}
              />
              {name === 'password' && (
                <p className="text-xs text-gray-500 mt-1">Double-click to show/hide password</p>
              )}
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterOrganizer;

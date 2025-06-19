import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RegisterVolunteer = () => {
  const navigate = useNavigate();
  const { register, error, loading } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    skills: '',
    city: '',
    availability: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await register({
      ...formData,
      role: 'volunteer',
    });
    if (success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-blue-100 to-cyan-200 px-4">
      <div className="w-full max-w-lg bg-white/90 backdrop-blur p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-emerald-800 mb-6">
          Volunteer Registration 🙌
        </h2>

        {error && (
          <p className="mb-4 text-red-700 bg-red-100 p-2 rounded text-sm text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Full Name', name: 'name', type: 'text', placeholder: 'Enter your name' },
            { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@example.com' },
            { label: 'Password', name: 'password', type: 'password', placeholder: 'Minimum 6 characters' },
            { label: 'Phone Number', name: 'phone', type: 'text', placeholder: '+91-XXXXXXXXXX' },
            { label: 'Skills', name: 'skills', type: 'text', placeholder: 'E.g., Teaching, Fundraising' },
            { label: 'City', name: 'city', type: 'text', placeholder: 'Your city' },
            { label: 'Availability', name: 'availability', type: 'text', placeholder: 'Weekends, Evenings, etc.' },
          ].map(({ label, name, type, placeholder }) => (
            <div key={name}>
              <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
              <input
                type={type}
                name={name}
                id={name}
                value={formData[name]}
                onChange={handleChange}
                required={name !== 'availability'} // make availability optional
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                placeholder={placeholder}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterVolunteer;

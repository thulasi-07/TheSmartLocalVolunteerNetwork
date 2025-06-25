// src/components/organizer/BadgeAssignmentPanel.jsx
import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { toast } from 'react-toastify';

const BadgeAssignmentPanel = ({ organizerId }) => {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    volunteerId: '',
    badgeTitle: '',
    stars: '',
    category: '',
    reason: '',
  });

  const badgeCategories = [
    'Teamwork', 'Leadership', 'Punctuality',
    'Creativity', 'Commitment', 'Communication'
  ];

  const starOptions = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const res = await axios.get(`/users/volunteers/by-organizer/${organizerId}`);
        setVolunteers(res.data || []);
      } catch (err) {
        console.error(err);
        toast.error('❌ Failed to load eligible volunteers');
        setVolunteers([]);
      } finally {
        setLoading(false);
      }
    };

    if (organizerId) fetchVolunteers();
  }, [organizerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'stars' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { volunteerId, badgeTitle, stars, category, reason } = form;

    if (!volunteerId || !badgeTitle || !stars || !category || !reason) {
      return toast.error('⚠️ Please fill in all fields');
    }

    setSubmitting(true);
    try {
      await axios.post('/badges/assign', { ...form, organizerId });
      toast.success('✅ Badge assigned successfully!');
      alert('🎉 Badge/Star has been successfully assigned to the volunteer!');
      handleReset();
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to assign badge');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm({ volunteerId: '', badgeTitle: '', stars: '', category: '', reason: '' });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">Assign Performance Badge</h2>
      <p className="text-sm text-gray-500 mb-4">
        Select a volunteer who has completed your event and assign a badge based on their performance.
      </p>

      {loading ? (
        <p className="text-gray-500">🔄 Loading volunteers...</p>
      ) : volunteers.length === 0 ? (
        <p className="text-red-500 font-medium">
          🚫 No eligible volunteers found. Please create an event and wait for participants.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Volunteer Selector */}
          <select
            name="volunteerId"
            value={form.volunteerId}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select a Volunteer</option>
            {volunteers.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name} ({v.email})
              </option>
            ))}
          </select>

          {/* Badge Title */}
          <input
            type="text"
            name="badgeTitle"
            value={form.badgeTitle}
            onChange={handleChange}
            placeholder="Enter a badge title (e.g., Star Performer)"
            className="w-full border px-4 py-2 rounded"
          />

          {/* Star Rating */}
          <select
            name="stars"
            value={form.stars}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select Star Rating</option>
            {starOptions.map((s) => (
              <option key={s} value={s}>
                {`${s} Star${s > 1 ? 's' : ''}`}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="">Select a Category</option>
            {badgeCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* Reason */}
          <textarea
            name="reason"
            value={form.reason}
            onChange={handleChange}
            placeholder="Write a reason for this badge..."
            className="w-full border px-4 py-2 rounded h-28"
          />

          {/* Submit & Reset */}
          <div className="flex justify-between gap-4">
            <button
              type="submit"
              disabled={submitting}
              className={`w-full text-white py-2 px-6 rounded transition ${
                submitting ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              {submitting ? 'Assigning...' : 'Assign Badge'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="w-full bg-gray-300 text-gray-800 py-2 px-6 rounded hover:bg-gray-400 transition"
            >
              Reset
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default BadgeAssignmentPanel;

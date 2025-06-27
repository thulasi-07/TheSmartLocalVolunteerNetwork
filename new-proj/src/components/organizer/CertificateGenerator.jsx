import React, { useEffect, useState } from 'react';
import { fetchEventsByOrganizer, getCompletedVolunteersForEvent } from '../../services/eventApi';
import axios from '../../services/api';
import { toast } from 'react-toastify';

const CertificateGenerator = ({ organizerId }) => {
  const [events, setEvents] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [form, setForm] = useState({
    eventId: '',
    volunteerId: '',
    description: ''
  });

  useEffect(() => {
    if (!organizerId) return;
    fetchEventsByOrganizer(organizerId)
      .then(res => {
        setEvents(res.data);
      })
      .catch(() => toast.error("❌ Failed to fetch events"));
  }, [organizerId]);

  useEffect(() => {
    if (!form.eventId) return;
    getCompletedVolunteersForEvent(form.eventId)
      .then(res => {
        setVolunteers(res.data);
      })
      .catch(() => toast.error("❌ Failed to fetch volunteers"));
  }, [form.eventId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'eventId' ? { volunteerId: '' } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { volunteerId, eventId, description } = form;
    if (!volunteerId || !eventId || !description.trim()) {
      return toast.warn("⚠️ Please fill all fields");
    }

    try {
      await axios.post('/certificates/generate', {
        volunteerId,
        eventId,
        organizerId,
        description
      });
      toast.success("🎓 Certificate generated");
      window.alert("🎉 Certificate successfully generated!");
      setForm({ eventId: '', volunteerId: '', description: '' });
      setVolunteers([]);
    } catch (err) {
      toast.error("❌ Failed to generate certificate");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">🎓 Generate Certificate</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium text-gray-700 mb-1">Select Event</label>
          <select
            name="eventId"
            value={form.eventId}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-indigo-500"
          >
            <option value="">Select Event</option>
            {events.map(event => (
              <option key={event._id} value={event._id}>{event.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Select Volunteer</label>
          <select
            name="volunteerId"
            value={form.volunteerId}
            onChange={handleChange}
            disabled={!form.eventId}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-indigo-500 disabled:opacity-50"
          >
            <option value="">Select Volunteer</option>
            {volunteers.map(v => (
              <option key={v._id} value={v._id}>{v.name} ({v.email})</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Certificate description..."
            className="w-full border border-gray-300 rounded px-4 py-2 h-28 resize-none focus:outline-none focus:ring focus:border-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded hover:bg-indigo-700 transition duration-200"
        >
          Give Certificate
        </button>
      </form>
    </div>
  );
};

export default CertificateGenerator;

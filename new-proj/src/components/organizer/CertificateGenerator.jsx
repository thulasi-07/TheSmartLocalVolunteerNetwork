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

  // Fetch events on mount
  useEffect(() => {
    if (!organizerId) return;
    fetchEventsByOrganizer(organizerId)
      .then(res => {
        setEvents(res.data);
      })
      .catch(() => toast.error("❌ Failed to fetch events"));
  }, [organizerId]);

  // Fetch volunteers when event changes
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
      setForm({ eventId: '', volunteerId: '', description: '' });
      setVolunteers([]);
    } catch (err) {
      toast.error("❌ Failed to generate certificate");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select name="eventId" value={form.eventId} onChange={handleChange}>
        <option value="">Select Event</option>
        {events.map(event => (
          <option key={event._id} value={event._id}>{event.title}</option>
        ))}
      </select>

      <select name="volunteerId" value={form.volunteerId} onChange={handleChange} disabled={!form.eventId}>
        <option value="">Select Volunteer</option>
        {volunteers.map(v => (
          <option key={v._id} value={v._id}>{v.name} ({v.email})</option>
        ))}
      </select>

      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Certificate description..." />
      
      <button type="submit">Generate Certificate</button>
    </form>
  );
};

export default CertificateGenerator;

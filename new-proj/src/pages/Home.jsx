import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeaturedEvents = async () => {
    try {
      const response = await API.get('/events/featured'); // Adjust endpoint as per your backend
      setFeaturedEvents(response.data);
    } catch (error) {
      console.error('Failed to fetch featured events:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedEvents();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to The Smart Local Volunteer Network</h1>
      <p className="mb-8 text-lg text-gray-700">
        Connect with local volunteer opportunities, participate in events, and make a difference in your community.
      </p>

      <h2 className="text-2xl font-semibold mb-4">Featured Events</h2>
      {loading ? (
        <p>Loading events...</p>
      ) : featuredEvents.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredEvents.map((event) => (
            <div
              key={event._id}
              className="border rounded-lg shadow hover:shadow-lg p-4 transition cursor-pointer"
            >
              <h3 className="text-xl font-bold mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-2">{event.description.slice(0, 100)}...</p>
              <p className="text-sm text-gray-500 mb-4">
                Date: {new Date(event.date).toLocaleDateString()}
              </p>
              <Link
                to={`/eventdetail/${event._id}`}
                className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No featured events at the moment.</p>
      )}
    </div>
  );
};

export default Home;

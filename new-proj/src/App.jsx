// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import RegisterVolunteer from './pages/RegisterVolunteer';
import RegisterOrganizer from './pages/RegisterOrganizer';
import EventList from './pages/EventList';
import EventDetail from './pages/EventDetail';
import FeedbackPage from './pages/FeedbackPage';
import InvitePage from './pages/InvitePage';
import Leaderboard from './pages/Leaderboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import OrganizerDashboard from './pages/OrganizerDashboard';


// 🔐 PrivateRoute using localStorage
const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register-volunteer" element={<RegisterVolunteer />} />
          <Route path="/register-organizer" element={<RegisterOrganizer />} />
          <Route path="*" element={<NotFound />} />

          {/* Volunteer Routes */}
          <Route
            path="/volunteer-dashboard"
            element={
              <PrivateRoute role="volunteer">
                <VolunteerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/event-list"
            element={
              <PrivateRoute role="volunteer">
                <EventList />
              </PrivateRoute>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateRoute role="volunteer">
                <EventDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/feedback"
            element={
              <PrivateRoute role="volunteer">
                <FeedbackPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/invite"
            element={
              <PrivateRoute role="volunteer">
                <InvitePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <PrivateRoute role="volunteer">
                <Leaderboard />
              </PrivateRoute>
            }
          />

          {/* Organizer Routes */}
          <Route
            path="/organizer-dashboard"
            element={
              <PrivateRoute role="organizer">
                <OrganizerDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;

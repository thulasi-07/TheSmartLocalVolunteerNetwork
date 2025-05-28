import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider, AuthContext } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';

// Import your pages
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

// Private route component for auth protection
const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    // Not logged in
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    // User role does not match required role
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register-volunteer" element={<RegisterVolunteer />} />
            <Route path="/register-organizer" element={<RegisterOrganizer />} />
            <Route path="*" element={<NotFound />} />

            {/* Protected Routes */}
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
            {/* Add more organizer specific routes here */}

          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}

export default App;

// import React, { useContext } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

// import Home from '../pages/Home';
// import Login from '../pages/Login';
// import NotFound from '../pages/NotFound';
// import RegisterOrganizer from '../pages/RegisterOrganizer';
// import RegisterVolunteer from '../pages/RegisterVolunteer';
// import EventList from '../pages/EventList';
// import EventDetail from '../pages/EventDetail';
// import FeedbackPage from '../pages/FeedbackPage';
// import InvitePage from '../pages/InvitePage';
// import Leaderboard from '../pages/Leaderboard';
// import VolunteerDashboard from '../pages/VolunteerDashboard';
// import OrganizerDashboard from '../pages/OrganizerDashboard';

// const AppRoutes = () => {
//   const { user, loading } = useContext(AuthContext);

//   if (loading) {
//     return <div className="text-center mt-20">Loading...</div>;
//   }

//   return (
//     <Routes>
//       {/* Public routes */}
//       <Route path="/" element={<Home />} />
//       <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
//       <Route path="/register-volunteer" element={!user ? <RegisterVolunteer /> : <Navigate to="/login" replace />} />
//       <Route path="/register-organizer" element={!user ? <RegisterOrganizer /> : <Navigate to="/login" replace />} />
//       <Route path="/events" element={<EventList />} />
//       <Route path="/events/:id" element={<EventDetail />} />
//       <Route path="/feedback" element={user ? <FeedbackPage /> : <Navigate to="/login" replace />} />
//       <Route path="/invite" element={user ? <InvitePage /> : <Navigate to="/login" replace />} />
//       <Route path="/leaderboard" element={<Leaderboard />} />

//       {/* Protected dashboards */}
//       <Route
//         path="/volunteer-dashboard"
//         element={
//           user && user.role === 'volunteer' ? (
//             <VolunteerDashboard />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       <Route
//         path="/organizer-dashboard"
//         element={
//           user && user.role === 'organizer' ? (
//             <OrganizerDashboard />
//           ) : (
//             <Navigate to="/login" replace />
//           )
//         }
//       />

//       {/* Catch all */}
//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default AppRoutes;


import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import RegisterOrganizer from '../pages/RegisterOrganizer';
import RegisterVolunteer from '../pages/RegisterVolunteer';
import EventList from '../pages/EventList';
import EventDetail from '../pages/EventDetail';
import FeedbackPage from '../pages/FeedbackPage';
import InvitePage from '../pages/InvitePage';
import Leaderboard from '../pages/Leaderboard';
import VolunteerDashboard from '../pages/VolunteerDashboard';
import OrganizerDashboard from '../pages/OrganizerDashboard';

const AppRoutes = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to={user.role === 'organizer' ? '/organizer-dashboard' : '/volunteer-dashboard'} replace />}
      />
      <Route
        path="/register-volunteer"
        element={!user ? <RegisterVolunteer /> : <Navigate to="/" replace />}
      />
      <Route
        path="/register-organizer"
        element={!user ? <RegisterOrganizer /> : <Navigate to="/" replace />}
      />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetail />} />
      <Route path="/leaderboard" element={<Leaderboard />} />

      {/* Protected Routes for Logged-in Users */}
      <Route
        path="/feedback"
        element={user ? <FeedbackPage /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/invite"
        element={user ? <InvitePage /> : <Navigate to="/login" replace />}
      />

      {/* Dashboards Based on Role */}
      <Route
        path="/volunteer-dashboard"
        element={
          user?.role === 'volunteer' ? (
            <VolunteerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/organizer-dashboard"
        element={
          user?.role === 'organizer' ? (
            <OrganizerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

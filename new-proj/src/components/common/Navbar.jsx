import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          VolunteerNetwork
        </Link>

        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
          <Link to="/events" className="hover:text-blue-500">
            Events
          </Link>

          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-500">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-red-500 focus:outline-none"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-500">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-500">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

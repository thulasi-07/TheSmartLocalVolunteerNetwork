import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      <div className="text-xl font-semibold tracking-wide">Volunteer Network</div>
      <div className="flex gap-6 items-center relative">
        <Link to="/" className="hover:underline">Home</Link>
        {/* <Link to="/events" className="hover:underline">Events</Link> */}
        <Link to="/login" className="hover:underline">Login</Link>

        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="hover:underline focus:outline-none"
          >
            Register
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-52 bg-white text-black rounded-lg shadow-lg z-20">
              <Link
                to="/register-organizer"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Register as Organizer
              </Link>
              <Link
                to="/register-volunteer"
                className="block px-4 py-2 hover:bg-gray-100"
                onClick={() => setShowDropdown(false)}
              >
                Register as Volunteer
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

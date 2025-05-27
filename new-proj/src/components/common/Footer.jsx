import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 py-4 mt-auto shadow-inner">
      <div className="container mx-auto text-center text-sm">
        © {new Date().getFullYear()} Volunteer Hub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

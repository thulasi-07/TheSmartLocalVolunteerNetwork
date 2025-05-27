import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center p-4 text-sm text-gray-600 mt-auto">
      © {new Date().getFullYear()} VolunteerNet. All rights reserved.
    </footer>
  );
};

export default Footer;

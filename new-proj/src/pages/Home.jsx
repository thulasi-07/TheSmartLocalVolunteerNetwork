import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-bg min-h-screen flex items-center justify-center px-4">
      <div
        className={`transition-all duration-1000 text-center max-w-4xl ${
          show ? 'fade-in' : 'fade-out'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl leading-tight mb-6">
          Welcome to <br />
          The Smart Local Volunteer Network 🌍
        </h1>

        <p className="text-lg md:text-xl text-gray-100 font-medium drop-shadow-sm mb-8">
          Discover, connect, and contribute to impactful local initiatives.<br />
          Be the reason someone smiles today ✨
        </p>

        {/* <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition-all duration-300">
          Get Started
        </button> */}
      </div>
    </div>
  );
};

export default Home;

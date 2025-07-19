import React, { useEffect, useState } from 'react';
import './Home.css';

const Home = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-bg">
      <div className={`text-center max-w-3xl w-full ${show ? 'fade-in' : 'fade-out'}`}>
        <h1 className="heading">
          Welcome to <br />
          The Smart Local Volunteer Network <span className="sparkle">🌼</span>
        </h1>

        <p className="subtext">
          Discover, connect, and contribute to impactful local initiatives.<br />
          Be the reason someone smiles today 
        </p>
      </div>
    </div>
  );
};

export default Home;

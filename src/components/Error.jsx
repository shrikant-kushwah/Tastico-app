import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-orange-500 via-pink-500 to-yellow-400 text-white px-6 relative overflow-hidden">
      <h1 className="text-7xl font-extrabold drop-shadow-lg">404</h1>
      <p className="text-2xl font-semibold mt-4">Oops! Page Not Found</p>
      <p className="text-white/90 mt-2 max-w-md text-center">
        Looks like you're lost. Let’s get you back to the home page.
      </p>

      <Link to="/" className="mt-6 inline-block bg-white text-orange-600 text-sm font-semibold px-6 py-3 rounded-full shadow-md hover:bg-orange-100 transition">
        Go to Homepage →
      </Link>
    </div>
  );
};

export default Error;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFound from '../../src/assets/OIP (1).jpeg'

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); // Adjust the path to your home route
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        It looks like you're lost. Let’s get you back on track!
      </p>
      <img
        src={notFound} // Replace with your preferred JPG/GIF URL
        alt="404 Not Found"
        className="w-80 mb-6"
      />
      <button
        onClick={goHome}
        className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded shadow"
      >
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;

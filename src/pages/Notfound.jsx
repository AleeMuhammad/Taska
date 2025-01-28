import React from 'react';
import { Link } from 'react-router-dom'; 

const Notfound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-4xl font-bold text-red-600 mb-4">
          404 Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md text-lg hover:bg-blue-700 transition-colors"
        >
          Go to HomePage
        </Link>
      </div>
    </div>
  );
};

export default Notfound;

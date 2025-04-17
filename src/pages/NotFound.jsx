import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700">Oops! Page not found.</p>
    </div>
  );
};

export default NotFound;

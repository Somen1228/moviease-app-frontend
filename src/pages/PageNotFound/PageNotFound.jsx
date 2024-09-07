import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PageNotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-4 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link 
        to="/" 
        className="text-lg text-white bg-blue-500 hover:bg-blue-600 py-2 px-6 rounded-lg transition duration-300 ease-in-out"
      >
        Try again
      </Link>
    </div>
  );
}

export default PageNotFound;

// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the token exists

  if (!token) {
    // If no token is found, redirect to login page
    return <Navigate to="/login" />;
  }

  // If token exists, allow access to the protected route
  return children;
};

export default ProtectedRoute;

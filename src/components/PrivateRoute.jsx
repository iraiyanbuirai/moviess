import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const userToken = localStorage.getItem("user_token");
  
  // If no token is found, redirect to login and prevent going back to the private route
  if (!userToken) {
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the child components
  return children;
};

export default PrivateRoute;

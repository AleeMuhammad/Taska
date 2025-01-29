import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"; 

const Reqauth = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const location = useLocation(); 

  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ path: location.pathname }} />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default Reqauth;

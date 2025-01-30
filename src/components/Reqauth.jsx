import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"; 

const Reqauth = ({ children }) => {
  const user = useSelector((state) => state.currentUser);
  const location = useLocation(); 
  

  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default Reqauth;

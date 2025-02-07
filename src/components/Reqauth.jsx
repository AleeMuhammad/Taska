import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"; 

const Reqauth = ({ children }) => {
  const user = useSelector((state) => state.currentUser);
  const location = useLocation(); 
  
  if(!user){
    return <Navigate to="/signin" />
  }

  if (user?.role !== "admin") {
    return <Navigate to="/unauthorized" />;
  }

  if(user?.role ==="admin"){
    return children;  }

  
};

export default Reqauth;

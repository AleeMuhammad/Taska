import React from "react";

const UserDashboard = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    return <h2>No user found. Please Sign Up.</h2>;
  }
  return (
    <div className=" text-lg font-semibold">
      {currentUser.role === "admin" ? (
        <h2>Welcome Admin, {currentUser.fullName}</h2>
      ) : (
        <h2>Welcome User, {currentUser.fullName}</h2>
      )}
    </div>
  );
};

export default UserDashboard;

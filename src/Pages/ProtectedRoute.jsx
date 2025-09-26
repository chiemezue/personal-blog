import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isloggedIn = window.localStorage.getItem("loggedIn");
  return isloggedIn === "true" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoute;

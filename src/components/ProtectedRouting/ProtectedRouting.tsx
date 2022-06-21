import React from "react";
import { Navigate, Outlet } from "react-router";

function ProtectedRouting() {
  const mobileNumber = localStorage.getItem("mobileNumber");
  return mobileNumber ? <Outlet /> : <Navigate to="/" />;
}

export default ProtectedRouting;

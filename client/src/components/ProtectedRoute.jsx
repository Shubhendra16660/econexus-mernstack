import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // 🔹 token check
  const token = localStorage.getItem("token");

  // ❌ agar token nahi hai → login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // ✅ agar token hai → allowed
  return children;
}

export default ProtectedRoute;
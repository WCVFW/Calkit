import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Placeholder from "./pages/Placeholder";
import ServiceLoader from "./pages/ServiceLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import { initAuth, getUser, clearToken, clearUser } from "./lib/auth";
import React, { useEffect, useState } from "react";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const u = initAuth();
    setUser(u);

    const handler = () => setUser(getUser());
    window.addEventListener("auth:update", handler);

    return () => window.removeEventListener("auth:update", handler);
  }, []);

  function logout() {
    clearToken();
    clearUser();
    setUser(null);
    window.dispatchEvent(new Event("auth:update"));
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header user={user} logout={logout} />
      <main className="flex-1 container mx-auto px-6 pt-16 md:pt-20 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<ServiceLoader />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

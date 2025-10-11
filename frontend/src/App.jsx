import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import TalkToCA from "./pages/ConsultanExpert/talkToCA";
import TalkToIP from "./pages/ConsultanExpert/talkToIP";
import { initAuth, getUser, clearToken, clearUser } from "./lib/auth";
import PageLoader from "./components/PageLoader";

export default function App() {
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

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

  const location = useLocation();

  useEffect(() => {
    setPageLoading(true);
    const t = setTimeout(() => setPageLoading(false), 350);
    return () => clearTimeout(t);
  }, [location]);

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/dashboard" ||
    // location.pathname === "/ConsultanExpert/talkToCA" ||
    location.pathname === "/ConsultanExpert/talkToIP";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <PageLoader show={pageLoading} />
      {!hideLayout && <Header user={user} logout={logout} />}
      <main className="flex-1 container mx-auto px-6 pt-16 md:pt-20 pb-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/ConsultanExpert/talkToCA" element={<TalkToCA />} />
          <Route path="/ConsultanExpert/talkToIP" element={<TalkToIP />} />
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
      {!hideLayout && <Footer />}
    </div>
  );
}

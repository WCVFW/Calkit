import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [mode, setMode] = useState("password"); // 'password' | 'phone'
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  const loginPassword = async (e) => {
    e.preventDefault();
    if (!email || !password) return setMessage("Enter email and password");
    setLoading(true);
    try {
      const r = await axios.post("/api/auth/login", { email, password });
      setToken(r.data.token);
      setUser(r.data.user);
      window.dispatchEvent(new Event("auth:update"));
      nav("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOtp = async (e) => {
    e.preventDefault();
    if (!/^[0-9]{10,15}$/.test(phone))
      return setMessage("Enter a valid phone number");
    setLoading(true);
    try {
      await axios.post("/api/auth/login-phone", { phone });
      setOtpSent(true);
      setMessage("OTP sent to phone (check console in dev)");
    } catch (err) {
      setMessage(err?.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Enter OTP");
    setLoading(true);
    try {
      const r = await axios.post("/api/auth/verify-phone", {
        phone,
        code: otp,
      });
      setToken(r.data.token);
      setUser(r.data.user);
      window.dispatchEvent(new Event("auth:update"));
      nav("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <div className="flex gap-2 mb-4">
        <button
          className={`px-3 py-2 rounded ${mode === "password" ? "bg-[#003366] text-white" : "bg-slate-100"}`}
          onClick={() => setMode("password")}
        >
          Email & Password
        </button>
        <button
          className={`px-3 py-2 rounded ${mode === "phone" ? "bg-[#003366] text-white" : "bg-slate-100"}`}
          onClick={() => setMode("phone")}
        >
          Phone OTP
        </button>
      </div>

      {mode === "password" ? (
        <form onSubmit={loginPassword}>
          <label className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded"
            placeholder="you@domain.com"
          />
          <label className="block text-sm font-medium text-slate-700 mt-4">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded"
            placeholder="Your password"
          />
          <button
            disabled={loading}
            className="mt-4 w-full bg-[#003366] text-white py-2 rounded"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      ) : (
        <form onSubmit={otpSent ? verifyPhoneOtp : sendPhoneOtp}>
          <label className="block text-sm font-medium text-slate-700">
            Phone
          </label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border px-3 py-2 rounded"
            placeholder="e.g. 9876543210"
          />
          {otpSent && (
            <>
              <label className="block text-sm font-medium text-slate-700 mt-4">
                OTP
              </label>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mt-2 w-full border px-3 py-2 rounded"
                placeholder="Enter OTP"
              />
            </>
          )}
          <button
            disabled={loading}
            className="mt-4 w-full bg-[#003366] text-white py-2 rounded"
          >
            {loading
              ? otpSent
                ? "Verifying..."
                : "Sending..."
              : otpSent
                ? "Verify"
                : "Send OTP"}
          </button>
        </form>
      )}
      {message && <div className="mt-3 text-sm text-red-600">{message}</div>}
    </div>
  );
}

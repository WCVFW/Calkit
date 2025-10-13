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
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> 
      <div className="max-w-md w-full bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 px-3 py-2 rounded transition-colors ${
              mode === "password"
                ? "bg-[#003366] text-white hover:bg-[#002244]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            onClick={() => {
              setMode("password");
              setOtpSent(false);
              setMessage(null);
            }}
          >
            Email & Password
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded transition-colors ${
              mode === "phone"
                ? "bg-[#003366] text-white hover:bg-[#002244]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            onClick={() => {
              setMode("phone");
              setMessage(null);
            }}
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
              placeholder="you@domain.com"
            />
            <label className="block text-sm font-medium text-slate-700 mt-4">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
              placeholder="Your password"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#003366] text-white py-2 rounded transition-colors hover:bg-[#002244] disabled:bg-slate-400"
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
              disabled={otpSent} // Disable phone input once OTP is sent
              className={`mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none ${
                otpSent ? "bg-slate-50" : ""
              }`}
              placeholder="e.g. 9876543210"
            />
            {otpSent && (
              <>
                <label className="block text-sm font-medium text-slate-700 mt-4">
                  OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
                  placeholder="Enter OTP"
                  maxLength="6" // Common OTP length
                />
              </>
            )}
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#003366] text-white py-2 rounded transition-colors hover:bg-[#002244] disabled:bg-slate-400"
            >
              {loading
                ? otpSent
                  ? "Verifying..."
                  : "Sending..."
                : otpSent
                ? "Verify"
                : "Send OTP"}
            </button>
            {otpSent && (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false); // Go back to phone input
                  setOtp(""); // Clear OTP
                  setMessage(null);
                }}
                className="mt-3 w-full text-sm text-slate-600 hover:text-[#003366]"
              >
                Change Phone Number
              </button>
            )}
          </form>
        )}
        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.includes("success") || message.includes("sent")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  const sendOtp = async (e) => {
    e.preventDefault();
    if (!mobile) return setMessage("Enter mobile number");
    setLoading(true);
    try {
      await axios.post("/api/auth/send-otp", { mobile });
      setMessage("OTP sent. Check server logs (dev) or your SMS provider.");
      nav(`/verify-otp?mobile=${encodeURIComponent(mobile)}`);
    } catch (err) {
      setMessage(err?.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login / Signup</h2>
      <form onSubmit={sendOtp}>
        <label className="block text-sm font-medium text-slate-700">
          Mobile number
        </label>
        <input
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="e.g. +911234567890"
        />
        <button
          disabled={loading}
          className="mt-4 w-full bg-[#003366] text-white py-2 rounded"
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
      {message && <div className="mt-3 text-sm text-slate-600">{message}</div>}
    </div>
  );
}

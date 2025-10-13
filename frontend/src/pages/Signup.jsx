import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  // Validation helpers
  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const isValidPhone = (v) => /^[0-9]{7,15}$/.test(v); // Adjust to match backend

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Frontend validation
    if (!fullName || !email || !phone || !password) {
      return setMessage("All fields are required");
    }
    if (fullName.length < 2 || fullName.length > 100) {
      return setMessage("Full name must be between 2 and 100 characters");
    }
    if (!isValidEmail(email)) return setMessage("Enter a valid email");
    if (!isValidPhone(phone)) return setMessage("Enter a valid phone number");
    if (password.length < 8)
      return setMessage("Password must be at least 8 characters");

    setLoading(true);
    try {
      // Send data to backend
      await axios.post("/api/auth/signup", { fullName, email, phone, password });

      setMessage(
        "Signup successful. Verification email sent. Check your inbox."
      );

      // Clear form fields
      setFullName("");
      setEmail("");
      setPhone("");
      setPassword("");

      // Navigate to OTP verification page
      nav(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "Signup failed. Try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Create New Account
        </h2>
        <form onSubmit={submit}>
          <label className="block text-sm font-medium text-slate-700">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
            placeholder="Full name"
          />

          <label className="block text-sm font-medium text-slate-700 mt-4">
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
            Phone
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
            placeholder="e.g. 9876543210"
          />

          <label className="block text-sm font-medium text-slate-700 mt-4">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
            placeholder="Choose a password"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full bg-[#003366] text-white py-2 rounded transition-colors hover:bg-[#002244] disabled:bg-slate-400"
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.toLowerCase().includes("success")
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

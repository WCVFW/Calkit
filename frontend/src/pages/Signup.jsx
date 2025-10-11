import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const isValidPhone = (v) => /^[0-9]{10,15}$/.test(v);
  const submit = async (e) => {
    e.preventDefault();
    if (!name || !email || !phone || !password) return setMessage("All fields required");
    if (!isValidEmail(email)) return setMessage("Enter a valid email");
    if (!isValidPhone(phone)) return setMessage("Enter a valid phone number");
    if (password.length < 6) return setMessage("Password must be at least 6 characters");
    setLoading(true);
    try {
      await axios.post("/api/auth/signup", { name, email, phone, password });
      setMessage(
        "Signup successful. Verification email sent. Check your inbox.",
      );
      setName("");
      setEmail(""); setPhone("");
      setPassword("");
      // optionally navigate to login
      // nav('/login');
    } catch (err) {
      setMessage(err?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <form onSubmit={submit}>
        <label className="block text-sm font-medium text-slate-700">Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="Full name (optional)"
        />

        <label className="block text-sm font-medium text-slate-700 mt-4">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="you@domain.com"
        />

        <label className="block text-sm font-medium text-slate-700 mt-4">Phone</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="e.g. 9876543210"
        />

        <label className="block text-sm font-medium text-slate-700 mt-4">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="Choose a password"
        />

        <button
          disabled={loading}
          className="mt-4 w-full bg-[#003366] text-white py-2 rounded"
        >
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      {message && <div className="mt-3 text-sm text-slate-600">{message}</div>}
    </div>
  );
}

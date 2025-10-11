import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setMessage("Email and password required");
    setLoading(true);
    try {
      await axios.post("/api/auth/signup", { name, email, password });
      setMessage("Signup successful. Verification email sent. Check your inbox.");
      setName("");
      setEmail("");
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

        <label className="block text-sm font-medium text-slate-700 mt-4">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="Choose a password"
        />

        <button disabled={loading} className="mt-4 w-full bg-[#003366] text-white py-2 rounded">
          {loading ? "Signing up..." : "Sign up"}
        </button>
      </form>
      {message && <div className="mt-3 text-sm text-slate-600">{message}</div>}
    </div>
  );
}

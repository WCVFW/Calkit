import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
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

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={submit}>
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
      {message && <div className="mt-3 text-sm text-red-600">{message}</div>}
    </div>
  );
}

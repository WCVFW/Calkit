import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      verify(token);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const verify = async (token) => {
    setLoading(true);
    try {
      await axios.post('/api/auth/verify-email', { token });
      setMessage('Email verified. You can now login.');
      setTimeout(() => nav('/login'), 1500);
    } catch (err) {
      setMessage(err?.response?.data?.error || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
      <p className="text-sm text-slate-600 mb-4">{message || 'Verifying your email...'}</p>
      {loading && <div className="h-8 w-8 rounded-full border-4 border-[#003366]/20 border-t-[#003366] animate-spin mx-auto" />}
    </div>
  );
}

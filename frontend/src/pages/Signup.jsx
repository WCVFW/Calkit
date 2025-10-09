import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup(){
  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
      <p className="text-sm text-slate-600">Use the Login form to send OTP and create your account. This demo uses mobile-based signup.</p>
      <div className="mt-4">
        <Link to="/login" className="text-blue-600">Go to Login</Link>
      </div>
    </div>
  )
}

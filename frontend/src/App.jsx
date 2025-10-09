import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Placeholder from './pages/Placeholder'
import ServiceLoader from './pages/ServiceLoader'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifyOtp from './pages/VerifyOtp'
import { initAuth } from './lib/auth'

export default function App(){
  initAuth();
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-6 pt-16 md:pt-20 pb-12">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/verify-otp" element={<VerifyOtp/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<ServiceLoader/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Placeholder from './pages/Placeholder'
import ServiceLoader from './pages/ServiceLoader'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App(){
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header />
      <main className="flex-1 container mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="*" element={<ServiceLoader/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

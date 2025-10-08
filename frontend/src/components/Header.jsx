import React from 'react'
import { Link } from 'react-router-dom'

export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-br from-indigo-600 to-cyan-400 flex items-center justify-center text-white font-bold">VS</div>
          <div>
            <div className="font-semibold">Vakilsearch</div>
            <div className="text-xs text-slate-500">Legal & Compliance Platform</div>
          </div>
        </Link>
        <nav className="flex items-center gap-4">
          <Link to="/dashboard" className="text-slate-700 hover:text-slate-900">Dashboard</Link>
          <a href="#contact" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Get Started</a>
        </nav>
      </div>
    </header>
  )
}

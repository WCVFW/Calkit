import React from 'react'
import { Link } from 'react-router-dom'

const HERO_IMG = 'https://cdn.builder.io/api/v1/image/assets%2F04f62713d501467583d89faf46821070%2F046c1810cb594890a5c6fd84b2adb30e?format=webp&width=1600'

export default function Home(){
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(18,18,18,0.45)] to-[rgba(255,255,255,0.15)]" />
        </div>

        <div className="relative container mx-auto px-6 py-28 md:py-36 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Your Legal & Business<br/>Solution, Simplified</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">Company registration, trademarks, tax & compliance — end-to-end services with expert support and transparent SLAs.</p>

          <form className="mt-8 max-w-2xl mx-auto flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <input aria-label="Search services" placeholder="Search (e.g., ltd, gst, trademark)" className="flex-1 px-4 py-3 outline-none" />
            <button className="px-6 py-3 bg-pink-600 text-white font-medium">Find Your Service</button>
          </form>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/BusinessSetup/plc" className="bg-white/90 px-4 py-3 rounded-lg shadow">Start Your Business</Link>
            <Link to="/dashboard" className="bg-white/90 px-4 py-3 rounded-lg shadow">Manage Your Business</Link>
            <Link to="/ConsultanExpert/talkToLawyer" className="bg-white/90 px-4 py-3 rounded-lg shadow">Protect Your Business</Link>
          </div>
        </div>
      </section>

      {/* Features list */}
      <section className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center">From Startup To Scale-Up — We Power You Growth</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold">Start a Business</h3>
            <ul className="mt-4 text-slate-600 space-y-2 text-sm">
              <li><Link to="/BusinessSetup/plc" className="text-pink-600">Private Limited Company Registration</Link></li>
              <li><Link to="/BusinessSetup/llp">Limited Liability Partnership Registrations</Link></li>
              <li><Link to="/BusinessSetup/opc">One Person Company Registration</Link></li>
              <li><Link to="/BusinessSetup/sp">Sole Proprietorship Registration</Link></li>
              <li><Link to="/BusinessSetup/partnership">Partnership Firm Registration</Link></li>
              <li><Link to="/BusinessSetup/startup">Startup India Registration</Link></li>
            </ul>
          </div>

          <div className="bg-pink-50 rounded-lg shadow p-6">
            <h3 className="font-semibold">Operate With Clarity</h3>
            <ul className="mt-4 text-slate-600 space-y-2 text-sm">
              <li>GST registration</li>
              <li>Director/Company changes</li>
              <li>Annual filings & compliances</li>
              <li>Accounting & Tax</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold">Secure A Legacy</h3>
            <ul className="mt-4 text-slate-600 space-y-2 text-sm">
              <li>Trademark Registration</li>
              <li>Copyright & IP protection</li>
              <li>Legal documents & contracts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 360 Command center visual */}
      <section className="mt-12 bg-gradient-to-r from-pink-700 to-purple-700 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold">Vakilsearch 360 — Your Command Center for Compliance</h3>
          <div className="mt-10 flex items-center justify-center">
            <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
              <div className="w-36 h-36 bg-white/20 rounded-full" />
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

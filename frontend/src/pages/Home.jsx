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
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(27,10,40,0.6)] to-[rgba(255,255,255,0.05)]" />
        </div>

        <div className="relative container mx-auto px-6 py-28 md:py-36 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight">Your Legal & Business Solution, Simplified</h1>
          <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">End-to-end services for company registration, trademarks, tax compliance & legal documents — with experts at every step.</p>

          <form className="mt-8 max-w-2xl mx-auto flex items-center bg-white rounded-full shadow-lg overflow-hidden">
            <input aria-label="Search services" placeholder="Search (e.g., company registration, gst, trademark)" className="flex-1 px-4 py-3 outline-none" />
            <button className="px-6 py-3 bg-pink-600 text-white font-medium">Find Your Service</button>
          </form>

          <div className="mt-8 flex justify-center gap-4">
            <Link to="/BusinessSetup/plc" className="bg-white/90 px-4 py-3 rounded-lg shadow">Start Your Business</Link>
            <Link to="/dashboard" className="bg-white/90 px-4 py-3 rounded-lg shadow">Manage Your Business</Link>
            <Link to="/ConsultanExpert/talkToLawyer" className="bg-white/90 px-4 py-3 rounded-lg shadow">Protect Your Business</Link>
          </div>
        </div>
      </section>

      {/* Main content: left list + right illustrations (match design) */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-3xl font-bold">From Startup To Scale-Up — We Power Your Growth</h2>
            <div className="mt-6 bg-pink-50 p-8 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <h4 className="text-lg font-semibold">Start a Business</h4>
                  <ul className="mt-4 text-slate-700 space-y-3 text-sm">
                    <li><Link to="/BusinessSetup/plc" className="text-pink-600">Private Limited Company</Link></li>
                    <li><Link to="/BusinessSetup/llp">Limited Liability Partnership</Link></li>
                    <li><Link to="/BusinessSetup/opc">One Person Company</Link></li>
                    <li><Link to="/BusinessSetup/sp">Sole Proprietorship</Link></li>
                    <li><Link to="/BusinessSetup/partnership">Partnership Firm</Link></li>
                    <li><Link to="/BusinessSetup/startup">Startup India Registration</Link></li>
                  </ul>
                </div>

                <div className="md:col-span-1">
                  <h4 className="text-lg font-semibold">Operate With Clarity</h4>
                  <ul className="mt-4 text-slate-700 space-y-3 text-sm">
                    <li>GST Registration</li>
                    <li>Director / Company changes</li>
                    <li>Annual filings & compliance</li>
                    <li>Accounting & tax</li>
                  </ul>
                </div>

                <div className="md:col-span-1">
                  <h4 className="text-lg font-semibold">Secure A Legacy</h4>
                  <ul className="mt-4 text-slate-700 space-y-3 text-sm">
                    <li>Trademark Registration</li>
                    <li>Copyright & IP protection</li>
                    <li>Draft legal documents</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center gap-8">
            {/* circular illustrations aligned vertically */}
            <div className="w-full flex justify-center">
              <div className="w-48 h-48 rounded-full bg-white shadow-lg overflow-hidden">
                <img src={HERO_IMG} alt="decor" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-40 h-40 rounded-full bg-white shadow-lg overflow-hidden">
                <img src={HERO_IMG} alt="decor" className="w-full h-full object-cover" />
              </div>
            </div>

            <div className="w-full flex justify-center">
              <div className="w-36 h-36 rounded-full bg-white shadow-lg overflow-hidden">
                <img src={HERO_IMG} alt="decor" className="w-full h-full object-cover" />
              </div>
            </div>
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

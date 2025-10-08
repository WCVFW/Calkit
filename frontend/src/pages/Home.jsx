import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="bg-[#E6F2FF]">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px]">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/33fb20c5031bf9926dace3f416c36ea8bf5fe94f?width=2882"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(33,150,243,0.23)] via-[rgba(0,51,102,0.8)] to-[#036]" />

        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-white font-bold text-4xl md:text-5xl lg:text-[70px] leading-tight max-w-4xl" style={{fontFamily: 'Poppins, sans-serif'}}>
            Your Legal & Business<br/>Solution, Simplified
          </h1>

          <div className="mt-10 w-full max-w-4xl flex flex-col md:flex-row gap-4">
            <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-3 shadow-lg">
              <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 26 26">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.87} d="M18.953 18.961l4.875 4.875M21.672 11.914a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z"/>
              </svg>
              <input
                type="text"
                placeholder="Search for legal, business, or services'''"
                className="flex-1 outline-none text-gray-600"
                style={{fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 300}}
              />
            </div>
            <button className="bg-[#036] text-white px-8 py-3 rounded-lg font-medium" style={{fontFamily: 'Poppins, sans-serif', fontSize: '18px'}}>
              Find Your Service
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/BusinessSetup/plc" className="bg-white rounded shadow-lg px-6 py-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-full" />
              <p className="font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>start Your Business</p>
            </Link>
            <Link to="/dashboard" className="bg-white rounded shadow-lg px-6 py-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-full" />
              <p className="font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>Manage your business</p>
            </Link>
            <Link to="/ConsultanExpert/talkToLawyer" className="bg-white rounded shadow-lg px-6 py-4 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-full" />
              <p className="font-semibold text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>protect your business</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="bg-white rounded-lg mx-4 md:mx-8 lg:mx-32 my-8 p-8">
        <h2 className="text-center text-4xl md:text-5xl lg:text-6xl font-semibold mb-12" style={{fontFamily: 'Poppins, sans-serif'}}>
          From startup to scale-up<br/>we power you growth
        </h2>
      </section>

      {/* Services Section */}
      <section className="bg-[#036] rounded-lg mx-4 md:mx-8 lg:mx-32 p-8 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            {/* Start a Business */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <svg className="w-16 h-16" viewBox="0 0 72 72">
                  <circle cx="21.5755" cy="33.1288" r="17.6152" transform="rotate(75 21.5755 33.1288)" fill="#2196F3"/>
                  <circle cx="43.1536" cy="45.5858" r="17.6152" transform="rotate(75 43.1536 45.5858)" fill="#2196F3"/>
                  <circle opacity="0.47" cx="24" cy="48" r="24" fill="#000D1A"/>
                  <circle opacity="0.47" cx="48" cy="24" r="24" fill="#000D1A"/>
                  <circle cx="34.5" cy="38.5" r="12.5" fill="#B8DBFF"/>
                </svg>
                <h3 className="text-white text-3xl font-semibold lowercase" style={{fontFamily: 'Poppins, sans-serif'}}>Start a business</h3>
              </div>
              <ul className="space-y-6 text-white text-xl" style={{fontFamily: 'Poppins, sans-serif'}}>
                <li><Link to="/BusinessSetup/plc">Private Limited company regeistration</Link></li>
                <li><Link to="/BusinessSetup/llp">Limited liability partnership registrations</Link></li>
                <li><Link to="/BusinessSetup/opc">one person company registration</Link></li>
                <li><Link to="/BusinessSetup/sp">sole proprietorship registration</Link></li>
                <li><Link to="/BusinessSetup/producer">producer company registration</Link></li>
                <li><Link to="/BusinessSetup/partnership">partnership firm regestration</Link></li>
                <li><Link to="/BusinessSetup/startup">startup India registration</Link></li>
                <li><Link to="/NGO">NGO registration</Link></li>
              </ul>
            </div>

            {/* Operate with Clarity */}
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <svg className="w-16 h-16" viewBox="0 0 72 72">
                  <circle cx="21.5755" cy="33.1288" r="17.6152" transform="rotate(75 21.5755 33.1288)" fill="#2196F3"/>
                  <circle cx="43.1536" cy="45.5858" r="17.6152" transform="rotate(75 43.1536 45.5858)" fill="#2196F3"/>
                  <circle opacity="0.47" cx="24" cy="48" r="24" fill="#000D1A"/>
                  <circle opacity="0.47" cx="48" cy="24" r="24" fill="#000D1A"/>
                  <circle cx="34.5" cy="38.5" r="12.5" fill="#B8DBFF"/>
                </svg>
                <h3 className="text-white text-3xl font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>operate with clarity</h3>
              </div>
              <ul className="space-y-6 text-white text-xl" style={{fontFamily: 'Poppins, sans-serif'}}>
                <li>GST registration</li>
                <li>change company address</li>
                <li>director replacement</li>
                <li>mandatory annual filings</li>
                <li>labor compliance</li>
                <li className="lowercase">shop and establishment license</li>
                <li>accounting & tax</li>
              </ul>
            </div>

            {/* Secure a Legacy */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <svg className="w-16 h-16" viewBox="0 0 72 72">
                  <circle cx="21.5755" cy="33.1288" r="17.6152" transform="rotate(75 21.5755 33.1288)" fill="#2196F3"/>
                  <circle cx="43.1536" cy="45.5858" r="17.6152" transform="rotate(75 43.1536 45.5858)" fill="#2196F3"/>
                  <circle opacity="0.47" cx="24" cy="48" r="24" fill="#000D1A"/>
                  <circle opacity="0.47" cx="48" cy="24" r="24" fill="#000D1A"/>
                  <circle cx="34.5" cy="38.5" r="12.5" fill="#B8DBFF"/>
                </svg>
                <h3 className="text-white text-3xl font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>secure a legacy</h3>
              </div>
              <ul className="space-y-6 text-white text-xl" style={{fontFamily: 'Poppins, sans-serif'}}>
                <li>trademark registration</li>
                <li>copyright registration</li>
                <li>patent registration</li>
                <li>IP Infringement</li>
                <li>design registration</li>
                <li>free legal document</li>
                <li>business contracts</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col items-center justify-around gap-8">
            <div className="w-64 h-64 rounded-full bg-[#0069D1] overflow-hidden flex items-center justify-center">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/959feee3eee9528bc346a7c66dda752400b02f3a?width=538" alt="" className="w-60 h-60 object-cover"/>
            </div>
            <div className="w-52 h-52 rounded-full bg-[#7EAED3] overflow-hidden flex items-center justify-center">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/3d32e547220713bb25d24504a9b2385dabdc0361?width=414" alt="" className="w-48 h-48 object-cover"/>
            </div>
            <div className="w-64 h-64 rounded-full bg-[#0069D1] overflow-hidden flex items-center justify-center">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/314a4d1385f20e4a17ab42702fa37a8eef2105e7?width=560" alt="" className="w-60 h-60 object-cover"/>
            </div>
            <div className="w-60 h-60 rounded-full bg-[#7EAED3] overflow-hidden flex items-center justify-center">
              <img src="https://api.builder.io/api/v1/image/assets/TEMP/3e17ffc7453e78bd07189440ee21eec510a3f490?width=489" alt="" className="w-56 h-56 object-cover"/>
            </div>
          </div>
        </div>
      </section>

      {/* 360 Command Center */}
      <section className="my-16 px-4">
        <h2 className="text-center text-4xl md:text-5xl font-semibold mb-12 lowercase" style={{fontFamily: 'Poppins, sans-serif'}}>
          Zolvit 360 your command<br/>center for compliance
        </h2>

        <div className="relative max-w-5xl mx-auto h-[500px]">
          <img
            src="https://api.builder.io/api/v1/image/assets/TEMP/c15eb532edfc54f4ffaee994fb3b69e8b651326e?width=3394"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="relative flex items-center justify-center h-full">
            <div className="w-96 h-96 rounded-full bg-gray-300 flex items-center justify-center">
              <svg className="w-80 h-80" viewBox="0 0 352 352">
                <circle cx="176" cy="176" r="93" fill="#7EAED3"/>
              </svg>
            </div>

            <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10">
              <p className="text-center font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>Unified Dashboard</p>
            </div>

            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10">
              <p className="text-center font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>expert connect</p>
            </div>

            <div className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10">
              <p className="text-center font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>automated compliance</p>
            </div>

            <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/50 backdrop-blur-sm rounded-2xl px-8 py-6 border border-white/10">
              <p className="text-center font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>secure documents vault</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-16">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/521f01928cb520f2d8fe2f3daf234db7540c2181?width=2880"
          alt="Footer"
          className="w-full h-auto"
        />
      </footer>
    </div>
  )
}

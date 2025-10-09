import React from "react";
import { Link } from "react-router-dom";
import Hero from "../assets/Hero.png";
import C1 from "../assets/c1.png";
import C2 from "../assets/c2.png";
import C3 from "../assets/c3.png";

export default function Home() {
  return (
    <div className="bg-[#E6F2FF] overflow-hidden font-[Poppins,sans-serif]">
      {/* Hero Section */}
      <section className="relative h-[420px] sm:h-[520px] md:h-[650px] lg:h-[750px]">
        <img
          src={Hero}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(33,150,243,0.23)] via-[rgba(0,51,102,0.8)] to-[#036]" />

        <div className="relative container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-[64px] leading-tight max-w-4xl" style={{fontFamily: 'Poppins, sans-serif'}}>
            Your Legal &amp; Business <br /> Solution, Simplified
          </h1>

          {/* Search Bar */}
          <div className="mt-8 w-full max-w-3xl flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="flex-1 bg-white rounded-lg flex items-center px-4 py-3 shadow-md">
              <svg
                className="w-6 h-6 text-gray-400 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 26 26"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.87}
                  d="M18.953 18.961l4.875 4.875M21.672 11.914a9.75 9.75 0 11-19.5 0 9.75 9.75 0 0119.5 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search for legal, business, or services"
                className="flex-1 outline-none text-gray-600 text-sm sm:text-base md:text-lg"
              />
            </div>
            <button className="bg-[#036] text-white px-5 sm:px-7 md:px-8 py-3 rounded-lg font-medium text-sm sm:text-base md:text-lg transition hover:bg-[#024]">
              Find Your Service
            </button>
          </div>

          {/* CTA Cards */}
          <div className="mt-10 flex flex-wrap justify-center gap-6">
            {[
              { to: "/BusinessSetup/plc", label: "Start Your Business", imgSrc: C1 },
              { to: "/dashboard", label: "Manage Your Business", imgSrc: C2 },
              { to: "/ConsultanExpert/talkToLawyer", label: "Protect Your Business", imgSrc: C3 },
            ].map((item, i) => (
              <Link
                key={i}
                to={item.to}
                className="relative bg-white rounded-xl shadow-lg flex flex-col items-center justify-center
                           w-[85%] sm:w-64 md:w-72 lg:w-80 p-5 hover:shadow-2xl transition-transform transform hover:scale-105"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 mb-4 overflow-hidden flex items-center justify-center">
                  <img
                    src={item.imgSrc}
                    alt={item.label}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-center font-semibold text-base sm:text-lg md:text-xl text-gray-800">
                  {item.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Heading Section */}
      <section className="bg-white mx-3 sm:mx-6 md:mx-12 lg:mx-32  sm:p-8">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold" style={{fontFamily: 'Poppins, sans-serif'}}>
          From startup to scale-up <br /> we power your growth
        </h2>
      </section>

      {/* Services Section */}
      <section className="bg-[#036] mx-3 sm:mx-6 md:mx-12 lg:mx-32 p-6 md:p-10 lg:p-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left Column */}
          <div >
            {[
              {
                title: "Start a Business",
                items: [
                  "Private Limited Company Registration",
                  "Limited Liability Partnership Registration",
                  "One Person Company Registration",
                  "Sole Proprietorship Registration",
                  "Producer Company Registration",
                  "Partnership Firm Registration",
                  "Startup India Registration",
                  "NGO Registration",
                ],
              },
              {
                title: "Operate with Clarity",
                items: [
                  "GST Registration",
                  "Change Company Address",
                  "Director Replacement",
                  "Mandatory Annual Filings",
                  "Labor Compliance",
                  "Shop and Establishment License",
                  "Accounting &amp; Tax",
                ],
              },
              {
                title: "Secure a Legacy",
                items: [
                  "Trademark Registration",
                  "Copyright Registration",
                  "Patent Registration",
                  "IP Infringement",
                  "Design Registration",
                  "Free Legal Document",
                  "Business Contracts",
                ],
              },
            ].map((section, idx) => (
              <div key={idx} className="mb-12 relative">
                {/* Vertical Line */}
                <div className="absolute left-[28px] top-10 bottom-0 w-[3px] bg-gradient-to-b from-blue-400 to-transparent" />

                {/* Title + Icon */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6 relative z-10">
                  <div className="relative flex flex-col items-center">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
                      viewBox="0 0 72 72"
                    >
                      <circle cx="21.5755" cy="33.1288" r="17.6152" fill="#2196F3" />
                      <circle cx="43.1536" cy="45.5858" r="17.6152" fill="#2196F3" />
                      <circle opacity="0.47" cx="24" cy="48" r="24" fill="#000D1A" />
                      <circle opacity="0.47" cx="48" cy="24" r="24" fill="#000D1A" />
                      <circle cx="34.5" cy="38.5" r="12.5" fill="#B8DBFF" />
                    </svg>
                  </div>
                  <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-semibold capitalize" style={{fontFamily: 'Poppins, sans-serif'}}>
                    {section.title}
                  </h3>
                </div>

                {/* List Items */}
                <ul className="space-y-2 sm:space-y-3 text-white text-sm sm:text-base md:text-lg font-light pl-14">
                  {section.items.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Column - Animated Bubbles */}
          <div className="flex flex-col items-center justify-around gap-6 sm:gap-8">
            {[
              {
                src: "https://api.builder.io/api/v1/image/assets/TEMP/959feee3eee9528bc346a7c66dda752400b02f3a?width=538",
                size: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56",
                animate: { y: [0, -25, 0], x: [0, 25, 0] },
              },
              {
                src: "https://api.builder.io/api/v1/image/assets/TEMP/3d32e547220713bb25d24504a9b2385dabdc0361?width=414",
                size: "w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52",
                animate: { y: [0, 25, 0], x: [0, -25, 0] },
              },
              {
                src: "https://api.builder.io/api/v1/image/assets/TEMP/314a4d1385f20e4a17ab42702fa37a8eef2105e7?width=560",
                size: "w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56",
                animate: { y: [0, -25, 0], x: [0, 25, 0] },
              },
              {
                src: "https://api.builder.io/api/v1/image/assets/TEMP/3e17ffc7453e78bd07189440ee21eec510a3f490?width=489",
                size: "w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52",
                animate: { y: [0, 25, 0], x: [0, -25, 0] },
              },
            ].map((bubble, i) => (
              <div
                key={i}
                className={`${bubble.size} rounded-full overflow-hidden shadow-lg relative`}
              >
                <div
                  className="absolute inset-0 bg-blue-400/30 blur-2xl rounded-full"
                />
                <img
                  src={bubble.src}
                  alt="Bubble"
                  className="object-cover w-full h-full rounded-full"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 360 Command Center */}
      <section className="">
        <h2 className="text-center font-semibold mb-12 
  text-[clamp(1.25rem,4vw,2rem)] 
  sm:text-[clamp(1.5rem,4vw,2.25rem)] 
  md:text-[clamp(1.75rem,4vw,2.5rem)] 
  lg:text-[clamp(2rem,4vw,2.75rem)] 
  xl:text-[clamp(2.25rem,4vw,3rem)]" style={{fontFamily: 'Poppins, sans-serif'}}>
          Zolvit 360 – Your Command Center for Compliance
        </h2>
        <div className="relative max-w-7xl mx-auto flex flex-col items-center bg-[url('https://storage.googleapis.com/tagjs-prod.appspot.com/v1/wubvUxErdY/s3genjtx_expires_30_days.png')] bg-cover bg-center pt-28 sm:pt-32 pb-24 sm:pb-28 px-6 sm:px-12 gap-12">

          {/* Top Label */}
          <div className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl px-6 py-3 shadow-md">
            <span className="text-gray-900 font-bold text-base sm:text-lg" style={{fontFamily: 'Poppins, sans-serif'}}>Unified Dashboard</span>
          </div>

          {/* Middle Row with Circle and Side Labels */}
          <div className="flex flex-col lg:flex-row items-center justify-center w-full relative">

            {/* Left Label */}
            <div className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl px-4 py-2 shadow-md lg:absolute lg:left-6 lg:top-1/2 lg:-translate-y-1/2">
              <span className="text-gray-900 font-bold text-sm sm:text-base" style={{fontFamily: 'Poppins, sans-serif'}}>Automated Compliance</span>
            </div>

            {/* Central Circle */}
            <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full bg-gray-300 flex items-center justify-center shadow-lg mx-2">
              <svg className="w-40 h-40 sm:w-48 sm:h-48" viewBox="0 0 352 352">
                <circle cx="176" cy="176" r="93" fill="#7EAED3" />
              </svg>
            </div>

            {/* Right Label */}
            <div className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl px-4 py-2 shadow-md lg:absolute lg:right-6 lg:top-1/2 lg:-translate-y-1/2">
              <span className="text-gray-900 font-bold text-sm sm:text-base" style={{fontFamily: 'Poppins, sans-serif'}}>Secure Documents Vault</span>
            </div>
          </div>

          {/* Bottom Label */}
          <div className="flex flex-col items-center bg-white/70 backdrop-blur-md rounded-2xl px-4 py-2 shadow-md mt-4 sm:mt-6">
            <span className="text-gray-900 font-bold text-sm sm:text-base" style={{fontFamily: 'Poppins, sans-serif'}}>Expert Connect</span>
          </div>

        </div>
      </section>
    </div>
  );
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="space-y-12">
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">Vakilsearch — Legal & Compliance, Simplified</h1>
          <p className="mt-4 text-lg text-slate-600">End-to-end platform for company registration, trademarks, tax compliance and case management. Scalable microservices, secure data flows, and built for teams.</p>
          <div className="mt-6 flex gap-3">
            <Link to="/dashboard" className="px-5 py-3 bg-indigo-600 text-white rounded-md">Go to dashboard</Link>
            <a href="#contact" className="px-5 py-3 border rounded-md">Contact sales</a>
          </div>
        </div>
        <div className="bg-gradient-to-br from-white to-slate-100 p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {title:'Company Registration', desc:'Fast company incorporation flows'},
              {title:'Trademark', desc:'IP filing & monitoring'},
              {title:'Tax Compliance', desc:'GST, ITR & filings'},
              {title:'Case Management', desc:'Tasks, SLAs, experts'}
            ].map((s)=> (
              <div key={s.title} className="p-4 bg-white rounded-lg border">
                <h3 className="font-semibold">{s.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow">
          <h4 className="font-semibold">Scalable Microservices</h4>
          <p className="text-sm text-slate-500 mt-2">Independent services for CRM, onboarding, case management, and execution.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h4 className="font-semibold">Secure by Design</h4>
          <p className="text-sm text-slate-500 mt-2">RBAC, encryption, and centralized auditing modules.</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow">
          <h4 className="font-semibold">Integrations</h4>
          <p className="text-sm text-slate-500 mt-2">Adapters for government portals, payment gateways, and communication channels.</p>
        </div>
      </section>

      <section id="contact" className="p-8 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl">
        <h3 className="text-xl font-semibold">Speak with a specialist</h3>
        <p className="text-sm text-slate-600 mt-2">Tell us about your use case and we’ll help map the right services and SLAs.</p>
      </section>
    </div>
  )
}

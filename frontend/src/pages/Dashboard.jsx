import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [leads, setLeads] = useState([])
  const [loadingLeads, setLoadingLeads] = useState(true)
  const [errorLeads, setErrorLeads] = useState(null)

  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)

  useEffect(()=>{
    let mounted = true

    // fetch leads (existing behavior)
    setLoadingLeads(true)
    axios.get('/api/leads')
      .then((r)=>{
        if(!mounted) return
        const data = r && r.data
        if(Array.isArray(data)) setLeads(data)
        else if (data && Array.isArray(data.data)) setLeads(data.data)
        else if (data && Array.isArray(data.leads)) setLeads(data.leads)
        else setLeads([])
      })
      .catch((err)=>{
        if(!mounted) return
        setErrorLeads(err.message || 'Failed to load')
        setLeads([])
      })
      .finally(()=>{ if(mounted) setLoadingLeads(false) })

    // fetch current user
    setLoadingUser(true)
    axios.get('/api/user/me')
      .then((r)=>{ if(!mounted) return; setUser(r.data) })
      .catch(()=>{ if(!mounted) return; setUser(null) })
      .finally(()=>{ if(mounted) setLoadingUser(false) })

    return ()=>{ mounted = false }
  },[])

  // Static service hub items (links point to existing routes when available)
  const services = [
    { title: 'Build My Website', desc: 'Go Digital, Get More Customers', to: '/ServiceHub/website' },
    { title: 'Create Pitch Deck', desc: 'Attract Investors, Raise Funds', to: '/Fundraising/pitch-deck' },
    { title: 'Get Expert Help', desc: 'Respond to Tax Notices', to: '/ServiceHub/tax-help' },
    { title: 'Register Trademark', desc: 'Trademark your brand name/logo', to: '/Licenses/trademark' },
    { title: 'Get DPR for Loan', desc: 'Boost Loan Approval', to: '/Fundraising/dpr' },
    { title: 'Design My Logo', desc: 'Custom Logo Design', to: '/ServiceHub/logo' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Hello{loadingUser ? '' : user && user.mobile ? `, ${user.mobile}` : ''}!</h1>
          <p className="text-sm text-slate-500">Welcome back to your workspace</p>
        </div>
        <div className="text-sm text-slate-600">
          <div>0/4</div>
          <div className="mt-2"><button className="bg-white border px-3 py-2 rounded">Take product tour</button></div>
        </div>
      </div>

      {/* Empty state / hero inside dashboard */}
      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white rounded shadow">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-lg font-semibold">One Stop for Managing Your Compliances</h2>
              <p className="text-sm text-slate-600 mt-2">Stay on top of every compliance requirement for your business, whether it's monthly, annual, or event-based. Receive automatic reminders, upload documents, and store them securely.</p>

              <div className="mt-4 flex gap-3">
                <Link to="/BusinessSetup/plc" className="bg-[#003366] text-white px-4 py-2 rounded">Start Your Business</Link>
                <button className="bg-gray-100 px-4 py-2 rounded">Add Business</button>
                <button className="bg-gray-100 px-4 py-2 rounded">Watch Demo</button>
              </div>
            </div>
            <div className="hidden md:block w-48 h-48 bg-blue-50 rounded flex items-center justify-center text-blue-700">empty-state</div>
          </div>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-[#f8fafc] rounded"> <div className="text-sm text-slate-500">Open Compliances</div> <div className="text-xl font-semibold">3</div></div>
            <div className="p-4 bg-[#f8fafc] rounded"> <div className="text-sm text-slate-500">Documents</div> <div className="text-xl font-semibold">12</div></div>
            <div className="p-4 bg-[#f8fafc] rounded"> <div className="text-sm text-slate-500">Upcoming Tasks</div> <div className="text-xl font-semibold">5</div></div>
            <div className="p-4 bg-[#f8fafc] rounded"> <div className="text-sm text-slate-500">Expert Connects</div> <div className="text-xl font-semibold">2</div></div>
          </div>
        </div>

        <aside className="p-6 bg-white rounded shadow">
          <h3 className="text-sm font-semibold">Recommended for you</h3>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start justify-between">
              <div>
                <div className="font-medium">Talk to CA</div>
                <div className="text-xs text-slate-500">Backed by 1000+ verified experts</div>
              </div>
              <Link to="/ConsultanExpert/talkToCA" className="text-sm text-blue-600">Talk</Link>
            </li>

            <li className="flex items-start justify-between">
              <div>
                <div className="font-medium">Register Trademark</div>
                <div className="text-xs text-slate-500">Secure your brand</div>
              </div>
              <Link to="/Licenses/trademark" className="text-sm text-blue-600">Start</Link>
            </li>

            <li className="flex items-start justify-between">
              <div>
                <div className="font-medium">Create Pitch Deck</div>
                <div className="text-xs text-slate-500">Attract investors</div>
              </div>
              <Link to="/Fundraising/pitch-deck" className="text-sm text-blue-600">Create</Link>
            </li>
          </ul>

          <div className="mt-6 border-t pt-4">
            <h4 className="text-sm font-semibold">Consultation</h4>
            <div className="mt-3 space-y-2">
              <Link to="/ConsultanExpert/talkToLawyer" className="block bg-gray-50 px-3 py-2 rounded">Talk to a Lawyer</Link>
              <Link to="/ConsultanExpert/talkToIP" className="block bg-gray-50 px-3 py-2 rounded">Talk to IP/Trademark Lawyer</Link>
            </div>
          </div>
        </aside>
      </div>

      {/* Service Hub */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Service Hub</h2>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {services.map((s)=> (
            <div key={s.title} className="p-4 bg-white rounded shadow flex flex-col">
              <div className="font-semibold">{s.title}</div>
              <div className="text-sm text-slate-500 mt-2 flex-1">{s.desc}</div>
              <div className="mt-4 flex items-center justify-between">
                <Link to={s.to} className="text-sm text-blue-600">View</Link>
                <button className="bg-[#003366] text-white text-sm px-3 py-1 rounded">Get</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent leads area (existing) */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold">Recent leads</h2>
        <div className="mt-4 grid gap-3">
          {loadingLeads && <div className="text-sm text-slate-500">Loading leads...</div>}
          {errorLeads && <div className="text-sm text-red-600">Error: {errorLeads}</div>}
          {!loadingLeads && !errorLeads && (leads.length===0 ? (
            <div className="text-sm text-slate-500">No leads yet</div>
          ) : (
            leads.map((l)=> (
              <div key={l.id ?? l.email ?? Math.random()} className="p-4 bg-white rounded border">{l.name} — {l.email}</div>
            ))
          ))}
        </div>
      </section>

    </div>
  )
}

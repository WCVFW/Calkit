import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Dashboard(){
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(()=>{
    let mounted = true
    setLoading(true)
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
        setError(err.message || 'Failed to load')
        setLeads([])
      })
      .finally(()=>{ if(mounted) setLoading(false) })

    return ()=>{ mounted = false }
  },[])

  return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-sm text-slate-500 mt-2">Recent leads from CRM</p>

      <div className="mt-4 grid gap-3">
        {loading && <div className="text-sm text-slate-500">Loading leads...</div>}
        {error && <div className="text-sm text-red-600">Error: {error}</div>}
        {!loading && !error && (leads.length===0 ? (
          <div className="text-sm text-slate-500">No leads yet</div>
        ) : (
          leads.map((l)=>(
            <div key={l.id ?? l.email ?? Math.random()} className="p-4 bg-white rounded border">{l.name} — {l.email}</div>
          ))
        ))}
      </div>
    </div>
  )
}

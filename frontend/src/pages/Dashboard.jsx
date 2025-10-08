import React, {useEffect, useState} from 'react'
import axios from 'axios'

export default function Dashboard(){
  const [leads, setLeads] = useState([])
  useEffect(()=>{
    axios.get('/api/leads').then(r=>setLeads(r.data)).catch(()=>{})
  },[])
  return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-sm text-slate-500 mt-2">Recent leads from CRM</p>
      <div className="mt-4 grid gap-3">
        {leads.length===0? <div className="text-sm text-slate-500">No leads yet</div> : leads.map(l=> (
          <div key={l.id} className="p-4 bg-white rounded border">{l.name} — {l.email}</div>
        ))}
      </div>
    </div>
  )
}

import React, {useState} from 'react'
import axios from 'axios'

export default function TalkToIP(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [loading,setLoading]=useState(false)
  const [msg,setMsg]=useState('')

  async function submit(e){
    e.preventDefault(); setLoading(true)
    try{ await axios.post('/api/leads',{name,email}); setMsg('Submitted. Our IP expert will contact you.'); setName(''); setEmail('') }catch(err){setMsg('Submit failed')}
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Talk to an IP/Trademark Lawyer</h1>
      <p className="mt-2 text-slate-600">Trademark search, filing, prosecution and IP strategy support.</p>
      <form onSubmit={submit} className="mt-6 space-y-3">
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="border rounded px-3 py-2 w-full" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border rounded px-3 py-2 w-full" />
        <button className="px-4 py-2 bg-emerald-600 text-white rounded" disabled={loading}>{loading? 'Submitting...':'Request IP Call'}</button>
      </form>
      {msg && <div className="mt-3 text-sm text-slate-700">{msg}</div>}
    </div>
  )
}

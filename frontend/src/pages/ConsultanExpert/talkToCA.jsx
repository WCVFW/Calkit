import React, {useState} from 'react'
import axios from 'axios'

export default function TalkToCA(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)

  async function submit(e){
    e.preventDefault(); setLoading(true)
    try{ await axios.post('/api/leads',{name,email}); setMsg('Submitted. Our CA will contact you.'); setName(''); setEmail('') }catch(err){setMsg('Submit failed')}
    setLoading(false)
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Talk to a Chartered Accountant</h1>
      <p className="mt-2 text-slate-600">Get tax planning, GST, TDS and compliance assistance from our CAs.</p>
      <form className="mt-6 space-y-3" onSubmit={submit}>
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="border rounded px-3 py-2 w-full" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border rounded px-3 py-2 w-full" />
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Tell us about your requirement" className="border rounded px-3 py-2 w-full h-28" />
        <button className="px-4 py-2 bg-cyan-600 text-white rounded" disabled={loading}>{loading? 'Submitting...':'Request Call'}</button>
      </form>
    </div>
  )
}

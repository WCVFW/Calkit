import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function TalkToLawyer(){
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [msg,setMsg]=useState('')
  const [loading,setLoading]=useState(false)
  const nav = useNavigate()

  async function submit(e){
    e.preventDefault(); setLoading(true)
    try{
      await axios.post('/api/leads',{name,email})
      setMsg('Request submitted. We will contact you shortly.')
      setName(''); setEmail('')
    }catch(err){setMsg('Failed to submit. Try again.')}
    setLoading(false)
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Talk to a Lawyer</h1>
      <p className="mt-3 text-slate-600">Schedule a consultation with an experienced lawyer for company law, contracts, disputes and compliance.</p>

      <section className="mt-6">
        <h3 className="font-semibold">How it works</h3>
        <ol className="list-decimal ml-6 mt-2 text-sm text-slate-600">
          <li>Fill the form below</li>
          <li>We qualify and schedule a call</li>
          <li>Get expert recommendations & next steps</li>
        </ol>
      </section>

      <form className="mt-6 grid gap-3" onSubmit={submit}>
        <input required value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" className="border rounded px-3 py-2" />
        <input required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border rounded px-3 py-2" />
        <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Brief description (optional)" className="border rounded px-3 py-2 h-24" />
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading? 'Submitting...':'Request Consultation'}</button>
        </div>
        {msg && <div className="text-sm text-slate-700 mt-2">{msg}</div>}
      </form>
    </div>
  )
}

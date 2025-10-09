import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setToken } from '../lib/auth'

export default function VerifyOtp(){
  const [code, setCode] = useState('')
  const [mobile, setMobile] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const nav = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(()=>{
    const m = searchParams.get('mobile') || ''
    setMobile(m)
  },[searchParams])

  const verify = async (e) =>{
    e && e.preventDefault()
    if(!mobile || !code) return setMessage('Enter code')
    setLoading(true)
    try{
      const r = await axios.post('/api/auth/verify-otp', { mobile, code })
      const token = r.data.token
      setToken(token)
      nav('/dashboard')
    }catch(err){
      setMessage(err?.response?.data?.error || 'Invalid code')
    }finally{ setLoading(false) }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Verify OTP</h2>
      <p className="text-sm text-slate-600">Mobile: {mobile}</p>
      <form onSubmit={verify} className="mt-4">
        <label className="block text-sm font-medium text-slate-700">Enter OTP</label>
        <input value={code} onChange={(e)=>setCode(e.target.value)} className="mt-2 w-full border px-3 py-2 rounded" placeholder="123456" />
        <button disabled={loading} className="mt-4 w-full bg-[#003366] text-white py-2 rounded">{loading ? 'Verifying...' : 'Verify & Login'}</button>
      </form>
      {message && <div className="mt-3 text-sm text-red-600">{message}</div>}
    </div>
  )
}

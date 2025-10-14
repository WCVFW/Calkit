import React, { useState } from "react";

export default function ConsultPage() {
  const [name, setName] = useState("");
  const [topic, setTopic] = useState("");
  const [msg, setMsg] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name || !topic) return setMsg("Enter name and topic");
    setMsg("Request submitted (sample)");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">Consult</h1>
        <p className="text-slate-600 mt-2">Request a consultation (sample form).</p>
        <form onSubmit={submit} className="mt-4 grid gap-3 max-w-md">
          <input value={name} onChange={(e)=>setName(e.target.value)} className="border rounded px-3 py-2" placeholder="Your name" />
          <input value={topic} onChange={(e)=>setTopic(e.target.value)} className="border rounded px-3 py-2" placeholder="Topic" />
          <button className="bg-[#003366] text-white px-4 py-2 rounded">Submit</button>
          {msg && <div className="text-sm text-slate-600">{msg}</div>}
        </form>
      </div>
    </div>
  );
}

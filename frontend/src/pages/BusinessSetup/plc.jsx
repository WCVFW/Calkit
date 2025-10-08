import React from 'react'

export default function PLC(){
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold">Private Limited Company</h1>
      <p className="mt-2 text-slate-600">Full-service company incorporation for Private Limited including DSC, DIN, name application, MOA/AOA drafting and ROC filing.</p>

      <section className="mt-6">
        <h3 className="font-semibold">Process</h3>
        <ol className="list-decimal ml-6 mt-2 text-sm text-slate-600">
          <li>Collect documents & KYC</li>
          <li>Apply for DSC & name approval</li>
          <li>Draft MOA/AOA and file with ROC</li>
          <li>Receive Certificate of Incorporation</li>
        </ol>
      </section>

      <div className="mt-6">
        <a className="px-4 py-2 bg-indigo-600 text-white rounded" href="#">Start Registration</a>
      </div>
    </div>
  )
}

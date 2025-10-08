import React from 'react'

export default function Footer(){
  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-6 py-6 text-sm text-slate-500">© {new Date().getFullYear()} Vakilsearch — Built with care.</div>
    </footer>
  )
}

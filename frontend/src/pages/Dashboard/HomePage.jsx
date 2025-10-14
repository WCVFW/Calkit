import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const links = [
    { to: "/dashboard/compliances", label: "Compliances" },
    { to: "/dashboard/crm", label: "CRM" },
    { to: "/dashboard/calendar", label: "Calendar" },
    { to: "/dashboard/documents", label: "Documents" },
    { to: "/dashboard/reports", label: "Reports" },
    { to: "/dashboard/consult", label: "Consult" },
    { to: "/dashboard/users", label: "Users & Roles" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">Dashboard Home</h1>
        <p className="text-slate-600 mt-2">Quick access to dashboard sections.</p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="border rounded-lg p-3 hover:bg-slate-50">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

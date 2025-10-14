import React from "react";

export default function CrmPage() {
  const leads = [
    { id: 1, name: "Alice", service: "GST Registration", status: "New" },
    { id: 2, name: "Bob", service: "Trademark", status: "In Progress" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">CRM</h1>
        <p className="text-slate-600 mt-2">Recent leads (sample data).</p>
        <div className="overflow-x-auto mt-4">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Service</th>
                <th className="py-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((l) => (
                <tr key={l.id} className="border-b">
                  <td className="py-2 pr-4">{l.name}</td>
                  <td className="py-2 pr-4">{l.service}</td>
                  <td className="py-2 pr-4">{l.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

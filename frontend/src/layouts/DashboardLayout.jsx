import { Outlet, NavLink } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white shadow-md">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="w-auto text-[#0080FF] font-extrabold text-2xl">
            L<span className="text-gray-700">OGO</span>
          </div>

          <nav className="flex items-center gap-4 lg:gap-6 text-sm">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                  isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
                }`
              }
              end
            >
              Home
            </NavLink>
            <NavLink to="/dashboard/compliances" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Compliances
            </NavLink>
            <NavLink to="/dashboard/servicehub" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Service Hub
            </NavLink>
            <NavLink to="/dashboard/crm" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              CRM
            </NavLink>
            <NavLink to="/dashboard/calendar" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Calendar
            </NavLink>
            <NavLink to="/dashboard/documents" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Documents
            </NavLink>
            <NavLink to="/dashboard/reports" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Reports
            </NavLink>
            <NavLink to="/dashboard/consult" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Consult
            </NavLink>
            <NavLink to="/dashboard/users" className={({ isActive }) => (
              `text-lg transition-colors duration-200 py-1.5 px-3 rounded ${
                isActive ? "text-[#0080FF] font-semibold" : "text-gray-600 hover:text-[#2E96FF]"
              }`
            )}>
              Users & Roles
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full p-6">
        <Outlet />
      </main>
    </div>
  );
}

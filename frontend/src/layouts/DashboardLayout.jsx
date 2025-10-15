import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
// Assuming you have an icon library, e.g., using Heroicons or a custom SVG
// For this example, I'll use a simple SVG for the menu button

export default function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Define common link styles
  const navLinkClass = ({ isActive }) =>
    `text-sm md:text-base transition-colors duration-200 py-1.5 px-3 rounded-lg ${
      isActive
        ? "text-[#0080FF] font-semibold bg-[#E6F3FF]" // Added light background for active state
        : "text-gray-600 hover:text-[#2E96FF] hover:bg-gray-100"
    }`;

  // Define all navigation items
  const navItems = [
    { to: "/dashboard", label: "Home", end: true },
    { to: "/dashboard/compliances", label: "Compliances" },
    { to: "/dashboard/servicehub", label: "Service Hub" },
    { to: "/dashboard/crm", label: "CRM" },
    { to: "/dashboard/calendar", label: "Calendar" },
    { to: "/dashboard/documents", label: "Documents" },
    { to: "/dashboard/reports", label: "Reports" },
    { to: "/dashboard/consult", label: "Consult" },
    { to: "/dashboard/users", label: "Users & Roles" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <div className="w-auto text-[#0080FF] font-extrabold text-2xl">
            L<span className="text-gray-700">OGO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                end={item.end}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile/Tablet Menu Button (Visible below large screens) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
              aria-label="Toggle menu"
            >
              {/* Menu Icon (Hamburger) */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                ></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu (Conditionally Rendered) */}
        {isMenuOpen && (
          <div className="lg:hidden shadow-inner bg-white border-t border-gray-100">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navLinkClass}
                  end={item.end}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
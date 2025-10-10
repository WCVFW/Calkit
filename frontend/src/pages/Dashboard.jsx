import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [errorLeads, setErrorLeads] = useState(null);

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    let mounted = true;

    // fetch leads (existing behavior)
    setLoadingLeads(true);
    axios
      .get("/api/leads")
      .then((r) => {
        if (!mounted) return;
        const data = r && r.data;
        if (Array.isArray(data)) setLeads(data);
        else if (data && Array.isArray(data.data)) setLeads(data.data);
        else if (data && Array.isArray(data.leads)) setLeads(data.leads);
        else setLeads([]);
      })
      .catch((err) => {
        if (!mounted) return;
        setErrorLeads(err.message || "Failed to load");
        setLeads([]);
      })
      .finally(() => {
        if (mounted) setLoadingLeads(false);
      });

    // fetch current user
    setLoadingUser(true);
    axios
      .get("/api/user/me")
      .then((r) => {
        if (!mounted) return;
        setUser(r.data);
      })
      .catch(() => {
        if (!mounted) return;
        setUser(null);
      })
      .finally(() => {
        if (mounted) setLoadingUser(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Static service hub items (links point to existing routes when available)
  const services = [
    {
      title: "Build My Website",
      desc: "Go Digital, Get More Customers",
      to: "/ServiceHub/website",
    },
    {
      title: "Create Pitch Deck",
      desc: "Attract Investors, Raise Funds",
      to: "/Fundraising/pitch-deck",
    },
    {
      title: "Get Expert Help",
      desc: "Respond to Tax Notices",
      to: "/ServiceHub/tax-help",
    },
    {
      title: "Register Trademark",
      desc: "Trademark your brand name/logo",
      to: "/Licenses/trademark",
    },
    {
      title: "Get DPR for Loan",
      desc: "Boost Loan Approval",
      to: "/Fundraising/dpr",
    },
    {
      title: "Design My Logo",
      desc: "Custom Logo Design",
      to: "/ServiceHub/logo",
    },
  ];

  return (
    <div className="min-h-screen bg-[#DDE0E3]">
      {/* Top custom bar (dashboard-specific, not global header) */}
      <div className="relative w-full h-[123px]">
        <div className="absolute top-0 left-0 w-full h-[75px] bg-[#2E96FF]" />
        <div className="absolute left-0 right-0 mx-auto w-full max-w-[1440px] h-[84.49px] top-[67.51px] bg-white shadow-sm">
          <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
            <div className="flex items-center gap-6">
              <div className="w-[58px] h-[27px] text-white font-bold text-[19.9px]">
                C<span className="text-white">FS</span>
              </div>
              <nav className="hidden lg:flex items-center gap-6">
                <a className="text-[18px] text-[#0080FF]">Home</a>
                <a className="text-[18px] text-black">Compliances</a>
                <a className="text-[18px] text-black">Service hub</a>
                <a className="text-[18px] text-black">Calendar</a>
                <a className="text-[18px] text-black">Documents</a>
                <a className="text-[18px] text-black">Reports</a>
                <a className="text-[18px] text-black">Consult</a>
                <a className="text-[18px] text-black">Users & Roles</a>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-[55px] h-[54.56px] bg-[#F8FBFF] rounded flex items-center justify-center">
                <div className="w-[19px] h-[19px] bg-[#2E96FF] rounded-sm" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main white panel */}
      <div className="max-w-[1260px] mx-auto mt-12 bg-white rounded p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="p-6 rounded-md bg-[#F5FAFF] flex items-start gap-6">
              <div className="w-[590px] h-[65px] bg-[#5299F4] rounded flex items-center px-4">
                <div>
                  <div className="text-white font-medium">
                    Trademark registration
                  </div>
                  <div className="text-[11px] text-[#E2EFFA]">
                    legal protection for your brand indemnity
                  </div>
                </div>
              </div>

              <div className="w-[590px] h-[65px] bg-[#5299F4] rounded flex items-center px-4 justify-between">
                <div>
                  <div className="text-white font-medium">Another Service</div>
                  <div className="text-[11px] text-[#E2EFFA]">
                    short description here
                  </div>
                </div>
                <div className="w-[40px] h-[40px] bg-[#E5F7F7] rounded flex items-center justify-center" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-4 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-[#F0F3F3] border border-[#94C8FA] rounded p-4"
                >
                  <div className="w-[40px] h-[40px] bg-[#E5F7F7] rounded mb-4" />
                  <div className="font-medium">GST registration</div>
                  <div className="text-[11px] text-[#515554]">
                    starts from rs749 rs499
                  </div>
                  <div className="mt-3 text-[11px] text-[#5FA1F9] font-semibold">
                    View details
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="p-6 bg-white rounded shadow">
            <h3 className="text-sm font-semibold">Overview</h3>
            <div className="mt-4 space-y-4">
              <div className="text-[19px] text-[#529AF4] font-semibold">
                Overview
              </div>
              <div className="text-sm">Process & Documents</div>
              <div className="text-sm">Benefits</div>
            </div>

            <div className="mt-6 border-t pt-4">
              <button className="w-full border border-[#88A5BC] py-2 rounded">
                Request a callback
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

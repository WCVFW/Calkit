import React, { useState } from "react";

// ===========================================
// STATIC DATA
// ===========================================

const tabData = {
    "Licenses/Registrations": [
        { title: "GST Registration", desc: "Starts From Rs749 Rs499", to: "/compliances/gst" },
        { title: "ITR Filing", desc: "File your Income Tax Return", to: "/compliances/itr" },
        { title: "MSME Registration", desc: "Get Udyam recognition", to: "/licenses/msme" },
        { title: "Company Formation", desc: "Private Ltd. Company", to: "/startup/company" },
        { title: "ROC Filings", desc: "Annual Return Compliance", to: "/compliances/roc" },
        { title: "FSSAI License", desc: "Food business license", to: "/licenses/fssai" },
        { title: "Import/Export Code", desc: "IE Code Registration", to: "/licenses/iec" },
        { title: "Startup India", desc: "DPIIT Recognition", to: "/startup/india" },
        { title: "PF/ESI Registration", desc: "Employee benefits compliance", to: "/compliances/pf-esi" },
        { title: "Shops & Est.", desc: "Local business license", to: "/licenses/shop" },
    ],
    "Trademark/IP": [
        { title: "Trademark Registration", desc: "Protect your brand name", to: "/ip/trademark" },
        { title: "Copyright Filing", desc: "Protect creative work", to: "/ip/copyright" },
        { title: "Patent Filing", desc: "Secure your invention", to: "/ip/patent" },
        { title: "IP Search", desc: "Check availability", to: "/ip/search" },
        { title: "IP Renewal", desc: "Maintain protection", to: "/ip/renewal" },
        { title: "IP Consulting", desc: "Expert advice", to: "/ip/consult" },
        { title: "Domain Protection", desc: "Digital assets security", to: "/ip/domain" },
        { title: "Design Registration", desc: "Aesthetic protection", to: "/ip/design" },
        { title: "Logo Design", desc: "Professional identity", to: "/servicehub/logo" },
        { title: "Brand Audit", desc: "Review services", to: "/ip/audit" },
    ],
    "Company Change": [
        { title: "Change Registered Office", desc: "Update address", to: "/company/address" },
        { title: "Change Directors", desc: "Add/Remove Directors", to: "/company/directors" },
        { title: "Change Name", desc: "Company name change", to: "/company/name" },
        { title: "Increase Capital", desc: "Authorized share capital", to: "/company/capital" },
        { title: "Convert Company", desc: "Pvt to LLP conversion", to: "/company/convert" },
    ],
    "Taxation & Compliance": [
        { title: "GST Filing (Monthly)", desc: "GSTR-3B/1 compliance", to: "/compliance/gst-filing" },
        { title: "TDS Filing", desc: "Tax deducted at source", to: "/compliance/tds" },
        { title: "Annual Compliance", desc: "ROC and ITR", to: "/compliance/annual" },
        { title: "Tax Audit", desc: "Audit services", to: "/compliance/audit" },
    ],
    "New Business/Closure": [
        { title: "Sole Proprietorship", desc: "Easiest business type", to: "/newbiz/sole" },
        { title: "One Person Company", desc: "For solo entrepreneurs", to: "/newbiz/opc" },
        { title: "Company Dissolution", desc: "Close your business", to: "/closure/company" },
        { title: "LLP Closure", desc: "Winding up services", to: "/closure/llp" },
    ],
};
const defaultTab = "Licenses/Registrations";
const tabKeys = Object.keys(tabData);

// Static data for the two large promo cards
const largeServiceCards = [
    {
        title: "Trademark Registration",
        desc: "Legal Protection For Your Brand Indemnity",
        to: "/licenses/trademark",
        bgColor: "bg-[#5299F4]",
    },
    {
        title: "GST Registration",
        desc: "Starts From Rs749 Rs499 - Limited Offer!",
        to: "/compliances/gst",
        bgColor: "bg-[#003366]",
    },
];

// ===========================================
// UTILITY COMPONENTS (Defined internally)
// ===========================================

// --- 1. Large Service Card ---
const ServiceCardLarge = ({ title, desc, to, bgColor }) => (
    <a
        href={to}
        className={`flex-1 min-h-[65px] ${bgColor} rounded-xl transition-transform transform hover:scale-[1.01] shadow-lg`}
    >
        <div className="flex items-center p-4">
            <div>
                <div className="text-white font-semibold text-lg">{title}</div>
                <div className="text-xs text-opacity-90 text-white mt-1">{desc}</div>
            </div>
            {/* Arrow Icon */}
            <div className="ml-auto flex items-center justify-center">
                <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </div>
        </div>
    </a>
);

// --- 2. Small Compliance Card ---
const ComplianceCardSmall = ({ title, desc, to }) => (
    <a
        href={to}
        className="block bg-white border border-[#94C8FA] rounded-xl p-4 transition-transform transform hover:scale-[1.03] hover:shadow-lg shadow-md"
    >
        <div className="w-10 h-10 bg-[#E5F7F7] rounded-lg mb-3 flex items-center justify-center">
            {/* Placeholder Icon */}
            <svg
                className="w-5 h-5 text-[#5FA1F9]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        </div>
        <div className="font-semibold text-gray-800 text-sm">{title}</div>
        <div className="text-xs text-[#515554] mt-1 line-clamp-2">{desc}</div>
        <div className="mt-3 text-xs text-[#5FA1F9] font-bold hover:text-[#2E96FF] transition-colors">
            View Details
        </div>
    </a>
);


// ===========================================
// MAIN COMPONENT: ServicesHub
// ===========================================

export default function ServicesHub() {
    const [activeTab, setActiveTab] = useState(defaultTab); 

    // Calculation for the grid layout placeholders
    const placeholdersCount = Math.max(
        0,
        10 - (tabData[activeTab] ? tabData[activeTab].length : 0),
    );

    return (
        <div className="font-[Inter]">
            <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
                
                {/* Large Service Cards Section */}
                <div className="flex flex-col md:flex-row gap-6 mb-8">
                    {largeServiceCards.map((card, index) => (
                        <ServiceCardLarge key={index} {...card} />
                    ))}
                </div>

                {/* Tab Navigation */}
                <nav className="flex flex-wrap border-b border-gray-200 mb-6 -mx-6 px-6 pt-4">
                    {tabKeys.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`py-3 px-4 md:px-6 text-sm md:text-base font-medium transition-colors border-b-2
                                ${
                                    activeTab === tab
                                        ? "text-[#2E96FF] border-[#2E96FF] font-semibold"
                                        : "text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* Small Card Grid (Content based on activeTab) */}
                <div className="mt-6">
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                        {(tabData[activeTab] || []).map((service, i) => (
                            <ComplianceCardSmall key={i} {...service} />
                        ))}

                        {/* Fill remaining slots with empty cards for consistent layout */}
                        {Array.from({ length: placeholdersCount }).map((_, i) => (
                            <div key={`placeholder-${i}`} className="hidden lg:block" />
                        ))}
                    </div>
                </div>

                {/* NOTE: Payments and CRM sections have been removed to focus only on service display. */}
                <div className="mt-10 border-t pt-8">
                    <div className="flex justify-end gap-4">
                        <a
                            href="/callback/general"
                            className="inline-flex justify-center items-center border border-gray-400 text-gray-700 font-medium py-2.5 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Request A Callback
                        </a>
                        <a
                            href="/callback/expert"
                            className="inline-flex justify-center items-center border border-gray-400 text-gray-700 font-medium py-2.5 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
                        >
                            Request A Callback
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
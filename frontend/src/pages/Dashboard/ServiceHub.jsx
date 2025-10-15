import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ===========================================
// STATIC DATA (No changes needed here)
// ===========================================

const tabData = {
    "Licenses/Registrations": {
        "Business Essentials": [
            { title: "GST Registration", desc: "Starts from ₹749₹499", to: "/compliances/gst" },
            { title: "MSME Registration", desc: "Starts from ₹699", to: "/licenses/msme" },
            { title: "Food License", desc: "Contact Expert to Get Price", to: "/licenses/fssai" },
            { title: "Digital Signature Certificate", desc: "Starts from ₹847", to: "/licenses/dsc" },
            { title: "Trade License", desc: "Starts from ₹1499₹999", to: "/licenses/trade" }
        ],
        "Labour Compliance": [
            { title: "PF/ESI Registration", desc: "Starts from ₹249", to: "/compliances/pf-esi" },
            { title: "Professional Tax Registration", desc: "Starts from ₹2999₹2699", to: "/compliances/professional-tax" },
            { title: "Shops & Establishment License", desc: "Starts from ₹1999", to: "/licenses/shop" }
        ],
        "Export Business": [
            { title: "Import Export Code Registration (IEC)", desc: "Starts from ₹249", to: "/licenses/iec" },
            { title: "AD Code Registration", desc: "Contact Expert to Get Price", to: "/licenses/adcode" },
            { title: "APEDA Registration", desc: "Starts from ₹1499₹999", to: "/licenses/apeda" }
        ],
        "Quality & Standards": [
            { title: "ISO Certification", desc: "Contact Expert to Get Price", to: "/licenses/iso" },
            { title: "Hallmark Registration", desc: "Starts from ₹1499₹999", to: "/licenses/hallmark" }
        ]
    },
    "Trademark/IP": {
        "Trademark": [
            { title: "Trademark Registration", desc: "Starts from ₹1499₹1349", to: "/ip/trademark-registration" },
            { title: "Respond to Trademark Objection", desc: "Starts from ₹2999", to: "/ip/trademark-objection" },
            { title: "Trademark Hearing Service", desc: "Starts from ₹1999₹1499", to: "/ip/trademark-hearing" },
            { title: "Renewal of Trademark", desc: "Starts from ₹1499₹999", to: "/ip/trademark-renewal" },
            { title: "International Trademark", desc: "Starts from ₹1499₹999", to: "/ip/international-trademark" }
        ],
        "Copyright": [
            { title: "Copyright Music", desc: "Starts from ₹499", to: "/ip/copyright-music" }
        ],
        "Patent": [
            { title: "Patent Search", desc: "Starts from ₹1999", to: "/ip/patent-search" },
            { title: "Provisional Patent Application", desc: "Contact Expert to Get Price", to: "/ip/provisional-patent" },
            { title: "Patent Registration", desc: "Starts from ₹5999", to: "/ip/patent-registration" }
        ],
        "Infringement": [
            { title: "Patent Infringement", desc: "Starts from ₹1499₹999", to: "/ip/patent-infringement" }
        ]
    },
    "Company Change": {
        "Company Name/Management": [
            { title: "Change the Name of Your Company", desc: "Contact Expert to Get Price", to: "/company/change-name" },
            { title: "Change the Objectives of Your Business", desc: "Contact Expert to Get Price", to: "/company/change-objectives" },
            { title: "Appointment of a Director/Partner", desc: "Contact Expert to Get Price", to: "/company/appoint-director" },
            { title: "Removal of a Director/Partner", desc: "Contact Expert to Get Price", to: "/company/remove-director" },
            { title: "Change the Official Address of Your Company (Within the City)", desc: "Contact Expert to Get Price", to: "/company/change-address-city" },
            { title: "Change the Official Address of Your Company (From One State to Another State)", desc: "Contact Expert to Get Price", to: "/company/change-address-state" }
        ],
        "Capital & Share Services": [
            { title: "Transfer of Shares", desc: "Contact Expert to Get Price", to: "/company/transfer-shares" },
            { title: "Changing the Authorized Capital of your Company", desc: "Contact Expert to Get Price", to: "/company/change-capital" }
        ],
        "Business Upgrades": [
            { title: "Convert your Partnership into a Private Limited company", desc: "Contact Expert to Get Price", to: "/company/partnership-to-private" },
            { title: "Convert your LLP into a Private Limited Company", desc: "Contact Expert to Get Price", to: "/company/llp-to-private" },
            { title: "Convert your Sole Proprietorship into a Private Limited Company", desc: "Contact Expert to Get Price", to: "/company/sole-to-private" }
        ]
    },
    "Taxation & Compliance": {
        "Direct & Indirect Tax": [
            { title: "Income Tax Return Filing (ITR)", desc: "Contact Expert to Get Price", to: "/tax/itr-filing" },
            { title: "TDS Return Filing", desc: "Contact Expert to Get Price", to: "/tax/tds-filing" },
            { title: "GSTR Filings", desc: "Starts from ₹3999₹2999", to: "/tax/gstr-filings" }
        ],
        "RoC/Secretarial Compliance": [
            { title: "Annual Compliance for PVT", desc: "Contact Expert to Get Price", to: "/roc/annual-pvt" },
            { title: "Annual Compliance for LLP", desc: "Contact Expert to Get Price", to: "/roc/annual-llp" },
            { title: "Director KYC(DIR-3) Filing", desc: "Contact Expert to Get Price", to: "/roc/dir-3-filing" }
        ],
        "Labour Compliance": [
            { title: "PF & ESI Filings", desc: "Contact Expert to Get Price", to: "/labour/pf-esi" },
            { title: "Professional Tax Filings", desc: "Contact Expert to Get Price", to: "/labour/professional-tax" },
            { title: "Payroll", desc: "Contact Expert to Get Price", to: "/labour/payroll" }
        ],
        "Accounting & Financial Management": [
            { title: "Audit of a Company", desc: "Contact Expert to Get Price", to: "/accounting/audit" }
        ],
        "Business Expansion": [
            { title: "Due Diligence", desc: "Starts from ₹1499₹999", to: "/business/due-diligence" },
            { title: "Pitch Deck Service", desc: "Starts from ₹999", to: "/business/pitch-deck" }
        ]
    },
    "New Business/Closure": {
        "Business Registration": [
            { title: "Private Limited Company Registration", desc: "Starts from ₹999", to: "/formation/private-ltd" },
            { title: "Limited Liability Partnership Registration", desc: "Starts from ₹1499", to: "/formation/llp" },
            { title: "Sole Proprietorship", desc: "Starts from ₹699", to: "/formation/sole-proprietorship" },
            { title: "One Person Company Registration", desc: "Starts from ₹999", to: "/formation/opc" },
            { title: "Partnership Firm Registration", desc: "Starts from ₹2499", to: "/formation/partnership" }
        ],
        "Foreign Incorporation": [
            { title: "US Incorporation", desc: "Starts from ₹1499₹999", to: "/formation/us-inc" },
            { title: "Dubai Incorporation", desc: "Starts from ₹1499₹999", to: "/formation/dubai-inc" },
            { title: "UK Incorporation", desc: "Starts from ₹1499₹999", to: "/formation/uk-inc" },
            { title: "Singapore Incorporation", desc: "Starts from ₹1499₹999", to: "/formation/singapore-inc" }
        ],
        "NGO": [
            { title: "Section 8 Registration", desc: "Starts from ₹999", to: "/formation/section8" },
            { title: "Trust Registration", desc: "Starts from ₹1999", to: "/formation/trust" }
        ],
        "Closure/Cancellation": [
            { title: "Company Closure Service", desc: "Starts from ₹1499₹999", to: "/closure/company-closure" },
            { title: "GST Cancellation Service", desc: "Contact Expert to Get Price", to: "/closure/gst-cancellation" }
        ]
    },
    "Agreements & Contracts": {
        "Agreements": [
            { title: "NDA", desc: "Starts from ₹1499₹999", to: "/legal/nda" },
            { title: "Master Service Agreement", desc: "Starts from ₹1499₹999", to: "/legal/msa" },
            { title: "Franchise Agreement", desc: "Starts from ₹1499₹999", to: "/legal/franchise" },
            { title: "Vendor Agreement", desc: "Contact Expert to Get Price", to: "/legal/vendor" },
            { title: "Joint Venture Agreement", desc: "Starts from ₹1499₹999", to: "/legal/joint-venture" },
            { title: "Founders Agreements", desc: "Starts from ₹1499₹999", to: "/legal/founders" },
            { title: "Consultancy Services Agreement", desc: "Contact Expert to Get Price", to: "/legal/consultancy" },
            { title: "Employment Agreement", desc: "Contact Expert to Get Price", to: "/legal/employment-agreement" }
        ],
        "Contracts": [
            { title: "Employment Contract", desc: "Contact Expert to Get Price", to: "/legal/employment-contract" },
            { title: "Service Contract", desc: "Contact Expert to Get Price", to: "/legal/service-contract" }
        ],
        "Notices": [
            { title: "Legal Notice", desc: "Contact Expert to Get Price", to: "/legal/legal-notice" },
            { title: "Cheque Bounce Notice", desc: "Contact Expert to Get Price", to: "/legal/cheque-bounce" },
            { title: "Recovery of Dues", desc: "Contact Expert to Get Price", to: "/legal/recovery-dues" }
        ],
        "Policies": [
            { title: "Terms of Service and Privacy Policy", desc: "Contact Expert to Get Price", to: "/legal/policies" }
        ]
    }
};

const defaultTab = "Licenses/Registrations";
const tabKeys = Object.keys(tabData);

// --- 2. Small Compliance Card (Ensures uniform height) ---
const ComplianceCardSmall = ({ title, desc, to }) => (
    <a
        href={to}
        // Key classes for height: 'flex-1' makes the card fill its flex container height,
        // 'flex-col' stacks content vertically, 'justify-start' aligns content to the top.
        className="block flex-1 flex flex-col justify-start bg-white border border-[#94C8FA] rounded-xl p-4 transition-transform transform hover:scale-[1.03] hover:shadow-xl shadow-md"
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
        {/* 'flex-grow' ensures the description section takes up all available vertical space,
           pushing the 'View Details' link to the bottom consistently. */}
        <div className="text-xs text-[#515554] mt-1 line-clamp-2 flex-grow">{desc}</div>
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
    const [activeSubTab, setActiveSubTab] = useState(
        Object.keys(tabData[defaultTab])[0] || ""
    );
    // Ref for the main tab navigation container
    const tabNavRef = useRef(null);
    // Ref for individual tab buttons
    const tabRefs = useRef({});

    // Effect to reset activeSubTab when activeTab changes
    useEffect(() => {
        const firstSubTab = Object.keys(tabData[activeTab])[0];
        if (firstSubTab) {
            setActiveSubTab(firstSubTab);
        } else {
            setActiveSubTab("");
        }
    }, [activeTab]);

    // Effect to auto-scroll the active tab into view
    useEffect(() => {
        const activeTabElement = tabRefs.current[activeTab];
        const navContainer = tabNavRef.current;

        if (activeTabElement && navContainer) {
            // Calculate the position to scroll to center the active tab
            const scrollPosition =
                activeTabElement.offsetLeft -
                navContainer.offsetWidth / 2 +
                activeTabElement.offsetWidth / 2;

            navContainer.scrollTo({
                left: scrollPosition,
                behavior: 'smooth'
            });
        }
    }, [activeTab]);


    const subTabs = Object.keys(tabData[activeTab] || {});
    const contentKey = `${activeTab}-${activeSubTab}`;
    const displayedData = tabData[activeTab]?.[activeSubTab] || [];
    const placeholdersCount = Math.max(0, 10 - displayedData.length);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div className="font-[Poppins] antialiased">
            <div className="bg-white rounded-xl  p-4 md:p-8">

                {/* 1. Main Tab Navigation (Responsive, Auto-scroll, Scrollbar Hidden) */}
                <nav
                    ref={tabNavRef}
                    className="flex overflow-x-auto whitespace-nowrap border-b border-gray-200 mb-6 -mx-4 md:-mx-8 px-4 md:px-8 pt-4"
                    style={{
                        scrollbarWidth: "none", // Firefox
                        msOverflowStyle: "none", // IE 10+
                    }}
                >
                    {tabKeys.map((tab) => (
                        <button
                            key={tab}
                            ref={el => tabRefs.current[tab] = el}
                            onClick={() => handleTabChange(tab)}
                            className={`flex-shrink-0 pb-3 px-4 md:px-6 text-sm md:text-base font-medium transition-colors border-b-2
                                ${activeTab === tab
                                    ? "text-[#2E96FF] border-[#2E96FF] font-semibold"
                                    : "text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>

                {/* 2. Sub Tabs */}
                {subTabs.length > 0 && (
                    <div className="flex flex-wrap gap-2 md:gap-3 mb-6">
                        {subTabs.map((sub) => (
                            <button
                                key={sub}
                                onClick={() => setActiveSubTab(sub)}
                                className={`py-2 px-3 md:px-4 text-xs sm:text-sm rounded-full transition-colors duration-200
                                    ${activeSubTab === sub
                                        ? "bg-[#2E96FF] text-white font-semibold shadow-md"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                {sub}
                            </button>
                        ))}
                    </div>
                )}

                {/* 3. Grid Content with Framer Motion Transition and Uniform Card Height */}
                <div className="mt-6">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={contentKey}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            // 'items-stretch' makes children fill the height of the tallest item in the row
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 items-stretch"
                        >
                            {Array.isArray(displayedData) && displayedData.length > 0 ? (
                                displayedData.map((service, i) => (
                                    <motion.div
                                        key={service.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, delay: i * 0.05 }}
                                        // 'flex' is crucial here, as it acts as the container that stretches
                                        // its child (ComplianceCardSmall) to the height dictated by 'items-stretch'.
                                        className="flex"
                                    >
                                        <ComplianceCardSmall {...service} />
                                    </motion.div>
                                ))
                            ) : (
                                <p className="text-gray-500 col-span-full">
                                    No services available for this category.
                                </p>
                            )}

                            {/* Placeholder divs for consistent grid layout */}
                            {Array.from({ length: placeholdersCount }).map((_, i) => (
                                <div key={`placeholder-${i}`} className="hidden lg:block" />
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
}
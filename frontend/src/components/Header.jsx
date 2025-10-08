import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Link, useLocation } from 'react-router-dom'
import {
  UserCheck,
  Briefcase,
  DollarSign,
  Heart,
  FileText,
  Clipboard,
  Globe,
  Award,
  Shield,
  BarChart,
  BookOpen,
  ShoppingCart,
  User,
  Menu,
  X,
} from 'lucide-react'

export default function Header({ user, logout }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to="/"
              className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-900 transition-colors hover:text-[#DB3269]"
              onClick={() => setMenuOpen(false)}
            >
              <span className="tracking-tight">
                <span className="text-[#DB3269]">C</span>alzone{' '}
                <span className="text-[#DB3269]">F</span>inancial{' '}
                <span className="text-[#DB3269]">S</span>ervice
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <HeaderNav currentPath={location.pathname} />
          </div>

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen((s) => !s)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="p-2 rounded-md border"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col bg-white p-4 sm:p-6 transition-transform duration-300 ease-in-out lg:hidden overflow-y-auto',
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{ pointerEvents: menuOpen ? 'auto' : 'none' }}
        aria-hidden={!menuOpen}
      >
        <div className="flex-grow" onClick={() => setMenuOpen(false)}>
          <HeaderNav currentPath={useLocation().pathname} />
        </div>
        <div className="mt-6 border-t pt-6"></div>
      </div>
    </>
  )
}

// ---------------- HeaderNav (Full Navigation Menu) ----------------
function HeaderNav({ currentPath }) {
  return (
    <NavigationMenu orientation="vertical" className="w-full">
      <NavigationMenuList className="flex flex-col space-y-2 lg:flex-row lg:space-y-0 lg:space-x-4">
        {/* Consult an Expert */}
        <NavItem
          title="Consult an Expert"
          menuWidth="md:w-[280px]"
          links={[
            ['Talk to a Lawyer', '/ConsultanExpert/talkToLawyer', <FileText className="w-4 h-4 mr-2" />],
            ['Talk to a Chartered Accountant', '/ConsultanExpert/talkToCA', <Clipboard className="w-4 h-4 mr-2" />],
            ['Talk to a Company Secretary', '/ConsultanExpert/talkToCS', <Briefcase className="w-4 h-4 mr-2" />],
            ['Talk to an IP/Trademark Lawyer', '/ConsultanExpert/talkToIP', <Shield className="w-4 h-4 mr-2" />],
          ]}
          currentPath={currentPath}
        />

        {/* Business Setup */}
        <NavItem
          title="Business Setup"
          menuWidth="md:w-[900px]"
          gridCols="md:grid-cols-3"
          linksGroups={[
            {
              title: 'Company Registration',
              links: [
                ['Private Limited Company', '/BusinessSetup/plc', <Briefcase className="w-4 h-4 mr-2" />],
                ['Limited Liability Partnership', '/BusinessSetup/llp', <Briefcase className="w-4 h-4 mr-2" />],
                ['One Person Company', '/BusinessSetup/opc', <Briefcase className="w-4 h-4 mr-2" />],
                ['Sole Proprietorship', '/BusinessSetup/sp', <Briefcase className="w-4 h-4 mr-2" />],
                ['Nidhi Company', '/BusinessSetup/nidhi', <Briefcase className="w-4 h-4 mr-2" />],
                ['Producer Company', '/BusinessSetup/producer', <Briefcase className="w-4 h-4 mr-2" />],
                ['Partnership Firm', '/BusinessSetup/partnership', <Briefcase className="w-4 h-4 mr-2" />],
                ['Startup India Registration', '/BusinessSetup/startup', <BarChart className="w-4 h-4 mr-2" />],
              ],
            },
            {
              title: 'International Business Setup',
              links: [
                ['US Incorporation', '/International/us', <Globe className="w-4 h-4 mr-2" />],
                ['Singapore Incorporation', '/International/singapore', <Globe className="w-4 h-4 mr-2" />],
                ['UK Incorporation', '/International/uk', <Globe className="w-4 h-4 mr-2" />],
                ['Netherlands Incorporation', '/International/netherlands', <Globe className="w-4 h-4 mr-2" />],
                ['Hong Kong Company', '/International/hong-kong', <Globe className="w-4 h-4 mr-2" />],
                ['Dubai Company', '/International/dubai', <Globe className="w-4 h-4 mr-2" />],
                ['International TM Registration', '/International/international-trademark', <Shield className="w-4 h-4 mr-2" />],
              ],
            },
            {
              title: 'Licenses & Registrations',
              links: [
                ['Digital Signature Award', '/Licenses/dsc', <Award className="w-4 h-4 mr-2" />],
                ['Udyam Registration', '/Licenses/udyam', <Award className="w-4 h-4 mr-2" />],
                ['MSME Registration', '/Licenses/msme', <Award className="w-4 h-4 mr-2" />],
                ['ISO Certification', '/Licenses/iso', <Award className="w-4 h-4 mr-2" />],
                ['FSSAI (Food License)', '/Licenses/fssai', <Heart className="w-4 h-4 mr-2" />],
                ['Import/Export Code (IEC)', '/Licenses/iec', <Globe className="w-4 h-4 mr-2" />],
                ['Spice Board Registration', '/Licenses/spice-board', <BookOpen className="w-4 h-4 mr-2" />],
                ['FIEO Registration', '/Licenses/fieo', <BookOpen className="w-4 h-4 mr-2" />],
                ['Legal Metrology', '/Licenses/legal-metrology', <Clipboard className="w-4 h-4 mr-2" />],
                ['Hallmark Registration', '/Licenses/hallmark', <Shield className="w-4 h-4 mr-2" />],
                ['BIS Registration', '/Licenses/bis', <Shield className="w-4 h-4 mr-2" />],
                ['Liquor License', '/Licenses/liquor-license', <Heart className="w-4 h-4 mr-2" />],
                ['CLRA Registration & Licensing', '/Licenses/clra', <FileText className="w-4 h-4 mr-2" />],
                ['AD Code Registration', '/Licenses/ad-code', <FileText className="w-4 h-4 mr-2" />],
                ['IRDAI Registration', '/Licenses/irdai', <Shield className="w-4 h-4 mr-2" />],
                ['Drug & Cosmetic License', '/Licenses/drug-cosmetic', <Heart className="w-4 h-4 mr-2" />],
              ],
            },
          ]}
          currentPath={currentPath}
        />

        {/* Fundraising */}
        <NavItem
          title="Fundraising"
          menuWidth="md:w-[260px]"
          links={[
            ['Fundraising', '/Fundraising', <DollarSign className="w-4 h-4 mr-2" />],
            ['Pitch Deck', '/Fundraising/pitch-deck', <BarChart className="w-4 h-4 mr-2" />],
            ['Business Loan', '/Fundraising/business-loan', <DollarSign className="w-4 h-4 mr-2" />],
            ['DPR Service', '/Fundraising/dpr', <FileText className="w-4 h-4 mr-2" />],
          ]}
          currentPath={currentPath}
        />

        {/* NGO */}
        <NavItem
          title="NGO"
          menuWidth="md:w-[700px]"
          gridCols="md:grid-cols-2"
          linksGroups={[
            {
              title: 'NGO Registration',
              links: [
                ['NGO', '/NGO', <Heart className="w-4 h-4 mr-2" />],
                ['Section 8 Company', '/NGO/section-8', <Heart className="w-4 h-4 mr-2" />],
                ['Trust Registration', '/NGO/trust', <Clipboard className="w-4 h-4 mr-2" />],
                ['Society Registration', '/NGO/society', <Clipboard className="w-4 h-4 mr-2" />],
              ],
            },
            {
              title: 'NGO Compliance',
              links: [
                ['NGO Compliance', '/NGO/compliance', <FileText className="w-4 h-4 mr-2" />],
                ['Section 8 Compliance', '/NGO/compliance-section-8', <FileText className="w-4 h-4 mr-2" />],
                ['CSR-1 Filing', '/NGO/csr1', <FileText className="w-4 h-4 mr-2" />],
                ['Sec.80G & Sec.12A', '/NGO/80g-12a', <Award className="w-4 h-4 mr-2" />],
                ['Darpan Registration', '/NGO/darpan', <Award className="w-4 h-4 mr-2" />],
                ['FCRA Registration', '/NGO/fcra', <Award className="w-4 h-4 mr-2" />],
              ],
            },
          ]}
          currentPath={currentPath}
        />
      </NavigationMenuList>
    </NavigationMenu>
  )
}

// ---------------- NavItem ----------------
function NavItem({
  title,
  icon,
  links,
  linksGroups,
  menuWidth = 'md:w-[300px]',
  gridCols = 'md:grid-cols-1',
  currentPath,
}) {
  return (
    <NavigationMenuItem className="w-full">
      <NavigationMenuTrigger className="w-full flex items-center text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-md px-3 py-2 transition-colors">
        {icon} {title}
      </NavigationMenuTrigger>

      <NavigationMenuContent>
        {links && (
          <div className={cn('w-full p-4 bg-white shadow-lg rounded-md', menuWidth)}>
            <MenuGroup title={title} links={links} currentPath={currentPath} />
          </div>
        )}
        {linksGroups && (
          <div className={cn('grid w-full gap-6 p-4 bg-white shadow-lg rounded-md', menuWidth, gridCols)}>
            {linksGroups.map((group) => (
              <MenuGroup key={group.title} title={group.title} links={group.links} currentPath={currentPath} />
            ))}
          </div>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  )
}

// ---------------- MenuGroup ----------------
function MenuGroup({ title, links, currentPath }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold text-gray-900">{title}</p>
      <ul className="space-y-1 overflow-y-auto" style={{ maxHeight: '60vh' }}>
        {links.map(([label, href, icon]) => (
          <li key={label}>
            <NavigationMenuLink asChild>
              <Link
                to={href}
                className={cn(
                  'flex items-center rounded-md px-2 py-1 text-gray-600 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900',
                  currentPath === href && 'bg-gray-100 font-medium text-gray-900'
                )}
              >
                {icon && <span className="mr-2">{icon}</span>}
                {label}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>
    </div>
  )
}

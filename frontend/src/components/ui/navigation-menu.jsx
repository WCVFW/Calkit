import React, { createContext, useContext, useState } from 'react'

const NavItemContext = createContext(null)

export function NavigationMenu({ children, className, orientation = 'horizontal' }) {
  return (
    <nav className={className} aria-label="Primary">
      {children}
    </nav>
  )
}

export function NavigationMenuList({ children, className }) {
  return <ul className={className}>{children}</ul>
}

export function NavigationMenuItem({ children, className }) {
  const [open, setOpen] = useState(false)
  return (
    <li className={className}>
      <NavItemContext.Provider value={{ open, setOpen }}>{children}</NavItemContext.Provider>
    </li>
  )
}

export function NavigationMenuTrigger({ children, className }) {
  const ctx = useContext(NavItemContext)
  if (!ctx) return children
  const { open, setOpen } = ctx
  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={(e) => {
        e.stopPropagation()
        setOpen(!open)
      }}
      className={className}
    >
      {children}
    </button>
  )
}

export function NavigationMenuContent({ children, className }) {
  const ctx = useContext(NavItemContext)
  if (!ctx) return null
  const { open, setOpen } = ctx
  return (
    <div
      className={className}
      style={{ display: open ? 'block' : 'none' }}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </div>
  )
}

export function NavigationMenuLink({ children, asChild }) {
  // asChild prop used by original component; here we simply render children
  return <div>{children}</div>
}

export default NavigationMenu

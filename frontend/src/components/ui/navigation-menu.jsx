import React, { createContext, useContext, useState } from 'react';

const NavItemContext = createContext(null);

export function NavigationMenu({ children, className, orientation = 'horizontal' }) {
  return (
    <nav className={className} aria-label="Primary Navigation">
      {children}
    </nav>
  );
}

export function NavigationMenuList({ children, className }) {
  return <ul className={className}>{children}</ul>;
}

export function NavigationMenuItem({ children, className }) {
  const [open, setOpen] = useState(false);
  return (
    <li className={className}>
      <NavItemContext.Provider value={{ open, setOpen }}>{children}</NavItemContext.Provider>
    </li>
  );
}

export function NavigationMenuTrigger({ children, className }) {
  const ctx = useContext(NavItemContext);
  if (!ctx) return children;
  const { open, setOpen } = ctx;

  return (
    <button
      type="button"
      aria-expanded={open}
      onClick={(e) => {
        // Toggle menu on click
        e.stopPropagation();
        setOpen(!open);
      }}
      className={className}
    >
      {children}
    </button>
  );
}

export function NavigationMenuContent({ children, className }) {
  const ctx = useContext(NavItemContext);
  if (!ctx) return null;
  const { open, setOpen } = ctx;

  return (
    <div
      className={className}
      // Uses inline style to control visibility based on the state
      style={{ display: open ? 'block' : 'none' }}
      // Key for persistence: only closes when mouse leaves the content area
      onMouseLeave={() => setOpen(false)}
    >
      {children}
    </div>
  );
}

export function NavigationMenuLink({ children, asChild }) {
  return <>{children}</>;
}

export default NavigationMenu;
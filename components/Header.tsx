"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const productLinks = [
  { href: "/products/spices", label: "🌶 Spices" },
  { href: "/products/paper-packaging", label: "📦 Paper Packaging" },
  { href: "/products/chemicals", label: "⚗️ Chemicals" },
];

const mainLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/export-process", label: "Export Process" },
  { href: "/certifications", label: "Certifications" },
  { href: "/contact", label: "Contact" },
];

const logoSrc = "/Nexus Global Exim Logo_05.png";

function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link href="/" onClick={onClick} aria-label="Nexus Global Exim Home">
      <Image
        src={logoSrc}
        alt="Nexus Global Exim"
        width={240}
        height={58}
        priority
        sizes="(max-width: 900px) 180px, 240px"
        style={{ height: "58px", width: "auto", maxWidth: "240px", objectFit: "contain" }}
      />
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <header className="site-header">
        <div className="nav-logo">
          <Logo onClick={closeMenu} />
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          {mainLinks.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}

          <div className="nav-dd">
            <span>Products ▾</span>
            <div className="dd-panel">
              {productLinks.map((item) => (
                <Link key={item.href} href={item.href}>{item.label}</Link>
              ))}
            </div>
          </div>

          {mainLinks.slice(2).map((item) => (
            <Link key={item.href} href={item.href}>{item.label}</Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="nav-cta" href="/request-quote">Request Quote</Link>
          <button
            className="nav-menu-btn"
            type="button"
            aria-label="Open navigation menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >☰</button>
        </div>
      </header>

      {open && (
        <div className="mobile-nav-overlay" onClick={closeMenu}>
          <aside className="mobile-nav-panel" aria-label="Mobile navigation" onClick={(event) => event.stopPropagation()}>
            <div className="mobile-nav-head">
              <div className="nav-logo"><Logo onClick={closeMenu} /></div>
              <button className="mob-close" type="button" aria-label="Close navigation menu" onClick={closeMenu}>×</button>
            </div>

            <div className="mob-links">
              {mainLinks.slice(0, 2).map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
              ))}

              <div className="mobile-product-group">
                <div className="mobile-group-label">Products</div>
                {productLinks.map((item) => (
                  <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
                ))}
              </div>

              {mainLinks.slice(2).map((item) => (
                <Link key={item.href} href={item.href} onClick={closeMenu}>{item.label}</Link>
              ))}

              <Link className="mobile-quote-btn" href="/request-quote" onClick={closeMenu}>Request Quote</Link>
            </div>
          </aside>
        </div>
      )}
    </>
  );
}

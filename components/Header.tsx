import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <Link className="nav-logo" href="/">Nexus <span>Global</span> Exim</Link>
      <nav className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/about">About Us</Link>
        <div className="nav-dd">
          <span>Products ▾</span>
          <div className="dd-panel">
            <Link href="/products/spices">🌶 Spices</Link>
            <Link href="/products/paper-packaging">📦 Paper Packaging</Link>
            <Link href="/products/chemicals">⚗️ Chemicals</Link>
          </div>
        </div>
        <Link href="/export-process">Export Process</Link>
        <Link href="/certifications">Certifications</Link>
        <Link href="/contact">Contact</Link>
      </nav>
      <Link className="nav-cta" href="/request-quote">Request Quote</Link>
    </header>
  );
}
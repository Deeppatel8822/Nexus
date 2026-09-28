import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="foot-grid">
        <div>
          <div className="foot-logo">Nexus <span>Global</span> Exim</div>
          <p className="foot-desc">Trusted Indian exporter of spices, packaging, and chemicals. Ahmedabad, Gujarat.</p>
        </div>
        <div className="foot-col">
          <h4>Products</h4>
          <Link href="/products/spices">Spices</Link>
          <Link href="/products/paper-packaging">Packaging</Link>
          <Link href="/products/chemicals">Chemicals</Link>
        </div>
        <div className="foot-col">
          <h4>Company</h4>
          <Link href="/about">About Us</Link>
          <Link href="/export-process">Export Process</Link>
          <Link href="/certifications">Certifications</Link>
        </div>
        <div className="foot-col">
          <h4>Contact</h4>
          <a href="tel:+918758988822">+91 8758988822</a>
          <a href="mailto:info@nexusglobalexim.in">info@nexusglobalexim.in</a>
        </div>
      </div>
      <div className="foot-bottom">
        <span>© 2025 Nexus Global Exim. All rights reserved.</span>
        <span>Ahmedabad, Gujarat, India</span>
      </div>
    </footer>
  );
}
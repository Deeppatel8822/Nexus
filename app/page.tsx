import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <section className="hero">
          <div className="hero-inner">
            <div className="hero-tag">🇮🇳 Ahmedabad, India · Exporting to 30+ Countries</div>
            <h1>India&apos;s trusted<br/>exporter of<br/><em>spices, packaging<br/>&amp; chemicals</em></h1>
            <p className="hero-sub">Nexus Global Exim connects international buyers with certified Indian products — competitive CIF/FOB pricing, complete documentation, and a quote in 24 hours.</p>
            <div className="hero-actions">
              <Link className="btn-saffron" href="/request-quote">Send an enquiry</Link>
              <Link className="btn-ghost-white" href="/products">View products</Link>
            </div>
          </div>
        </section>
        <section className="sec sec-white">
          <div className="sec-hdr"><div className="eyebrow">What we export</div><h2 className="sec-title">Three industries. One reliable partner.</h2><p className="sec-desc">We focus on three product categories — giving buyers consistent quality and competitive pricing on every order, shipment after shipment.</p></div>
          <div className="ind-grid">
            <Link className="ind-card" href="/products/spices"><div className="ind-head sp"><div className="ind-name">Indian Spices</div><p className="ind-desc">Sourced from Rajasthan &amp; Gujarat farms. Cumin, cardamom, turmeric, pepper, chilli and more.</p></div></Link>
            <Link className="ind-card" href="/products/paper-packaging"><div className="ind-head pk"><div className="ind-name">Paper Packaging</div><p className="ind-desc">Kraft paper, kraft liner and related packaging materials for international buyers.</p></div></Link>
            <Link className="ind-card" href="/products/chemicals"><div className="ind-head ch"><div className="ind-name">Chemical Products</div><p className="ind-desc">Industrial, agrochemical and pharma-related products from India.</p></div></Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
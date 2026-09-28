import Header from "../../components/Header";
import Footer from "../../components/Footer";
import QuoteRequestForm from "../../components/QuoteRequestForm";

export const metadata = {
  title: "Request a Quote | Nexus Global Exim",
  description:
    "Request an export quotation from Nexus Global Exim by selecting your industry and product.",
};

export default function QuotePage() {
  return (
    <>
      <Header />
      <main className="page-shell">
        <div className="bc">
          <a href="/">Home</a> › <span>Request Quote</span>
        </div>

        <section className="sec sec-white">
          <div className="sec-hdr">
            <div className="eyebrow">Get a quote</div>
            <h1 className="sec-title">Request a Quote</h1>
            <p className="sec-desc">
              Select your industry first, then choose the product you want a
              quotation for. We will respond with pricing and availability.
            </p>
          </div>

          <div className="enq-wrap">
            <div className="enq-left">
              <div className="eyebrow">Product-wise quotation</div>
              <h2>Tell us what you want to source from India</h2>
              <p>
                Choose an industry and the product list will automatically
                change to show only relevant products.
              </p>

              <div className="doc-box">
                <strong>How it works</strong>
                ✓ Select your industry
                <br />
                ✓ Select the required product
                <br />
                ✓ Add quantity, destination and trade terms
                <br />
                ✓ Submit your enquiry
                <br />
                ✓ Receive a product-specific quotation
              </div>
            </div>

            <QuoteRequestForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

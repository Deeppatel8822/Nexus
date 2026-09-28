import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "Thank You | Nexus Global Exim",
  description: "Thank you for contacting Nexus Global Exim.",
};

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="sec sec-white" style={{minHeight:"60vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
        <div style={{maxWidth:620,textAlign:"center"}}>
          <div className="eyebrow gold">Enquiry received</div>
          <h1 className="sec-title" style={{marginBottom:16}}>Thank you for your enquiry.</h1>
          <p className="sec-desc" style={{margin:"0 auto 28px"}}>
            Your enquiry has been sent to Nexus Global Exim. We will review your requirements and get back to you.
          </p>
          <Link className="nav-cta" href="/">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

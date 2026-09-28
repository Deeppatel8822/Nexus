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
        <div style={{maxWidth:680,textAlign:"center"}}>
          <div className="eyebrow gold">Enquiry received</div>
          <h1 className="sec-title" style={{marginBottom:16}}>Thank you for your enquiry!</h1>
          <p className="sec-desc" style={{margin:"0 auto 12px"}}>
            Your enquiry has been submitted successfully.
          </p>
          <p className="sec-desc" style={{margin:"0 auto 28px"}}>
            Please check your email for the quotation from Nexus Global Exim within 24 hours.
          </p>
          <Link className="nav-cta" href="/">Back to Home</Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

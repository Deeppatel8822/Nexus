import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EnquiryForm from "../../components/EnquiryForm";

export const metadata = {
  title: "Contact Us | Nexus Global Exim",
  description: "Contact Nexus Global Exim for export enquiries, product requirements, CIF and FOB quotations.",
};

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <div className="bc"><a href="/">Home</a> › <span>Contact Us</span></div>
        <div className="sec sec-white">
          <div className="enq-wrap">
            <div className="enq-left">
              <div className="eyebrow gold">Get in touch</div>
              <h2>Request a quote or send an enquiry</h2>
              <p>Send your product requirements and receive a CIF or FOB price within 24 hours. Sample shipments available for first-time buyers.</p>
              <div className="contact-block" style={{ marginTop: 24 }}>
                <div className="c-row"><div className="c-ico gd">👤</div><div><strong>Deep Patel</strong><br/><span style={{fontSize:12,color:"var(--muted)"}}>Owner & Export Manager</span></div></div>
                <div className="c-row"><div className="c-ico sp">📞</div><div><strong>+91 8758988822</strong><br/><span style={{fontSize:12,color:"var(--muted)"}}>Call or WhatsApp, Mon–Sat, 9am–7pm IST</span></div></div>
                <div className="c-row"><div className="c-ico pk">✉️</div><div><strong>info@nexusglobalexim.in</strong><br/><span style={{fontSize:12,color:"var(--muted)"}}>Reply within 4 business hours</span></div></div>
                <div className="c-row"><div className="c-ico ch">🌐</div><div><strong>www.nexusglobalexim.in</strong></div></div>
                <div className="c-row"><div className="c-ico gd">📍</div><div><strong>305, Shreeji Plaza, S.P. Ring Road</strong><br/><span style={{fontSize:12,color:"var(--muted)"}}>Naroda, Ahmedabad — 382330, Gujarat, India</span></div></div>
              </div>
              <div style={{marginTop:20,background:"var(--bg)",border:"1px solid var(--border)",borderRadius:10,padding:18}}>
                <div className="eyebrow" style={{marginBottom:12}}>Follow us</div>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <a href="https://www.linkedin.com/company/nexusglobalexim" target="_blank" rel="noreferrer" style={{background:"#0077B5",color:"#fff",padding:"8px 16px",borderRadius:"var(--r)",fontSize:13,fontWeight:500}}>LinkedIn</a>
                  <a href="https://www.instagram.com/nexusglobalexim" target="_blank" rel="noreferrer" style={{background:"#E1306C",color:"#fff",padding:"8px 16px",borderRadius:"var(--r)",fontSize:13,fontWeight:500}}>Instagram</a>
                  <a href="https://www.facebook.com/nexusglobalexim" target="_blank" rel="noreferrer" style={{background:"#1877F2",color:"#fff",padding:"8px 16px",borderRadius:"var(--r)",fontSize:13,fontWeight:500}}>Facebook</a>
                </div>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

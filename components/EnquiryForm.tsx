"use client";

import { useState } from "react";

type Props = {
  product?: string;
  tone?: "sp" | "pk" | "ch" | "gd";
};

export default function EnquiryForm({ product = "", tone = "gd" }: Props) {
  const [sending, setSending] = useState(false);

  function sendWhatsApp() {
    const form = document.querySelector("#enquiry-form") as HTMLFormElement | null;
    if (!form) return;
    const data = Object.fromEntries(new FormData(form).entries());
    const message = [
      "Hello Nexus Global Exim,", "",
      `Name: ${data.name || ""}`,
      `Company: ${data.company || ""}`,
      `Country: ${data.country || ""}`,
      `Phone/WhatsApp: ${data.phone || ""}`,
      `Email: ${data.email || ""}`,
      `Product: ${data.product || ""}`,
      `Quantity: ${data.quantity || ""}`,
      `Incoterm: ${data.incoterm || ""}`,
      `Destination: ${data.destination || ""}`,
      `Requirements: ${data.message || ""}`,
    ].join("\n");

    window.open(
      `https://wa.me/918758988822?text=${encodeURIComponent(message)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <form
      id="enquiry-form"
      className="fcard"
      action="https://formsubmit.co/info@nexusglobalexim.in"
      method="POST"
      onSubmit={() => setSending(true)}
    >
      <h3>Send your enquiry</h3>

      <input type="hidden" name="_subject" value="New Website Enquiry | Nexus Global Exim" />
      <input type="hidden" name="_next" value="https://nexusglobalexim.in/thank-you" />
      <input type="hidden" name="_template" value="table" />

      <div className="f2">
        <div className="fr"><label>Full name</label><input name="name" required type="text" placeholder="John Smith" /></div>
        <div className="fr"><label>Company name</label><input name="company" type="text" placeholder="ABC Trading LLC" /></div>
      </div>

      <div className="f2">
        <div className="fr"><label>Country</label><input name="country" required type="text" placeholder="UAE, Germany, USA…" /></div>
        <div className="fr"><label>WhatsApp / Phone</label><input name="phone" type="text" placeholder="+971 50 000 0000" /></div>
      </div>

      <div className="fr"><label>Email address</label><input name="email" required type="email" placeholder="buyer@company.com" /></div>

      <div className="fr">
        <label>Product required</label>
        <select name="product" defaultValue={product}>
          <option value="">— Select a product —</option>
          <optgroup label="Spices">
            <option>Cumin Seeds</option><option>Green Cardamom</option><option>Turmeric</option><option>Black Pepper</option><option>Red Chilli</option><option>Coriander Seeds</option>
          </optgroup>
          <optgroup label="Paper Packaging"><option>Kraft Paper</option><option>Kraft Liner</option></optgroup>
          <optgroup label="Chemicals"><option>Caustic Soda Flakes</option><option>Soda Ash Dense</option><option>Agrochemicals</option><option>Pharma Chemicals</option></optgroup>
          <option>General enquiry</option>
        </select>
      </div>

      <div className="f2">
        <div className="fr"><label>Quantity required</label><input name="quantity" type="text" placeholder="e.g. 5 MT / month" /></div>
        <div className="fr"><label>Incoterm</label><select name="incoterm" defaultValue="CIF"><option>CIF</option><option>FOB</option><option>Not sure yet</option></select></div>
      </div>

      <div className="fr"><label>Destination port / country</label><input name="destination" type="text" placeholder="e.g. Jebel Ali, Dubai / UAE" /></div>
      <div className="fr"><label>Message / requirements</label><textarea name="message" placeholder="Packaging size, certifications needed, target price, order frequency, anything else…" /></div>

      <input name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="honeypot" />

      <button className={`fsub ${tone}`} type="submit" disabled={sending}>
        {sending ? "Sending…" : "Send enquiry — we reply in 24 hours"}
      </button>

      <button className="fsub-wa" type="button" onClick={sendWhatsApp}>💬 Send via WhatsApp instead</button>
      <p className="fnote">Your details are only used to respond to this enquiry. No spam.</p>
    </form>
  );
}

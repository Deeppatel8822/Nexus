"use client";

import { useMemo, useState } from "react";

const industryProducts: Record<string, string[]> = {
  Spices: [
    "Cumin Seeds",
    "Green Cardamom",
    "Black Pepper",
    "Turmeric",
    "Red Chilli",
    "Coriander Seeds",
    "Fennel Seeds",
    "Fenugreek Seeds",
    "Mustard Seeds",
    "Multiple / Mixed Spices",
  ],
  "Paper & Packaging": [
    "Kraft Paper",
    "Kraft Liner",
  ],
  Chemicals: [
    "Caustic Soda Flakes",
    "Soda Ash Dense",
    "Agrochemicals",
    "Pharma Chemicals",
    "Calcium Chloride",
    "Magnesium Sulphate",
    "Other Chemical",
  ],
  Other: [
    "Other Product / Requirement",
  ],
};

export default function QuoteRequestForm() {
  const [industry, setIndustry] = useState("");
  const [sending, setSending] = useState(false);

  const products = useMemo(
    () => (industry ? industryProducts[industry] ?? [] : []),
    [industry]
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setSending(true);
  }

  function sendWhatsApp() {
    const form = document.querySelector("#quote-request-form") as HTMLFormElement | null;
    if (!form) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const message = [
      "Hello Nexus Global Exim,",
      "",
      `Name: ${data.name || ""}`,
      `Company: ${data.company || ""}`,
      `Industry: ${data.industry || ""}`,
      `Product: ${data.product || ""}`,
      `Country: ${data.country || ""}`,
      `Phone/WhatsApp: ${data.phone || ""}`,
      `Email: ${data.email || ""}`,
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
      id="quote-request-form"
      className="fcard"
      action="https://formsubmit.co/info@nexusglobalexim.in"
      method="POST"
      onSubmit={handleSubmit}
    >
      <h3>Tell us what you need</h3>
      <p className="fnote" style={{ marginTop: -8 }}>
        First select your industry, then choose the relevant product.
      </p>

      <input
        type="hidden"
        name="_subject"
        value="New Website Quotation Enquiry | Nexus Global Exim"
      />
      <input type="hidden" name="_next" value="https://nexusglobalexim.in/thank-you" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_replyto" value="" id="quote-replyto" />

      <div className="f2">
        <div className="fr">
          <label>Full name</label>
          <input name="name" required type="text" placeholder="John Smith" />
        </div>
        <div className="fr">
          <label>Company name</label>
          <input name="company" type="text" placeholder="ABC Trading LLC" />
        </div>
      </div>

      <div className="f2">
        <div className="fr">
          <label>Industry</label>
          <select
            name="industry"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            required
          >
            <option value="">— Select an industry —</option>
            {Object.keys(industryProducts).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="fr">
          <label>Product required</label>
          <select name="product" required disabled={!industry} defaultValue="">
            <option value="">
              {industry ? "— Select a product —" : "— Select industry first —"}
            </option>
            {products.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="f2">
        <div className="fr">
          <label>Country</label>
          <input name="country" required type="text" placeholder="UAE, Germany, USA…" />
        </div>
        <div className="fr">
          <label>WhatsApp / Phone</label>
          <input name="phone" type="text" placeholder="+971 50 000 0000" />
        </div>
      </div>

      <div className="fr">
        <label>Email address</label>
        <input
          name="email"
          required
          type="email"
          placeholder="buyer@company.com"
          onChange={(e) => {
            const reply = document.getElementById("quote-replyto") as HTMLInputElement | null;
            if (reply) reply.value = e.target.value;
          }}
        />
      </div>

      <div className="f2">
        <div className="fr">
          <label>Quantity required</label>
          <input name="quantity" type="text" placeholder="e.g. 5 MT / month" />
        </div>
        <div className="fr">
          <label>Incoterm</label>
          <select name="incoterm" defaultValue="CIF">
            <option>CIF</option>
            <option>FOB</option>
            <option>Both</option>
            <option>Not sure yet</option>
          </select>
        </div>
      </div>

      <div className="fr">
        <label>Destination port / country</label>
        <input name="destination" type="text" placeholder="e.g. Jebel Ali, Dubai / UAE" />
      </div>

      <div className="fr">
        <label>Message / requirements</label>
        <textarea
          name="message"
          placeholder="Grade, specifications, packaging, certifications, target price, order frequency…"
        />
      </div>

      <input
        name="_honey"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="honeypot"
      />

      <button className="fsub gd" type="submit" disabled={sending}>
        {sending ? "Sending…" : "Request Quotation"}
      </button>

      <button className="fsub-wa" type="button" onClick={sendWhatsApp}>
        💬 Send via WhatsApp instead
      </button>

      <p className="fnote">
        Your enquiry goes directly to Nexus Global Exim. We reply within 24 hours.
      </p>
    </form>
  );
}

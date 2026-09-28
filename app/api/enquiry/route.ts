import { NextResponse } from "next/server";

const required = ["name", "country", "email", "product"];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.website) {
      return NextResponse.json({ ok: true });
    }

    for (const field of required) {
      if (!String(body[field] || "").trim()) {
        return NextResponse.json(
          { message: `Please enter your ${field}.` },
          { status: 400 }
        );
      }
    }

    const email = String(body.email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("RESEND_API_KEY is not configured.");
      return NextResponse.json(
        { message: "Email service is not configured yet. Please use WhatsApp for now." },
        { status: 503 }
      );
    }

    const lines = [
      "New enquiry from Nexus Global Exim website",
      "",
      `Name: ${body.name || ""}`,
      `Company: ${body.company || ""}`,
      `Country: ${body.country || ""}`,
      `Phone/WhatsApp: ${body.phone || ""}`,
      `Email: ${email}`,
      `Product: ${body.product || ""}`,
      `Quantity: ${body.quantity || ""}`,
      `Incoterm: ${body.incoterm || ""}`,
      `Destination: ${body.destination || ""}`,
      "",
      "Requirements:",
      body.message || "",
    ];

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.ENQUIRY_FROM_EMAIL || "Nexus Website <onboarding@resend.dev>",
        to: [process.env.ENQUIRY_TO_EMAIL || "info@nexusglobalexim.in"],
        reply_to: email,
        subject: `Website Enquiry: ${body.product}`,
        text: lines.join("\n"),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error("Resend error:", detail);
      return NextResponse.json(
        { message: "We could not send the enquiry right now. Please try WhatsApp." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry API error:", error);
    return NextResponse.json(
      { message: "Something went wrong. Please try again or use WhatsApp." },
      { status: 500 }
    );
  }
}

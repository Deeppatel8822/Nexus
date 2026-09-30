import type { Metadata } from "next";
import "./globals.css";
import LegacyNavigationBridge from "@/components/LegacyNavigationBridge";

const brandLogo = "/Nexus Global Exim Logo_05.png";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusglobalexim.in"),
  title: {
    default: "Nexus Global Exim | Indian Spices, Packaging & Chemicals Exporter",
    template: "%s | Nexus Global Exim"
  },
  description:
    "Nexus Global Exim is an Indian exporter of spices, paper packaging materials, and chemicals from Ahmedabad, Gujarat.",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    type: "website",
    siteName: "Nexus Global Exim",
    title: "Nexus Global Exim | Indian Spices, Packaging & Chemicals Exporter",
    description:
      "Indian exporter of spices, paper packaging materials, and chemicals from Ahmedabad, Gujarat.",
    url: "https://nexusglobalexim.in",
    images: [{ url: brandLogo, alt: "Nexus Global Exim" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Global Exim | Indian Spices, Packaging & Chemicals Exporter",
    description:
      "Indian exporter of spices, paper packaging materials, and chemicals from Ahmedabad, Gujarat.",
    images: [brandLogo],
  }
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://nexusglobalexim.in/#website",
  url: "https://nexusglobalexim.in",
  name: "Nexus Global Exim",
  alternateName: "Nexus Global Exim",
  publisher: { "@id": "https://nexusglobalexim.in/#organization" }
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://nexusglobalexim.in/#organization",
  name: "Nexus Global Exim",
  url: "https://nexusglobalexim.in",
  logo: "https://nexusglobalexim.in" + brandLogo,
  sameAs: [
    "https://www.linkedin.com/company/nexusglobalexim",
    "https://www.instagram.com/nexusglobalexim",
    "https://www.facebook.com/nexusglobalexim"
  ],
  email: "info@nexusglobalexim.in",
  telephone: "+91-8758988822",
  address: {
    "@type": "PostalAddress",
    streetAddress: "305, Shreeji Plaza, S.P. Ring Road, Naroda",
    addressLocality: "Ahmedabad",
    postalCode: "382330",
    addressRegion: "Gujarat",
    addressCountry: "IN"
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <LegacyNavigationBridge />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}

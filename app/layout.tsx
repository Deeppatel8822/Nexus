import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusglobalexim.in"),
  title: {
    default: "Nexus Global Exim | Indian Spices, Packaging & Chemicals Exporter",
    template: "%s | Nexus Global Exim"
  },
  description:
    "Nexus Global Exim is an Indian exporter of spices, paper packaging materials, and chemicals from Ahmedabad, Gujarat.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
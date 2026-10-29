import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE_CONFIG } from "@/config/site.config";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.brand.name} | Wohnungs- & Liegenschaftsreinigung Bern mit 100% Abnahmegarantie`,
  description: `${SITE_CONFIG.brand.tagline} Professionelle Umzugsreinigung mit Abnahmegarantie, Unterhaltspflege, Hauswartung und Fensterreinigung im Grossraum Bern. Schweizer Familienbetrieb.`,
  keywords: [
    "Reinigungsfirma Bern",
    "Umzugsreinigung Bern mit Abnahmegarantie",
    "Endreinigung Bern",
    "Hauswartung Bern",
    "Treppenhausreinigung Bern",
    "Wohnungsreinigung Bern Fixpreis",
    "Fensterreinigung Bern",
  ],
  authors: [{ name: SITE_CONFIG.brand.name }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo-icon.svg" }],
  },
  openGraph: {
    title: `${SITE_CONFIG.brand.name} – Makellos sauber. Punktgenau abgenommen.`,
    description: "Schweizer Premium-Reinigungsunternehmen in Bern. 100% Abnahmegarantie, Fixpreise & persönliche Übergabebegleitung.",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AURA Clean Bern - Schweizer Reinigungsunternehmen",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_CONFIG.brand.name,
    description: SITE_CONFIG.brand.subTagline,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.city,
      postalCode: SITE_CONFIG.contact.address.zip,
      addressRegion: SITE_CONFIG.contact.address.canton,
      addressCountry: "CH",
    },
    areaServed: SITE_CONFIG.regions,
    priceRange: "CHF 550 - 2500",
  };

  return (
    <html lang="de-CH" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/logo-icon.svg" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

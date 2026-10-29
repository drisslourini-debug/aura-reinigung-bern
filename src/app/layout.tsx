import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileActionDock } from "@/components/layout/MobileActionDock";
import { SITE_CONFIG } from "@/config/site.config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
  themeColor: "#0F172A",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aura-reinigung-bern.vercel.app"),
  title: {
    default: `${SITE_CONFIG.brand.name} | Wohnungs- & Liegenschaftsreinigung Bern mit 100% Abnahmegarantie`,
    template: `%s | ${SITE_CONFIG.brand.name}`,
  },
  description: `${SITE_CONFIG.brand.tagline} Professionelle Umzugsreinigung mit Abnahmegarantie, Unterhaltspflege, Hauswartung und Fensterreinigung im Grossraum Bern. Schweizer Familienbetrieb mit Fixpreisgarantie.`,
  keywords: [
    "Reinigungsfirma Bern",
    "Umzugsreinigung Bern mit Abnahmegarantie",
    "Endreinigung Bern",
    "Wohnungsreinigung Bern Fixpreis",
    "Hauswartung Bern",
    "Treppenhausreinigung Bern",
    "Fensterreinigung Bern",
    "Büroreinigung Bern",
    "Baureinigung Bern",
    "Wohnungsabgabe Bern",
  ],
  authors: [{ name: SITE_CONFIG.brand.name }],
  creator: SITE_CONFIG.brand.name,
  publisher: SITE_CONFIG.brand.name,
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/logo-icon.svg" }],
  },
  openGraph: {
    title: `${SITE_CONFIG.brand.name} – Makellos sauber. Punktgenau abgenommen.`,
    description: "Schweizer Premium-Reinigungsunternehmen in Bern. 100% Abnahmegarantie, Fixpreise & persönliche Übergabebegleitung vor Ort.",
    url: "https://aura-reinigung-bern.vercel.app",
    siteName: SITE_CONFIG.brand.name,
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "AURA Clean Bern - Schweizer Reinigungsunternehmen mit Abnahmegarantie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_CONFIG.brand.name} | Reinigungsfirma Bern`,
    description: "Schweizer Premium-Reinigungsunternehmen in Bern. 100% Abnahmegarantie & verbindliche Fixpreise.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CleaningService",
    "@id": "https://aura-reinigung-bern.vercel.app/#organization",
    name: SITE_CONFIG.brand.name,
    alternateName: "AURA Clean",
    description: SITE_CONFIG.brand.subTagline,
    url: "https://aura-reinigung-bern.vercel.app",
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    logo: "https://aura-reinigung-bern.vercel.app/images/logo-badge-3d.jpg",
    image: "https://aura-reinigung-bern.vercel.app/images/og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.city,
      postalCode: SITE_CONFIG.contact.address.zip,
      addressRegion: SITE_CONFIG.contact.address.canton,
      addressCountry: "CH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 46.948,
      longitude: 7.4474,
    },
    areaServed: SITE_CONFIG.regions.map((region) => ({
      "@type": "City",
      name: region,
    })),
    priceRange: "CHF 130 - 2450",
    currenciesAccepted: "CHF",
    paymentAccepted: "Rechnung, Banküberweisung, TWINT",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "48",
      bestRating: "5",
      worstRating: "1",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Reinigungsdienstleistungen Kanton Bern",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Umzugsreinigung mit 100% Abnahmegarantie",
            description: "Komplette Endreinigung inkl. Küche, Nasszellen, Fenster, Storen und persönlicher Begleitung bei der Wohnungsabnahme.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Liegenschaftsservice & Hauswartung",
            description: "Treppenhäuser, Waschküchen, Containerdienst, Umgebungsarbeiten und Winterdienst für Berner Liegenschaften.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Unterhaltsreinigung für Wohnungen & Häuser",
            description: "Regelmässige oder einmalige Sauberkeit für Privathaushalte mit GAV-Personal und versichertem Schlüsselservice.",
          },
        },
      ],
    },
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
      <body className="antialiased min-h-screen flex flex-col selection:bg-cyan-500 selection:text-white bg-slate-50 text-slate-900">
        <Header />
        <main id="main-content" className="flex-1 pb-16 sm:pb-0">
          {children}
        </main>
        <Footer />
        <MobileActionDock />
      </body>
    </html>
  );
}

import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { SERVICES } from "@/config/services.config";
import { SITE_CONFIG } from "@/config/site.config";
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  HelpCircle,
  FileCheck,
  Sparkles,
  ChevronRight,
  Home,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return { title: "Dienstleistung nicht gefunden | AURA Clean Bern" };

  const canonicalUrl = `https://aura-reinigung-bern.vercel.app/dienstleistungen/${service.slug}`;

  return {
    title: `${service.title} | AURA Clean Bern`,
    description: `${service.headline} ${service.shortDescription}`,
    keywords: [
      service.title,
      `${service.title} Bern`,
      "Reinigungsfirma Bern",
      "Abnahmegarantie Bern",
      "Wohnungsreinigung Bern",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.title} | AURA Clean Bern`,
      description: service.shortDescription,
      url: canonicalUrl,
      images: [
        {
          url: service.image,
          width: 1200,
          height: 630,
          alt: service.heroImageDesc,
        },
      ],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Schema.org Service & FAQPage Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: service.title,
        description: service.shortDescription,
        provider: {
          "@type": "CleaningService",
          name: SITE_CONFIG.brand.name,
          telephone: SITE_CONFIG.contact.phone,
          url: "https://aura-reinigung-bern.vercel.app",
        },
        areaServed: {
          "@type": "City",
          name: "Bern",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: service.category,
          itemListElement: service.checklist.flatMap((c) =>
            c.items.map((item) => ({
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: item,
              },
            }))
          ),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://aura-reinigung-bern.vercel.app",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Dienstleistungen",
            item: "https://aura-reinigung-bern.vercel.app/dienstleistungen",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: service.title,
            item: `https://aura-reinigung-bern.vercel.app/dienstleistungen/${service.slug}`,
          },
        ],
      },
      ...(service.faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              mainEntity: service.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: faq.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <div className="pt-28 sm:pt-32 pb-24 bg-slate-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-slate-800 transition-colors flex items-center gap-1">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href="/dienstleistungen" className="hover:text-slate-800 transition-colors">
            Dienstleistungen
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {service.title}
          </span>
        </nav>

        {/* Service Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold uppercase tracking-wider">
            <span>{service.category}</span>
            <span className="text-slate-400">|</span>
            <span>{service.badge}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {service.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {service.headline}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/offerte-anfragen?service=${service.slug}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-colors active:scale-98"
            >
              <span>Offerte für diesen Service anfragen</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-slate-800 font-semibold text-sm border border-slate-200 hover:bg-slate-50 transition-colors active:scale-98"
            >
              <Phone className="w-4 h-4 text-slate-700" />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* High-Resolution Hero Visual Showcase */}
        <div className="bg-white p-2.5 sm:p-3 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
          <div className="relative h-[280px] sm:h-[460px] w-full rounded-xl overflow-hidden">
            <Image
              src={service.image}
              alt={service.heroImageDesc}
              fill
              priority
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 80vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 flex items-center justify-between text-white">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-300 font-bold">
                  {service.category}
                </span>
                <div className="text-base sm:text-xl font-bold">
                  {service.title}
                </div>
              </div>
              <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold border border-white/30">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Schweizer Qualitätsstandard</span>
              </div>
            </div>
          </div>
        </div>

        {/* Guarantee Banner */}
        <div className="p-5 sm:p-8 rounded-2xl border border-emerald-200 bg-emerald-50/50 flex items-start gap-4">
          <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 sm:w-6 h-5 sm:h-6" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Unser verbindliches Leistungsversprechen
            </div>
            <div className="text-sm sm:text-lg font-bold text-slate-900 mt-1">
              {service.guaranteeText}
            </div>
          </div>
        </div>

        {/* USPs Grid */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-slate-900" />
            <span>Ihre Vorteile bei AURA Clean Bern</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {service.usps.map((usp, idx) => (
              <div
                key={idx}
                className="bg-white p-4 sm:p-5 rounded-2xl flex items-start gap-3 border border-slate-200 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm font-medium text-slate-800">{usp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Checklist */}
        <div className="space-y-6 sm:space-y-8">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <FileCheck className="w-5 h-5 text-slate-900" />
              <span>Detaillierter Leistungsumfang (Checkliste)</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Jeder Punkt wird von unserem Berner Team gewissenhaft kontrolliert und abgehakt.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {service.checklist.map((group, idx) => (
              <div
                key={idx}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3"
              >
                <h3 className="text-sm sm:text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                  {group.category}
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {group.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-900 shrink-0 mt-2" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs for this Service */}
        {service.faqs.length > 0 && (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-slate-900" />
                <span>Häufige Fragen zu diesem Service</span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Transparente Antworten für eine reibungslose Planung.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {service.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2"
                >
                  <h3 className="text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="p-6 sm:p-10 rounded-2xl text-center bg-slate-900 text-white space-y-4 shadow-xl border border-slate-800">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
            Offerte für {service.title} erhalten
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto">
            Teilen Sie uns Ihre Eckdaten mit. Sie erhalten werktags innerhalb von 2 Stunden
            ein verbindliches Festpreisangebot ohne Überraschungen.
          </p>
          <div className="pt-2">
            <Link
              href={`/offerte-anfragen?service=${service.slug}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-all shadow-md active:scale-98"
            >
              <span>Jetzt kostenlose Offerte berechnen</span>
              <ArrowRight className="w-4 h-4 text-slate-900" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { MetadataRoute } from "next";
import { SERVICES } from "@/config/services.config";

const BASE_URL = "https://aura-reinigung-bern.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceUrls = SERVICES.map((service) => ({
    url: `${BASE_URL}/dienstleistungen/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: service.slug === "umzugsreinigung" ? 0.95 : 0.85,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/offerte-anfragen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/dienstleistungen`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${BASE_URL}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/kontakt`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}

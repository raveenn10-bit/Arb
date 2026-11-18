import type { MetadataRoute } from "next";
import { sectors, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "", priority: 1 },
    { path: "/services", priority: 0.9 },
    { path: "/workforce", priority: 0.9 },
    { path: "/contact", priority: 0.9 },
    { path: "/about", priority: 0.7 },
    { path: "/clients", priority: 0.7 },
  ];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p.path}`, lastModified: site.lastUpdated, changeFrequency: "monthly" as const, priority: p.priority })),
    ...sectors.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: site.lastUpdated, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}

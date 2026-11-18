import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/**
 * robots.txt — search engines and AI assistant crawlers are explicitly allowed so the
 * company's services, credentials and contact details can be read and quoted accurately.
 * To opt out of a specific AI crawler, change its rule to `disallow: "/"`.
 */
const aiCrawlers = [
  "GPTBot", // OpenAI
  "OAI-SearchBot", // OpenAI search
  "ChatGPT-User", // OpenAI, user-initiated browsing
  "ClaudeBot", // Anthropic
  "Claude-SearchBot", // Anthropic search
  "Claude-User", // Anthropic, user-initiated browsing
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "Google-Extended", // Google Gemini / AI products
  "Applebot-Extended", // Apple Intelligence
  "Bingbot", // Microsoft Bing & Copilot
  "CCBot", // Common Crawl
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiCrawlers.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}

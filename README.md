# Pak Arab Manpower Supply LLC — Website

Production website for **Pak Arab Manpower Supply LLC** (Mussafah, Abu Dhabi).
Built with **Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · GSAP + ScrollTrigger · Motion**.

Every page is statically prerendered at build time. There is no backend, database or authentication: all enquiry forms send a structured message straight to the company's official WhatsApp number.

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Home: hero, credentials, stats, sectors, trades, clients, compliance, process, enquiry form, FAQ |
| `/about` | Company story, mission & vision, Quality Management System, credentials |
| `/services` | Benefits, sectors, process |
| `/services/[slug]` | 4 statically generated sector pages (oil-gas, civil-construction, mechanical, electrical-instrumentation) |
| `/workforce` | Searchable, filterable trades directory. Selected trades flow into the WhatsApp request form |
| `/clients` | Client logo wall |
| `/contact` | Enquiry form (supports `?sector=` and `?trade=` presets), contact details, map |

SEO: per-page metadata and canonicals, Open Graph image (`/opengraph-image`), `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD (EmploymentAgency, Service, FAQPage).

## Editing content

All company data lives in **`src/lib/site.ts`**: phone numbers, **WhatsApp number**, email, address, sectors, trades, clients, FAQs and process steps. Change it there and every page updates.

```ts
whatsapp: "971553842555",        // digits only, international format
whatsappDisplay: "+971 55 384 2555",
```

- Client logos: `public/images/client-logos/<slug>.webp` (slug must match `clients` in `site.ts`).
- Photos: `public/images/*.webp`.
- Certification marks: `public/images/certs/`.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run build      # production build (must pass before deploying)
npm start          # serve the production build locally
```

Requires Node.js 20.9 or later.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository. The framework preset is detected as **Next.js**; no environment variables are needed.
3. Deploy, then under **Settings → Domains** add `pakarabmps.com` and `www.pakarabmps.com` and update DNS as Vercel instructs.

If the production domain changes, update `site.url` in `src/lib/site.ts` (used for canonical URLs, sitemap and structured data).

## Notes

- Fonts (Barlow / Barlow Condensed) are self-hosted via `next/font/local`, so there are no external font requests.
- Animations respect `prefers-reduced-motion`.
- Images are served as AVIF/WebP through `next/image` with long-term caching.
- Security headers are set in `next.config.ts`.

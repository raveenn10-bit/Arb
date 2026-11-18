import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { ButtonLink, SectionHeading } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { sectors, site, trades } from "@/lib/site";

export function generateStaticParams() {
  return sectors.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) return {};
  return {
    title: `${sector.title} Manpower Supply in the UAE`,
    description: sector.summary,
    alternates: { canonical: `/services/${sector.slug}` },
    openGraph: { title: `${sector.title} Manpower Supply | ${site.name}`, description: sector.summary },
  };
}

export default async function SectorPage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const sector = sectors.find((s) => s.slug === slug);
  if (!sector) notFound();

  const sectorTrades = trades.filter((t) => sector.tradeGroups.includes(t.group) && sector.divisions.includes(t.division));
  const others = sectors.filter((s) => s.slug !== sector.slug);

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${sector.title} manpower supply`,
    serviceType: "Manpower supply",
    description: sector.summary,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "Country", name: "United Arab Emirates" },
    url: `${site.url}/services/${sector.slug}`,
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <PageHero
        eyebrow={`Sector ${sector.index} · ${sector.short}`}
        title={`${sector.title} manpower`}
        intro={sector.summary}
        image={sector.image}
        imageAlt={sector.imageAlt}
        imagePosition={sector.imagePosition}
        crumbs={[
          { href: "/services", label: "Services" },
          { href: `/services/${sector.slug}`, label: sector.title },
        ]}
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#enquire">Request {sector.title} workers</ButtonLink>
        </div>
      </PageHero>

      <section aria-labelledby="overview-title" className="py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading eyebrow="Overview" title={<span id="overview-title">What we bring to {sector.title.toLowerCase()} projects</span>} />
            <div className="text-muted mt-8 space-y-5 text-lg">
              {sector.body.map((p) => (
                <p key={p} data-reveal>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
          <Reveal as="ul" className="grid content-start gap-3 lg:col-span-6" stagger={0.08}>
            {sector.highlights.map((h) => (
              <li key={h} data-reveal className="border-line flex items-start gap-4 border bg-white p-5">
                <span className="bg-brand flex size-8 shrink-0 items-center justify-center text-white">
                  <Check aria-hidden="true" className="size-5" />
                </span>
                <span className="pt-1 text-lg font-medium">{h}</span>
              </li>
            ))}
            <li data-reveal className="relative mt-3 aspect-[16/9] overflow-hidden bg-steel md:hidden">
              <Image src={sector.image} alt={sector.imageAlt} fill sizes="92vw" className="object-cover" />
            </li>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="roles-title" className="bg-ink grain relative overflow-hidden py-24 text-white lg:py-32">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading tone="light" eyebrow="Available roles" title={<span id="roles-title">Trades we supply for {sector.title}</span>} />
            <div data-reveal>
              <ButtonLink href="/workforce" variant="outline-light">
                Full trades directory
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal as="ul" className="grid border-t border-l border-white/10 sm:grid-cols-2 lg:grid-cols-3" stagger={0.02} y={12}>
            {sectorTrades.map((t) => (
              <li key={t.name} data-reveal className="flex min-h-16 items-center justify-between gap-3 border-r border-b border-white/10 px-5 py-4">
                <span className="font-medium">{t.name}</span>
                <span className="text-xs font-semibold tracking-[0.1em] text-white/50 uppercase">{t.group.split(" ")[0]}</span>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="enquire" aria-labelledby="enquire-title" className="py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Enquire"
              title={<span id="enquire-title">Request {sector.title} manpower</span>}
              intro="Send us the trades, headcount and site location. We reply on WhatsApp with availability."
            />
          </Reveal>
          <div className="border-line border bg-white p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm defaultSector={sector.title} />
          </div>
        </div>
      </section>

      <section aria-labelledby="other-title" className="bg-paper-2 py-20">
        <div className="container-site">
          <h2 id="other-title" className="mb-8 text-3xl font-bold uppercase sm:text-4xl">
            Other sectors
          </h2>
          <ul className="grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/services/${o.slug}`}
                  className="group hover:border-ink flex min-h-24 items-center justify-between gap-4 border border-transparent bg-white p-6 transition-colors"
                >
                  <span>
                    <span className="font-display text-brand block font-bold">/ {o.index}</span>
                    <span className="font-display text-2xl font-bold uppercase">{o.title}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-6 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { HomeHero } from "@/components/home-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading, ButtonLink } from "@/components/ui";
import { StatBand } from "@/components/stat-band";
import { SectorGrid } from "@/components/sector-grid";
import { ClientWall } from "@/components/client-wall";
import { ProcessSteps } from "@/components/process-steps";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";
import { CrewBand } from "@/components/crew-band";
import { EnquiryForm } from "@/components/enquiry-form";
import { JsonLd } from "@/components/json-ld";
import { clients, faqs, isoStandards, sectors, site, trades } from "@/lib/site";

export default function HomePage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <HomeHero />

      {/* Intro + stats */}
      <section aria-labelledby="intro-title" className="py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p data-reveal className="eyebrow slash text-muted mb-4">
                Who we are
              </p>
              <h2 id="intro-title" data-reveal className="text-[2.5rem] leading-[0.95] font-bold uppercase sm:text-5xl lg:text-[3.75rem]">
                A manpower partner that understands the job site, not just the CV.
              </h2>
            </div>
            <div className="text-muted space-y-5 text-lg lg:col-span-5 lg:pt-12">
              <p data-reveal>
                Pak Arab Manpower Supply LLC works with contractors and operators to understand each project&apos;s goals, then fields
                vetted people who fit them. Every worker completes induction before mobilisation and receives training at regular
                intervals.
              </p>
              <p data-reveal>
                We handle payroll, benefits and compliance, so your supervisors can focus on productivity, safety and schedule.
              </p>
              <div data-reveal>
                <Link href="/about" className="text-ink font-display group inline-flex min-h-11 items-center gap-2 text-lg font-semibold tracking-[0.06em] uppercase">
                  More about us
                  <ArrowUpRight aria-hidden="true" className="text-brand size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          </Reveal>
          <div className="mt-16">
            <StatBand
              stats={[
                { value: clients.length, suffix: "+", label: "Major clients served" },
                { value: trades.length, suffix: "+", label: "Trade categories" },
                { value: sectors.length, label: "Industry sectors" },
                { value: isoStandards.length, label: "ISO management standards" },
              ]}
            />
          </div>
        </div>
      </section>

      <CrewBand />

      {/* Sectors */}
      <section aria-labelledby="sectors-title" className="bg-paper-2 py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Fields of service"
              title={<span id="sectors-title">Four sectors. One accountable supplier.</span>}
              intro="From offshore platforms to building sites, we supply the trades each sector depends on."
            />
            <div data-reveal>
              <ButtonLink href="/services" variant="outline-dark">
                All services
              </ButtonLink>
            </div>
          </Reveal>
          <SectorGrid />
        </div>
      </section>

      {/* Trades teaser */}
      <section aria-labelledby="trades-title" className="bg-ink grain relative overflow-hidden py-24 text-white lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              tone="light"
              eyebrow="Workforce"
              title={<span id="trades-title">{trades.length}+ trades, ready to mobilise</span>}
              intro="Engineers, supervisors, welders, riggers, scaffolders, masons, carpenters, electricians, operators and site support, for short- and long-term contracts."
            />
            <div data-reveal className="mt-10">
              <ButtonLink href="/workforce">Browse all trades</ButtonLink>
            </div>
          </Reveal>
          <Reveal as="ul" className="flex flex-wrap content-start gap-2 lg:col-span-7" stagger={0.02} y={12}>
            {trades
              .filter((_, i) => i % 2 === 0)
              .slice(0, 28)
              .map((t) => (
                <li key={t.name} data-reveal>
                  <Link
                    href="/workforce"
                    className="hover:border-brand hover:bg-brand inline-flex min-h-11 items-center border border-white/15 px-4 text-[0.95rem] font-medium text-white/85 transition-colors hover:text-white"
                  >
                    {t.name}
                  </Link>
                </li>
              ))}
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section aria-labelledby="clients-title" className="py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Our clients"
              title={<span id="clients-title">Trusted by the UAE&apos;s leading operators and contractors</span>}
            />
            <div data-reveal>
              <ButtonLink href="/clients" variant="outline-dark">
                View all clients
              </ButtonLink>
            </div>
          </Reveal>
          <ClientWall limit={15} />
        </div>
      </section>

      {/* Compliance */}
      <section aria-labelledby="compliance-title" className="bg-white py-24 lg:py-32">
        <div className="container-site grid items-center gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow="Certified & compliant"
              title={<span id="compliance-title">Credentials that get your crew through the gate</span>}
              intro="Our ICV certification, ADNOC approval and CICPA eligibility let us mobilise to controlled oil & gas sites, backed by a documented Quality Management System."
            />
            <ul className="mt-10 grid gap-3 sm:grid-cols-3">
              {isoStandards.map((s) => (
                <li key={s.code} data-reveal className="border-line border p-5">
                  <ShieldCheck aria-hidden="true" className="text-brand size-6" />
                  <p className="font-display mt-3 text-xl font-bold">{s.code}</p>
                  <p className="text-muted mt-1 text-sm">{s.name}</p>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-5 lg:col-span-6" stagger={0.12}>
            <div data-reveal className="border-line bg-paper flex aspect-square items-center justify-center border p-8">
              <Image src="/images/certs/icv.webp" alt="UAE In-Country Value (ICV) certified" width={420} height={300} className="h-auto w-full max-w-[15rem]" />
            </div>
            <div data-reveal className="border-line bg-paper flex aspect-square items-center justify-center border p-6">
              <Image
                src="/images/certs/iso-9001-imcd-uscb.webp"
                alt="ISO 9001:2015 certified by IMCD, accredited by USCB, certificate 5169"
                width={420}
                height={180}
                className="h-auto w-full"
              />
            </div>
            <div data-reveal className="bg-ink col-span-2 flex items-center gap-5 p-7 text-white">
              <span className="bg-brand h-14 w-3 shrink-0 -skew-x-[22deg]" aria-hidden="true" />
              <p className="font-display text-xl leading-tight font-semibold uppercase sm:text-2xl">
                ADNOC-approved Job Performers &amp; CICPA-eligible workforce
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="process-title" className="bg-paper-2 py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="mb-16">
            <SectionHeading eyebrow="How it works" title={<span id="process-title">From request to crew on site</span>} />
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      {/* Enquiry */}
      <section aria-labelledby="enquiry-title" className="py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading
              eyebrow="Request workers"
              title={<span id="enquiry-title">Tell us what your project needs</span>}
              intro="Fill in the essentials and send your brief straight to our team on WhatsApp."
            />
            <div data-reveal className="text-muted mt-8 space-y-2">
              <p>
                Prefer to call?{" "}
                <a className="text-ink font-semibold underline underline-offset-4" href={`tel:${site.phones[0].tel}`}>
                  {site.phones[0].display}
                </a>
              </p>
              <p>
                Email:{" "}
                <a className="text-ink font-semibold underline underline-offset-4" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </p>
            </div>
          </Reveal>
          <div className="border-line border bg-white p-6 sm:p-10 lg:col-span-8">
            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="bg-white py-24 lg:py-32">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading eyebrow="FAQ" title={<span id="faq-title">Questions contractors ask us</span>} />
          </Reveal>
          <div className="lg:col-span-8">
            <Faq />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

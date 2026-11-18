import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Eye, Target } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading, ButtonLink } from "@/components/ui";
import { CtaBand } from "@/components/cta-band";
import { credentials, isoStandards } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Mission, Vision & Quality Management",
  description:
    "Pak Arab Manpower Supply LLC is an ICV-certified, ADNOC-approved manpower supplier in Mussafah, Abu Dhabi, with an independent QA/QC department and ISO-aligned management systems.",
  alternates: { canonical: "/about" },
};

const qms = [
  { title: "Quality Manual", body: "A documented framework defining how we recruit, vet, deploy and support every worker." },
  { title: "Quality Assurance Procedures", body: "Defined checks on candidate experience, certifications and fitness before mobilisation." },
  { title: "Implementation, Monitoring & Improvement", body: "Performance is reviewed continuously and findings feed back into our procedures." },
  { title: "Site Monitoring", body: "Our coordinators follow up on site to confirm standards are being met throughout each contract." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Pak Arab"
        title="Bridging talent and opportunity"
        intro="We partner with clients to understand their goals, then build teams of vetted, inducted and well-supported people who deliver on site."
        image="/images/site-engineers.webp"
        crumbs={[{ href: "/about", label: "About" }]}
      />

      <section aria-labelledby="story-title" className="py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading
              eyebrow="What we do"
              title={<span id="story-title">More than a manpower supplier</span>}
            />
            <div className="text-muted mt-8 space-y-5 text-lg">
              <p data-reveal>
                Pak Arab Manpower Supply LLC provides skilled, semi-skilled and supervisory manpower to businesses across the
                UAE&apos;s oil &amp; gas, construction, mechanical and electrical sectors. We go beyond filling headcount: we take
                time to understand each client&apos;s scope, site conditions and standards.
              </p>
              <p data-reveal>
                Our dedicated recruitment team handpicks candidates from a large pool of experienced workers. Company policy
                requires every worker to complete induction before mobilisation and training at regular intervals, which raises
                both quality and productivity on site.
              </p>
              <p data-reveal>
                Flexible staffing lets you scale your workforce up or down as your project changes, while we take care of payroll,
                benefits and compliance.
              </p>
            </div>
          </Reveal>
          <Reveal className="relative lg:col-span-6" y={40}>
            <div data-reveal className="clip-slant-r relative aspect-[4/5] overflow-hidden bg-steel">
              <Image
                src="/images/valve-inspection.webp"
                alt="Technician in orange coveralls inspecting valves at an industrial plant"
                fill
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover"
              />
            </div>
            <div data-reveal className="bg-brand absolute -bottom-6 left-0 max-w-xs p-7 text-white sm:left-[-1.5rem]">
              <p className="font-display text-2xl leading-tight font-bold uppercase">Short- and long-term contracts across all seven Emirates</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="mv-title" className="bg-ink grain relative overflow-hidden py-24 text-white lg:py-32">
        <div className="container-site">
          <Reveal className="mb-14">
            <SectionHeading tone="light" eyebrow="Mission & vision" title={<span id="mv-title">What drives us</span>} />
          </Reveal>
          <Reveal className="grid gap-5 lg:grid-cols-2" stagger={0.15}>
            <article data-reveal className="border border-white/10 bg-white/[0.03] p-8 sm:p-12">
              <Target aria-hidden="true" className="text-brand size-10" />
              <h3 className="mt-6 text-4xl font-bold uppercase">Our mission</h3>
              <p className="mt-5 text-lg text-white/75">
                To bridge the gap between talent and opportunity by providing reliable, skilled and dedicated manpower solutions.
                We are committed to understanding the unique needs of our clients and delivering workforce solutions that drive
                their success, while fostering growth and development for our employees. Through integrity, professionalism and
                excellence, we aim to be a trusted partner in the manpower supply industry.
              </p>
            </article>
            <article data-reveal className="border border-white/10 bg-white/[0.03] p-8 sm:p-12">
              <Eye aria-hidden="true" className="text-brand size-10" />
              <h3 className="mt-6 text-4xl font-bold uppercase">Our vision</h3>
              <p className="mt-5 text-lg text-white/75">
                To become a leading manpower supply company recognised for exceptional service, innovative solutions and
                commitment to quality. We aspire to build lasting relationships with our clients and employees by consistently
                exceeding expectations, and by empowering individuals and businesses to contribute to the economic development
                and prosperity of the regions we serve.
              </p>
            </article>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="qms-title" className="py-24 lg:py-32">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading
              eyebrow="Quality management system"
              title={<span id="qms-title">Quality built into every deployment</span>}
              intro="We have an independent Quality Control & Quality Assurance department, fully supported by top management and employees at all levels, operating a fully documented Quality Management System."
            />
            <ul className="mt-10 space-y-3">
              {isoStandards.map((s) => (
                <li key={s.code} data-reveal className="flex items-center gap-4">
                  <span className="bg-brand h-8 w-2 -skew-x-[22deg]" aria-hidden="true" />
                  <span>
                    <span className="font-display text-xl font-bold">{s.code}</span>
                    <span className="text-muted ml-2">{s.name}</span>
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal as="ol" className="grid gap-4 sm:grid-cols-2 lg:col-span-7" stagger={0.1}>
            {qms.map((item, i) => (
              <li key={item.title} data-reveal className="border-line border bg-white p-7">
                <span className="font-display text-brand text-lg font-bold">/ {String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 text-2xl font-bold uppercase">{item.title}</h3>
                <p className="text-muted mt-3">{item.body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cred-title" className="bg-paper-2 py-24 lg:py-28">
        <div className="container-site">
          <Reveal className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading eyebrow="Credentials" title={<span id="cred-title">Certified to work where it matters</span>} />
            <div data-reveal>
              <ButtonLink href="/clients" variant="outline-dark">
                See who we work with
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal as="ul" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {credentials.map((c) => (
              <li key={c.id} data-reveal className="bg-white p-7">
                <CheckCircle2 aria-hidden="true" className="text-brand size-7" />
                <h3 className="mt-4 text-2xl font-bold uppercase">{c.title}</h3>
                <p className="text-muted mt-2">{c.detail}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

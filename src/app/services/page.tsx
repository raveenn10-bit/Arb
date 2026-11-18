import type { Metadata } from "next";
import { Banknote, Repeat, ShieldCheck, Users } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/ui";
import { SectorGrid } from "@/components/sector-grid";
import { ProcessSteps } from "@/components/process-steps";
import { CtaBand } from "@/components/cta-band";

export const metadata: Metadata = {
  title: "Manpower Services — Oil & Gas, Civil, Mechanical & Electrical",
  description:
    "Flexible manpower supply for oil & gas, civil construction, mechanical and electrical/MEP projects in the UAE. Vetted workers, payroll and compliance handled.",
  alternates: { canonical: "/services" },
};

const benefits = [
  {
    icon: Users,
    title: "Vetted talent pool",
    body: "A large pool of skilled candidates makes it easier to find the right fit for each role and site.",
  },
  {
    icon: Repeat,
    title: "Flexible staffing",
    body: "Scale your workforce up or down as project phases change, for short- or long-term durations.",
  },
  {
    icon: Banknote,
    title: "Lower labour overheads",
    body: "We handle payroll, benefits and compliance, reducing your administrative and labour costs.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & quality",
    body: "Inducted, regularly trained workers, backed by our QA/QC department and ISO-aligned systems.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Manpower solutions for industrial projects"
        intro="We supply skilled, semi-skilled and supervisory workforce on flexible terms, so you can staff each phase of your project without the hiring overhead."
        image="/images/refinery-night.webp"
        crumbs={[{ href: "/services", label: "Services" }]}
      />

      <section aria-labelledby="benefits-title" className="py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="mb-14">
            <SectionHeading
              eyebrow="Process & benefits"
              title={<span id="benefits-title">Why contractors outsource manpower to us</span>}
            />
          </Reveal>
          <Reveal as="ul" className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {benefits.map(({ icon: Icon, title, body }) => (
              <li key={title} data-reveal className="bg-white p-8">
                <Icon aria-hidden="true" className="text-brand size-8" />
                <h3 className="mt-6 text-2xl font-bold uppercase">{title}</h3>
                <p className="text-muted mt-3">{body}</p>
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="sectors-title" className="bg-paper-2 py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="mb-14">
            <SectionHeading eyebrow="Fields of service" title={<span id="sectors-title">Sectors we serve</span>} />
          </Reveal>
          <SectorGrid />
        </div>
      </section>

      <section aria-labelledby="process-title" className="py-24 lg:py-32">
        <div className="container-site">
          <Reveal className="mb-16">
            <SectionHeading eyebrow="How it works" title={<span id="process-title">From request to crew on site</span>} />
          </Reveal>
          <ProcessSteps />
        </div>
      </section>

      <CtaBand />
    </>
  );
}

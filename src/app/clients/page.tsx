import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { ClientMarquee } from "@/components/client-marquee";
import { CtaBand } from "@/components/cta-band";
import { clients } from "@/lib/site";
import { BreadcrumbLd } from "@/components/breadcrumb-ld";

export const metadata: Metadata = {
  title: "Our Clients — ADNOC, NPCC, Lamprell & More",
  description:
    "Pak Arab Manpower Supply has supplied manpower to leading UAE operators and contractors including ADNOC, NPCC, Lamprell, Altrad, Archirodon, Técnicas Reunidas and Emirates Steel.",
  alternates: { canonical: "/clients" },
};

export default function ClientsPage() {
  return (
    <>
      <BreadcrumbLd crumbs={[{ href: "/clients", label: "Clients" }]} />
      <PageHero
        eyebrow="Our clients"
        title="Trusted on the UAE's major projects"
        intro={`We are proud to have supplied manpower to ${clients.length} leading operators, EPC contractors and industrial companies across the UAE.`}
        image="/images/offshore-platform.webp"
        crumbs={[{ href: "/clients", label: "Clients" }]}
      />
      <section aria-label="Our clients" className="bg-white py-20 lg:py-28">
        <div className="container-site">
          <ClientMarquee rows={2} />
          <p className="text-muted mt-8 text-sm">All logos and trademarks are the property of their respective owners.</p>
        </div>
      </section>
      <CtaBand title="Join our client list" body="Tell us about your next project and we'll show you what a reliable manpower partner looks like." />
    </>
  );
}

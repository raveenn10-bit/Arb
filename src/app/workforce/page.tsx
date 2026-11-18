import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TradesDirectory } from "@/components/trades-directory";
import { trades } from "@/lib/site";
import { BreadcrumbLd } from "@/components/breadcrumb-ld";

export const metadata: Metadata = {
  title: "Skilled Workers for Hire in the UAE — Trades Directory",
  description: `Browse ${trades.length}+ trade categories available for UAE projects: engineers, supervisors, welders, fitters, riggers, scaffolders, masons, carpenters, electricians, operators and site support.`,
  alternates: { canonical: "/workforce" },
};

export default function WorkforcePage() {
  return (
    <>
      <BreadcrumbLd crumbs={[{ href: "/workforce", label: "Workforce" }]} />
      <PageHero
        eyebrow="Workforce"
        title="Skilled workforce & trades directory"
        intro="Technical and non-technical workers for onshore, offshore and civil projects, for both short- and long-term contracts. Select the trades you need and send your request in one step."
        image="/images/drilling-crew.webp"
        crumbs={[{ href: "/workforce", label: "Workforce" }]}
      />
      <TradesDirectory />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { TradesDirectory } from "@/components/trades-directory";
import { trades } from "@/lib/site";

export const metadata: Metadata = {
  title: "Workforce & Trades Directory — Welders, Riggers, Scaffolders, Masons & More",
  description: `Browse ${trades.length}+ trade categories available for UAE projects: engineers, supervisors, welders, fitters, riggers, scaffolders, masons, carpenters, electricians, operators and site support.`,
  alternates: { canonical: "/workforce" },
};

export default function WorkforcePage() {
  return (
    <>
      <PageHero
        eyebrow="Workforce"
        title="Trades directory"
        intro="Technical and non-technical workers for onshore, offshore and civil projects, for both short- and long-term contracts. Select the trades you need and send your request in one step."
        image="/images/drilling-crew.webp"
        crumbs={[{ href: "/workforce", label: "Workforce" }]}
      />
      <TradesDirectory />
    </>
  );
}

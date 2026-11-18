"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, Plus, Search, X } from "lucide-react";
import { EnquiryForm } from "./enquiry-form";
import { tradeGroups, trades, type TradeGroup } from "@/lib/site";

type Division = "All" | "MEP" | "Civil";

const divisionLabel: Record<Division, string> = {
  All: "All trades",
  MEP: "Onshore / offshore MEP",
  Civil: "Civil sector",
};

export function TradesDirectory() {
  const reduce = useReducedMotion();
  const [query, setQuery] = useState("");
  const [division, setDivision] = useState<Division>("All");
  const [selected, setSelected] = useState<string[]>([]);
  const q = useDeferredValue(query.trim().toLowerCase());

  const filtered = useMemo(
    () =>
      trades.filter(
        (t) => (division === "All" || t.division === division) && (!q || t.name.toLowerCase().includes(q) || t.group.toLowerCase().includes(q)),
      ),
    [division, q],
  );

  const grouped = useMemo(() => {
    const map = new Map<TradeGroup, typeof trades>();
    for (const g of tradeGroups) map.set(g, []);
    for (const t of filtered) map.get(t.group)!.push(t);
    return [...map.entries()].filter(([, list]) => list.length);
  }, [filtered]);

  const toggle = (name: string) => setSelected((s) => (s.includes(name) ? s.filter((x) => x !== name) : [...s, name]));

  const counts = {
    All: trades.length,
    MEP: trades.filter((t) => t.division === "MEP").length,
    Civil: trades.filter((t) => t.division === "Civil").length,
  };

  return (
    <>
      <div className="bg-paper/95 border-line sticky top-[4.75rem] z-30 border-b backdrop-blur lg:top-[5.5rem]">
        <div className="container-site flex flex-col gap-4 py-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" aria-label="Filter by division" className="flex gap-1 overflow-x-auto">
            {(Object.keys(divisionLabel) as Division[]).map((d) => (
              <button
                key={d}
                role="tab"
                type="button"
                aria-selected={division === d}
                onClick={() => setDivision(d)}
                className={`font-display min-h-11 shrink-0 px-4 text-[1rem] font-semibold tracking-[0.06em] uppercase transition-colors ${
                  division === d ? "bg-ink text-white" : "text-ink/70 hover:text-ink hover:bg-ink/5"
                }`}
              >
                {divisionLabel[d]} <span className={division === d ? "text-white/60" : "text-muted"}>({counts[d]})</span>
              </button>
            ))}
          </div>
          <div className="relative md:w-80">
            <label htmlFor="trade-search" className="sr-only">
              Search trades
            </label>
            <Search aria-hidden="true" className="text-muted pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2" />
            <input
              id="trade-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search e.g. welder, rigger, mason"
              className="border-line focus:border-ink focus:ring-ink/10 min-h-12 w-full border bg-white py-3 pr-11 pl-12 text-base outline-none focus:ring-3"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="text-muted hover:text-ink absolute top-1/2 right-1 flex size-10 -translate-y-1/2 items-center justify-center"
              >
                <X aria-hidden="true" className="size-5" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="container-site py-16 lg:py-20">
        <p className="text-muted mb-10 max-w-2xl" aria-live="polite">
          Showing <strong className="text-ink">{filtered.length}</strong> of {trades.length} trade categories. Tap{" "}
          <Plus aria-label="add" className="inline size-4" /> to add a trade to your request, then send it to us on WhatsApp.
        </p>

        {grouped.length === 0 ? (
          <div className="border-line border bg-white p-10 text-center">
            <p className="font-display text-2xl font-bold uppercase">No trades match “{query}”</p>
            <p className="text-muted mt-2">Can&apos;t find the role you need? Describe it in the request form below.</p>
          </div>
        ) : (
          <div className="grid gap-12">
            {grouped.map(([group, list]) => (
              <section key={group} aria-labelledby={`g-${group}`}>
                <h2 id={`g-${group}`} className="border-ink mb-5 flex items-baseline justify-between border-b-2 pb-3 text-2xl font-bold uppercase sm:text-3xl">
                  {group}
                  <span className="text-muted font-sans text-sm font-medium normal-case">{list.length}</span>
                </h2>
                <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <AnimatePresence initial={false} mode="popLayout">
                    {list.map((t) => {
                      const on = selected.includes(t.name);
                      return (
                        <motion.li
                          key={t.name}
                          layout={!reduce}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                          transition={{ duration: 0.22 }}
                        >
                          <button
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(t.name)}
                            className={`group flex min-h-14 w-full items-center justify-between gap-4 border px-4 py-3 text-left transition-colors duration-200 ${
                              on ? "bg-ink border-ink text-white" : "border-line text-ink hover:border-ink bg-white"
                            }`}
                          >
                            <span>
                              <span className="block font-semibold">{t.name}</span>
                              <span className={`text-xs font-semibold tracking-[0.1em] uppercase ${on ? "text-white/60" : "text-muted"}`}>
                                {t.division === "MEP" ? "Onshore / offshore" : "Civil"}
                              </span>
                            </span>
                            <span
                              className={`flex size-9 shrink-0 items-center justify-center transition-colors ${
                                on ? "bg-brand text-white" : "bg-paper text-ink group-hover:bg-ink group-hover:text-white"
                              }`}
                            >
                              {on ? <Check aria-hidden="true" className="size-5" /> : <Plus aria-hidden="true" className="size-5" />}
                            </span>
                          </button>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>
              </section>
            ))}
          </div>
        )}
      </div>

      <section id="request" aria-labelledby="request-title" className="bg-ink text-white">
        <div className="container-site grid gap-12 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-4">
            <p className="eyebrow slash mb-4 text-white/70">Your request</p>
            <h2 id="request-title" className="text-5xl leading-[0.92] font-bold uppercase sm:text-6xl">
              Send your manpower requirement
            </h2>
            <p className="mt-6 text-lg text-white/70">
              Selected trades are added automatically. Add headcount and location, then send it to our team on WhatsApp.
            </p>
          </div>
          <div className="lg:col-span-8">
            <EnquiryForm tone="dark" selectedTrades={selected} onRemoveTrade={toggle} />
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="fixed inset-x-0 bottom-0 z-30 px-4 pb-4 sm:pb-6"
            style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}
          >
            <div className="bg-ink mr-[4.5rem] flex max-w-xl items-center justify-between gap-3 py-2 pr-2 pl-4 text-white shadow-2xl sm:mr-24 sm:ml-auto sm:pl-5 lg:mx-auto">
              <p className="text-sm sm:text-base">
                <strong className="font-display text-brand text-xl">{selected.length}</strong> trade{selected.length > 1 ? "s" : ""} selected
              </p>
              <a
                href="#request"
                className="bg-brand hover:bg-brand-dark font-display inline-flex min-h-11 items-center px-5 font-semibold tracking-[0.06em] uppercase transition-colors"
              >
                Review request
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

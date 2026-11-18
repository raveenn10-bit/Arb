"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Stat = { value: number; suffix?: string; label: string };

export function StatBand({ stats }: { stats: Stat[] }) {
  const ref = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        ref.current?.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.dataset.count);
          const obj = { v: 0 };
          gsap.to(obj, {
            v: end,
            duration: 1.6,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
            onUpdate: () => {
              el.textContent = String(Math.round(obj.v));
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <dl ref={ref} className="grid grid-cols-2 border-t border-l border-line lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col border-r border-b border-line bg-white p-6 sm:p-8">
          <dt className="text-muted order-2 mt-2 text-[0.95rem] font-medium">{s.label}</dt>
          <dd className="font-display text-ink order-1 text-6xl leading-none font-bold sm:text-7xl">
            <span data-count={s.value}>{s.value}</span>
            {s.suffix && <span className="text-brand">{s.suffix}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { sectors } from "@/lib/site";

export function SectorGrid() {
  return (
    <Reveal as="ul" className="grid gap-5 md:grid-cols-2" stagger={0.1}>
      {sectors.map((s) => (
        <li key={s.slug} data-reveal>
          <Link
            href={`/services/${s.slug}`}
            className="group bg-ink relative flex min-h-[22rem] flex-col justify-end overflow-hidden p-7 text-white sm:min-h-[26rem] sm:p-9"
          >
            <Image
              src={s.image}
              alt={s.imageAlt}
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              style={s.imagePosition ? { objectPosition: s.imagePosition } : undefined}
              className="object-cover opacity-70 transition-[transform,opacity] duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-55"
            />
            <div className="from-ink via-ink/70 absolute inset-0 bg-gradient-to-t to-transparent" />
            <span
              aria-hidden="true"
              className="bg-brand absolute top-0 left-9 h-0 w-3 -skew-x-[22deg] transition-[height] duration-500 ease-[var(--ease-out-expo)] group-hover:h-24"
            />
            <div className="relative">
              <p className="font-display text-brand text-lg font-bold tracking-[0.12em]">/ {s.index}</p>
              <h3 className="mt-2 text-4xl font-bold uppercase sm:text-5xl">{s.title}</h3>
              <p className="mt-1 text-sm font-semibold tracking-[0.12em] text-white/60 uppercase">{s.short}</p>
              <p className="mt-4 max-w-md text-white/80">{s.summary}</p>
              <span className="font-display mt-6 inline-flex items-center gap-2 text-[1.05rem] font-semibold tracking-[0.08em] uppercase">
                Explore sector
                <ArrowUpRight aria-hidden="true" className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        </li>
      ))}
    </Reveal>
  );
}

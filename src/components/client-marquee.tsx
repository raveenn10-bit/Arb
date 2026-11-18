"use client";

import Image from "next/image";
import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { clients, type Client } from "@/lib/site";

/**
 * Client logos auto-scrolling left → right on a plain white background.
 * Calm speed (~4.5s per logo), pauses on hover/focus, has a pause button (WCAG 2.2.2),
 * and shows a static wrapped row for visitors who prefer reduced motion.
 */
export function ClientMarquee({ rows = 1 }: { rows?: 1 | 2 }) {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(clients.length / 2);
  const groups = rows === 2 ? [clients.slice(0, half), clients.slice(half)] : [clients];

  return (
    <div className="bg-white">
      <div role="region" aria-label="Client logos" data-paused={paused || undefined} className="space-y-6 sm:space-y-10">
        {groups.map((group, i) => (
          <Row key={i} list={group} />
        ))}
      </div>
      <div className="marquee-control mt-6 flex justify-center">
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="text-muted hover:text-ink inline-flex min-h-11 items-center gap-2 px-3 text-sm font-semibold transition-colors"
        >
          {paused ? <Play aria-hidden="true" className="size-4" /> : <Pause aria-hidden="true" className="size-4" />}
          {paused ? "Play logos" : "Pause logos"}
        </button>
      </div>
    </div>
  );
}

function Row({ list }: { list: Client[] }) {
  return (
    <div className="marquee group relative overflow-hidden bg-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent sm:w-24" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent sm:w-24" />
      <ul
        className="marquee-track flex w-max items-center group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
        style={{ animationDuration: `${Math.max(30, list.length * 4.5)}s` }}
      >
        {list.map((c) => (
          <li key={c.slug} className="px-6 sm:px-10">
            <Logo client={c} />
          </li>
        ))}
        {/* second copy for a seamless loop, hidden from assistive technology */}
        {list.map((c) => (
          <li key={`${c.slug}-dup`} className="marquee-dup px-6 sm:px-10" aria-hidden="true">
            <Logo client={c} decorative />
          </li>
        ))}
      </ul>
    </div>
  );
}

function Logo({ client, decorative = false }: { client: Client; decorative?: boolean }) {
  return (
    <div className="relative h-14 w-36 sm:h-16 sm:w-44 lg:h-20 lg:w-52">
      <Image
        src={`/images/client-logos/${client.slug}.webp`}
        alt={decorative ? "" : client.name}
        fill
        sizes="(min-width: 1024px) 208px, (min-width: 640px) 176px, 144px"
        className="object-contain"
      />
    </div>
  );
}

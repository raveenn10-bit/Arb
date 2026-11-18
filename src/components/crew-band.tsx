"use client";

import Image from "next/image";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

const points = ["Inducted before mobilisation", "Trained at regular intervals", "Monitored on site"];

/** Full-bleed team photograph: the image eases out of a zoom and the copy rises in as it scrolls into view. */
export function CrewBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add({ motion: MOTION_OK, small: "(max-width: 639px)" }, (ctx) => {
        const small = Boolean(ctx.conditions?.small);
        if (!ctx.conditions?.motion) return;
        gsap.fromTo(
          ".crew-img",
          { scale: small ? 1.08 : 1.18, yPercent: -4 },
          {
            scale: 1,
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          ".crew-frame",
          { clipPath: small ? "inset(5% 0% 5% 0%)" : "inset(8% 6% 8% 6%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top 90%", end: "top 25%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          ".crew-in",
          { autoAlpha: 0, y: 32 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.09,
            ease: "expo.out",
            scrollTrigger: { trigger: root.current, start: "top 45%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="crew-title" className="bg-ink relative overflow-hidden">
      <div className="crew-frame relative h-[78svh] min-h-[34rem] w-full sm:h-[88svh] overflow-hidden sm:min-h-[40rem]">
        <Image
          src="/images/crew-team-site.webp"
          alt="Pak Arab Manpower Supply team in blue branded coveralls, hard hats and safety glasses at an oil and gas facility"
          fill
          sizes="100vw"
          className="crew-img object-cover object-[50%_28%]"
        />
        <div aria-hidden="true" className="from-ink via-ink/60 absolute inset-0 bg-gradient-to-t via-35% to-transparent to-70%" />
        <div aria-hidden="true" className="from-ink/70 absolute inset-0 bg-gradient-to-r to-transparent to-60% max-sm:hidden" />
        <div aria-hidden="true" className="bg-brand absolute top-0 left-[6%] h-28 w-4 -skew-x-[22deg] sm:h-40 sm:w-6" />

        <div className="absolute inset-x-0 bottom-0">
          <div className="container-site pb-12 sm:pb-16 lg:pb-20">
            <div className="max-w-2xl text-white">
              <p className="crew-in eyebrow slash mb-4 text-white/75">Our people</p>
              <h2 id="crew-title" className="crew-in text-[2.75rem] leading-[0.92] font-bold uppercase sm:text-6xl lg:text-7xl">
                Our name on every helmet
              </h2>
              <p className="crew-in mt-5 max-w-xl text-lg text-white/80">
                Our crews carry the Pak Arab name onto every site they work. That keeps us accountable for who we send and how
                they perform.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {points.map((pt) => (
                  <li
                    key={pt}
                    className="crew-in inline-flex min-h-11 items-center gap-2 border border-white/20 bg-white/[0.06] px-4 text-[0.95rem] font-medium backdrop-blur-sm"
                  >
                    <BadgeCheck aria-hidden="true" className="text-brand size-5" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

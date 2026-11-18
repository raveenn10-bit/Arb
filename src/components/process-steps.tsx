"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { processSteps } from "@/lib/site";

export function ProcessSteps() {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          ".step-line",
          { scaleX: 0 },
          { scaleX: 1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 75%", end: "bottom 60%", scrub: 0.6 } },
        );
        gsap.fromTo(
          ".step",
          { autoAlpha: 0, y: 30 },
          { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } },
        );
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      <span aria-hidden="true" className="step-line bg-brand absolute top-7 right-0 left-0 hidden h-0.5 origin-left lg:block" />
      {processSteps.map((step, i) => (
        <li key={step.title} className="step relative">
          <span className="font-display bg-ink relative flex size-14 items-center justify-center text-2xl font-bold text-white">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-6 text-2xl font-bold uppercase sm:text-[1.7rem]">{step.title}</h3>
          <p className="text-muted mt-3">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

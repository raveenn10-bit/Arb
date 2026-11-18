"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger direct children marked with [data-reveal] instead of the wrapper itself. */
  stagger?: number;
  y?: number;
  delay?: number;
  id?: string;
  "aria-label"?: string;
};

/**
 * Scroll-triggered reveal. Elements marked [data-reveal] fade/slide in once.
 * Under prefers-reduced-motion the final state renders immediately.
 */
export function Reveal({ children, as: Tag = "div", className, stagger = 0.08, y = 28, delay = 0, id, "aria-label": ariaLabel }: Props) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = ref.current;
      if (!root) return;
      const targets = root.querySelectorAll<HTMLElement>("[data-reveal]");
      const items = targets.length ? Array.from(targets) : [root];
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          items,
          { autoAlpha: 0, y },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            delay,
            ease: "expo.out",
            stagger,
            scrollTrigger: { trigger: root, start: "top 85%", once: true },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { autoAlpha: 1, y: 0 });
      });
      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className} id={id} aria-label={ariaLabel}>
      {children}
    </Tag>
  );
}

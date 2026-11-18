"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { ChevronRight } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

type Crumb = { href: string; label: string };

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  crumbs = [],
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(".ph-in", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 1, stagger: 0.08, ease: "expo.out", delay: 0.1 });
        gsap.fromTo(
          ".ph-img",
          { clipPath: "polygon(12% 100%, 100% 100%, 100% 100%, 12% 100%)" },
          { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 12% 100%)", duration: 1.4, ease: "expo.inOut" },
        );
        gsap.to(".ph-img img", {
          yPercent: 10,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-ink grain relative isolate overflow-hidden text-white">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 [mask-image:linear-gradient(to_right,black,transparent_70%)]" />
      {image && (
        <div className="ph-img clip-slant-r absolute inset-y-0 right-0 -z-10 hidden w-[46%] overflow-hidden lg:block">
          <Image src={image} alt={imageAlt} fill priority sizes="46vw" className="scale-110 object-cover" />
          <div className="from-ink via-ink/30 absolute inset-0 bg-gradient-to-r to-transparent" />
        </div>
      )}
      <div className="container-site pt-36 pb-20 lg:pt-44 lg:pb-28">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="ph-in mb-8">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-white/60">
              <li>
                <Link href="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-1">
                  <ChevronRight aria-hidden="true" className="size-4" />
                  {i === crumbs.length - 1 ? (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-white">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className="max-w-3xl lg:max-w-[52%]">
          <p className="ph-in eyebrow slash mb-5 text-white/70">{eyebrow}</p>
          <h1 className="ph-in text-5xl leading-[0.9] font-bold uppercase sm:text-6xl lg:text-7xl">{title}</h1>
          {intro && <p className="ph-in mt-7 max-w-xl text-lg text-white/75 sm:text-xl">{intro}</p>}
          {children && <div className="ph-in mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}

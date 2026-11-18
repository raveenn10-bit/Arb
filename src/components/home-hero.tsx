"use client";

import Image from "next/image";
import { useRef } from "react";
import { BadgeCheck } from "lucide-react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { ButtonLink } from "./ui";
import { credentials, trades } from "@/lib/site";

const lines = ["The workforce", "behind the UAE's", "toughest sites"];

export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.fromTo(".hero-line > span", { yPercent: 110, y: 0 }, { yPercent: 0, y: 0, duration: 1.1, stagger: 0.09 }, 0.15)
          .fromTo(".hero-fade", { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.55)
          .fromTo(
            ".hero-panel",
            { clipPath: "polygon(14% 100%, 100% 100%, 86% 100%, 0% 100%)" },
            { clipPath: "polygon(14% 0%, 100% 0%, 86% 100%, 0% 100%)", duration: 1.4, stagger: 0.15, ease: "expo.inOut" },
            0.1,
          )
          .fromTo(".hero-slash-fill", { scaleY: 0 }, { scaleY: 1, duration: 1.2, ease: "expo.inOut" }, 0.35)
          .fromTo(".hero-cred", { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.07 }, 0.9);

        gsap.to(".hero-panel-a img", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to(".hero-panel-b", {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
        gsap.to(".hero-slash", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.5 },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="bg-ink grain relative isolate overflow-hidden text-white" aria-labelledby="hero-title">
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_30%_40%,black,transparent_75%)]" />
      <div className="container-site grid min-h-[100svh] items-center gap-12 pt-32 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-36">
        <div className="lg:col-span-7">
          <p className="hero-fade eyebrow slash mb-6 text-white/70">Manpower supply · Abu Dhabi, UAE</p>
          <h1 id="hero-title" className="text-[3.4rem] leading-[0.88] font-bold uppercase sm:text-7xl lg:text-[5.6rem] xl:text-[6.4rem]">
            {lines.map((l, i) => (
              <span key={l} className="hero-line block overflow-hidden pb-[0.04em]">
                <span className={`block ${i === 2 ? "text-brand" : ""}`}>{l}</span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-lg text-white/75 sm:text-xl">
            Vetted engineers, supervisors and tradesmen for onshore and offshore oil &amp; gas, civil construction and MEP
            projects, ready for short- and long-term contracts.
          </p>
          <div className="hero-fade mt-10 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/contact">Request workers</ButtonLink>
            <ButtonLink href="/workforce" variant="outline-light">
              Browse {trades.length}+ trades
            </ButtonLink>
          </div>
        </div>

        <div className="relative h-[24rem] sm:h-[30rem] lg:col-span-5 lg:h-[38rem]" role="img" aria-label="Pak Arab Manpower Supply crews in branded coveralls and hard hats at an oil and gas facility">
          <div className="hero-slash absolute top-[-6%] left-[2%] h-[70%] w-10 -skew-x-[22deg] sm:w-14">
            <div className="hero-slash-fill bg-brand h-full w-full origin-top" />
          </div>
          <div className="hero-panel hero-panel-a clip-slant absolute inset-y-0 right-0 left-[12%] overflow-hidden bg-steel">
            <Image
              src="/images/crew-refinery-sunset.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="scale-110 object-cover object-[84%_center]"
            />
            <div className="from-ink/50 absolute inset-0 bg-gradient-to-t to-transparent" />
          </div>
          <div className="hero-panel hero-panel-b clip-slant absolute bottom-[-4%] left-0 h-[42%] w-[58%] overflow-hidden border-4 border-ink bg-steel">
            <Image src="/images/crew-team-site.webp" alt="" fill sizes="(min-width: 1024px) 24vw, 55vw" className="object-cover object-[50%_30%]" />
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <ul className="container-site grid grid-cols-2 lg:grid-cols-4">
          {credentials.map((c, i) => (
            <li
              key={c.id}
              className={`hero-cred flex items-start gap-3 py-6 pr-4 ${i % 2 === 1 ? "border-l border-white/10 pl-4 sm:pl-6" : ""} ${
                i >= 2 ? "border-t border-white/10 lg:border-t-0" : ""
              } ${i === 2 ? "lg:border-l lg:pl-6" : ""}`}
            >
              <BadgeCheck aria-hidden="true" className="text-brand mt-0.5 size-6 shrink-0" />
              <div>
                <p className="font-display text-lg leading-tight font-bold tracking-[0.04em] uppercase">{c.title}</p>
                <p className="mt-1 hidden text-sm text-white/60 sm:block">{c.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

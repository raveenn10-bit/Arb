"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";
import { Logo } from "./logo";
import { nav, site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    // Close the mobile menu after navigation (derived-state pattern, no effect needed)
    setLastPath(pathname);
    setOpen(false);
  }
  const onDarkHero = !scrolled && !open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Background lives on its own layer: backdrop-filter on <header> would trap the fixed mobile menu inside it */}
      <div
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[4.75rem] transition-[background-color,box-shadow,opacity] duration-300 lg:h-[5.5rem] ${
          onDarkHero ? "opacity-0" : "bg-white/95 opacity-100 shadow-[0_1px_0_rgb(13_15_18/0.08)] backdrop-blur-md"
        }`}
      />
      <a
        href="#main"
        className="bg-brand focus:fixed focus:top-3 focus:left-3 focus:z-[60] sr-only px-4 py-2 font-semibold text-white focus:not-sr-only"
      >
        Skip to content
      </a>
      <div className="container-site relative flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.5rem]">
        <Link href="/" className="shrink-0">
          <Logo tone={onDarkHero ? "light" : "dark"} />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`font-display relative inline-flex min-h-11 items-center px-4 text-[1.05rem] font-semibold tracking-[0.08em] uppercase transition-colors duration-200 ${
                    onDarkHero ? "text-white/80 hover:text-white" : "text-ink/70 hover:text-ink"
                  } ${isActive(item.href) ? (onDarkHero ? "text-white" : "text-ink") : ""}`}
                >
                  {item.label}
                  {isActive(item.href) && (
                    <span className="bg-brand absolute inset-x-4 bottom-1.5 h-0.5" aria-hidden="true" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${site.phones[0].tel}`}
            className={`hidden min-h-11 items-center gap-2 text-sm font-semibold xl:inline-flex ${
              onDarkHero ? "text-white/85 hover:text-white" : "text-ink/80 hover:text-ink"
            }`}
          >
            <Phone aria-hidden="true" className="size-4" />
            {site.phones[0].display}
          </a>
          <Link
            href="/contact"
            className="bg-brand hover:bg-brand-dark font-display hidden min-h-11 items-center px-5 text-[1rem] font-semibold tracking-[0.08em] text-white uppercase transition-colors sm:inline-flex"
          >
            Request workers
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className={`inline-flex size-12 items-center justify-center lg:hidden ${onDarkHero ? "text-white" : "text-ink"}`}
          >
            {open ? <X className="size-7" aria-hidden="true" /> : <Menu className="size-7" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            key="menu"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[4.75rem] bottom-0 overflow-y-auto bg-white lg:hidden"
          >
            <nav aria-label="Mobile" className="container-site flex min-h-full flex-col pt-4 pb-10">
              <ul className="divide-line divide-y border-y border-line">
                {[{ href: "/", label: "Home" }, ...nav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={reduce ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduce ? 0 : 0.04 * i, duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="font-display flex min-h-16 items-center justify-between text-3xl font-bold uppercase"
                    >
                      {item.label}
                      {pathname === item.href && <span className="bg-brand h-6 w-2 -skew-x-[22deg]" aria-hidden="true" />}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-8">
                <Link
                  href="/contact"
                  className="bg-brand font-display flex min-h-14 items-center justify-center text-lg font-semibold tracking-[0.08em] text-white uppercase"
                >
                  Request workers
                </Link>
                <a
                  href={`tel:${site.phones[0].tel}`}
                  className="border-ink/20 font-display flex min-h-14 items-center justify-center gap-2 border text-lg font-semibold tracking-[0.06em] uppercase"
                >
                  <Phone aria-hidden="true" className="size-5" /> Call {site.phones[0].display}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

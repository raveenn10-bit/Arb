import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "./logo";
import { WhatsAppIcon } from "./ui";
import { credentials, nav, sectors, site } from "@/lib/site";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-ink grain relative overflow-hidden text-white">
      <div className="container-site relative grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo tone="light" />
          <p className="mt-6 max-w-md text-white/70">
            ICV-certified manpower supplier based in Mussafah, Abu Dhabi, supplying skilled and semi-skilled workforce to
            oil &amp; gas, construction and MEP projects across the UAE.
          </p>
          <p lang="ar" dir="rtl" className="mt-4 text-lg text-white/60">
            {site.nameArabic}
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {credentials.map((c) => (
              <li key={c.id} className="font-display border border-white/15 px-3 py-1.5 text-sm font-semibold tracking-[0.08em] text-white/80 uppercase">
                {c.title}
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-8 md:col-span-4">
          <div>
            <h2 className="eyebrow text-white/50">Company</h2>
            <ul className="mt-4 space-y-1">
              {[{ href: "/", label: "Home" }, ...nav].map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-10 items-center text-white/80 transition-colors hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow text-white/50">Sectors</h2>
            <ul className="mt-4 space-y-1">
              {sectors.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="inline-flex min-h-10 items-center text-white/80 transition-colors hover:text-white"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="md:col-span-3">
          <h2 className="eyebrow text-white/50">Contact</h2>
          <address className="mt-4 space-y-4 not-italic">
            <p className="flex gap-3 text-white/80">
              <MapPin aria-hidden="true" className="text-brand mt-1 size-5 shrink-0" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
                <br />
                {site.address.poBox}, {site.address.city}, UAE
              </span>
            </p>
            <ul className="space-y-1">
              {site.phones.map((p) => (
                <li key={p.tel}>
                  <a href={`tel:${p.tel}`} className="flex min-h-10 items-center gap-3 text-white/80 hover:text-white">
                    <Phone aria-hidden="true" className="text-brand size-5 shrink-0" />
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${site.email}`} className="flex min-h-10 items-center gap-3 text-white/80 hover:text-white">
                  <Mail aria-hidden="true" className="text-brand size-5 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-10 items-center gap-3 text-white/80 hover:text-white"
                >
                  <WhatsAppIcon className="text-whatsapp size-5 shrink-0" />
                  WhatsApp {site.whatsappDisplay}
                </a>
              </li>
            </ul>
          </address>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {site.copyrightYear} {site.name}. All rights reserved.
          </p>
          <p>Client logos are trademarks of their respective owners.</p>
        </div>
      </div>
    </footer>
  );
}

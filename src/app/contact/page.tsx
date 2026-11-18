import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { WhatsAppIcon } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";
import { EnquiryForm } from "@/components/enquiry-form";
import { site } from "@/lib/site";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact & Request Workers",
  description: `Request manpower or contact ${site.name} in Mussafah, Abu Dhabi. Call ${site.phones[0].display}, WhatsApp ${site.whatsappDisplay} or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};

const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(site.address.mapQuery)}&output=embed`;

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Request workers"
        intro="Send your requirement and our team will reply on WhatsApp with availability and a mobilisation plan."
        image="/images/site-surveyor.webp"
        crumbs={[{ href: "/contact", label: "Contact" }]}
      />

      <section aria-labelledby="form-title" className="py-20 lg:py-28">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="border-line border bg-white p-6 sm:p-10 lg:col-span-8">
            <h2 id="form-title" className="mb-8 text-4xl font-bold uppercase">
              Manpower enquiry
            </h2>
            <Suspense fallback={<EnquiryForm />}>
              <ContactForm />
            </Suspense>
          </div>

          <Reveal as="aside" className="space-y-4 lg:col-span-4" aria-label="Contact details">
            <a
              data-reveal
              href={whatsappLink(defaultWhatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-whatsapp group flex items-center gap-4 p-6 text-white transition-[filter] hover:brightness-95"
            >
              <WhatsAppIcon className="size-10 shrink-0" />
              <span>
                <span className="font-display block text-sm font-semibold tracking-[0.12em] uppercase opacity-85">WhatsApp</span>
                <span className="font-display text-2xl font-bold">{site.whatsappDisplay}</span>
              </span>
            </a>
            <div data-reveal className="bg-ink p-6 text-white">
              <p className="font-display mb-3 text-sm font-semibold tracking-[0.12em] text-white/60 uppercase">Call us</p>
              <ul className="space-y-1">
                {site.phones.map((p) => (
                  <li key={p.tel}>
                    <a href={`tel:${p.tel}`} className="flex min-h-11 items-center gap-3 text-lg hover:text-white/80">
                      <Phone aria-hidden="true" className="text-brand size-5" />
                      <span className="font-semibold">{p.display}</span>
                      <span className="text-sm text-white/50">{p.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a data-reveal href={`mailto:${site.email}`} className="border-line hover:border-ink flex items-center gap-4 border bg-white p-6 transition-colors">
              <Mail aria-hidden="true" className="text-brand size-6 shrink-0" />
              <span>
                <span className="font-display text-muted block text-sm font-semibold tracking-[0.12em] uppercase">Email</span>
                <span className="text-lg font-semibold">{site.email}</span>
              </span>
            </a>
            <address data-reveal className="border-line flex gap-4 border bg-white p-6 not-italic">
              <MapPin aria-hidden="true" className="text-brand size-6 shrink-0" />
              <span>
                <span className="font-display text-muted block text-sm font-semibold tracking-[0.12em] uppercase">Office</span>
                <span className="mt-1 block">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                  <br />
                  {site.address.poBox}, {site.address.city}
                  <br />
                  {site.address.country}
                </span>
              </span>
            </address>
          </Reveal>
        </div>
      </section>

      <section aria-label="Office location map" className="bg-paper-2">
        <iframe
          title={`Map showing ${site.name} office in ${site.address.mapQuery}`}
          src={mapSrc}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="block h-[26rem] w-full border-0 grayscale-[0.4]"
        />
      </section>
    </>
  );
}

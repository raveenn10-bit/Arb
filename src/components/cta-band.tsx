import { Phone } from "lucide-react";
import { Reveal } from "./reveal";
import { ButtonLink, WhatsAppIcon } from "./ui";
import { site } from "@/lib/site";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

export function CtaBand({
  title = "Need a crew on site?",
  body = "Tell us the trades, headcount and location. Our team replies on WhatsApp with availability and a mobilisation plan.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-brand relative isolate overflow-hidden text-white" aria-labelledby="cta-title">
      <div aria-hidden="true" className="bg-ink/15 absolute inset-y-0 right-[18%] -z-10 w-40 -skew-x-[22deg]" />
      <div aria-hidden="true" className="bg-ink absolute inset-y-0 right-[-6rem] -z-10 w-40 -skew-x-[22deg] max-xl:hidden" />
      <Reveal className="container-site flex flex-col gap-10 py-20 lg:flex-row lg:items-center lg:justify-between lg:py-24">
        <div className="max-w-2xl">
          <h2 id="cta-title" data-reveal className="text-5xl leading-[0.92] font-bold uppercase sm:text-6xl">
            {title}
          </h2>
          <p data-reveal className="mt-5 text-lg text-white/85">
            {body}
          </p>
        </div>
        <div data-reveal className="flex shrink-0 flex-col gap-3 sm:flex-row lg:mr-28 xl:mr-40">
          <a
            href={whatsappLink(defaultWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ink hover:bg-steel font-display inline-flex min-h-14 whitespace-nowrap items-center justify-center gap-3 px-7 text-lg font-semibold tracking-[0.06em] uppercase transition-colors"
          >
            <WhatsAppIcon className="size-6" /> WhatsApp us
          </a>
          <ButtonLink href={`tel:${site.phones[0].tel}`} variant="outline-light" icon={false} className="min-h-14 whitespace-nowrap">
            <Phone aria-hidden="true" className="mr-1 inline size-5" />
            {site.phones[0].display}
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

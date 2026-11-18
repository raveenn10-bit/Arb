"use client";

import { useSearchParams } from "next/navigation";
import { EnquiryForm } from "./enquiry-form";

/** Contact-page form that accepts ?sector= and ?trade= presets (e.g. from shared links or ads). */
export function ContactForm() {
  const params = useSearchParams();
  return <EnquiryForm defaultSector={params.get("sector") ?? undefined} defaultTrade={params.get("trade") ?? undefined} />;
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { WhatsAppIcon } from "./ui";
import { defaultWhatsappMessage, whatsappLink } from "@/lib/whatsapp";

export function WhatsAppFab() {
  const reduce = useReducedMotion();
  return (
    <motion.a
      href={whatsappLink(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={reduce ? false : { scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      whileHover={reduce ? undefined : { scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      className="bg-whatsapp fixed right-4 bottom-4 z-40 flex size-14 items-center justify-center rounded-full text-white shadow-[0_10px_30px_-6px_rgb(31_174_75/0.6)] sm:right-6 sm:bottom-6 sm:size-16"
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
    >
      <WhatsAppIcon className="size-7 sm:size-8" />
    </motion.a>
  );
}

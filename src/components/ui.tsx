import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "primary" | "dark" | "light" | "outline-light" | "outline-dark" | "whatsapp";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  dark: "bg-ink text-white hover:bg-steel",
  light: "bg-white text-ink hover:bg-paper-2",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/5",
  "outline-dark": "border border-ink/25 text-ink hover:border-ink hover:bg-ink/5",
  whatsapp: "bg-whatsapp text-white hover:brightness-95",
};

const base =
  "group inline-flex min-h-12 items-center justify-center gap-2.5 px-6 py-3 font-display text-[1.05rem] font-semibold tracking-[0.06em] uppercase transition-[background-color,border-color,color,filter,transform] duration-200 ease-out active:scale-[0.98]";

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  icon = true,
  ...rest
}: { href: string; children: ReactNode; variant?: Variant; icon?: boolean } & Omit<ComponentProps<"a">, "href">) {
  const external = href.startsWith("http");
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <ArrowUpRight
          aria-hidden="true"
          className="size-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </>
  );
  if (/^(tel|mailto):/.test(href)) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {content}
      </a>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${variants[variant]} ${className}`} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {content}
    </Link>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  tone = "dark",
  align = "left",
  className = "",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  tone?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && (
        <p data-reveal className={`eyebrow slash mb-4 ${tone === "light" ? "text-white/70" : "text-muted"}`}>
          {eyebrow}
        </p>
      )}
      <Tag
        data-reveal
        className={`text-[2.5rem] leading-[0.95] font-bold uppercase sm:text-5xl lg:text-[3.75rem] ${
          tone === "light" ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </Tag>
      {intro && (
        <p data-reveal className={`mt-6 max-w-2xl text-lg ${align === "center" ? "mx-auto" : ""} ${tone === "light" ? "text-white/75" : "text-muted"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="currentColor">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.01Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.24 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.24-.64.8-.78.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.06 0 1.22.89 2.39 1.01 2.56.12.16 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
    </svg>
  );
}

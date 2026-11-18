import { LOGO_P, LOGO_SLASH, LOGO_VIEWBOX } from "./logo-paths";

type Props = {
  tone?: "light" | "dark";
  className?: string;
  showWordmark?: boolean;
};

/** Pak Arab monogram (vectorised from the official logo) with a live-text wordmark. */
export function LogoMark({ tone = "dark", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <svg viewBox={LOGO_VIEWBOX} className={className} aria-hidden="true" focusable="false">
      <path d={LOGO_SLASH} fill={tone === "light" ? "#ffffff" : "#16181c"} />
      <path d={LOGO_P} fill="#d0021b" fillRule="evenodd" />
    </svg>
  );
}

export function Logo({ tone = "dark", className = "", showWordmark = true }: Props) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark tone={tone} className="h-10 w-auto shrink-0 sm:h-11" />
      {showWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-[1.15rem] font-bold tracking-[0.02em] uppercase sm:text-[1.3rem] ${
              tone === "light" ? "text-white" : "text-ink"
            }`}
          >
            Pak Arab Manpower
          </span>
          <span className="font-display text-brand mt-1 text-[0.72rem] font-semibold tracking-[0.42em] uppercase sm:text-[0.8rem]">
            Supply LLC
          </span>
        </span>
      )}
    </span>
  );
}

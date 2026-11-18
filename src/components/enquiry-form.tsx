"use client";

import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { AlertCircle, CheckCircle2, X } from "lucide-react";
import { WhatsAppIcon } from "./ui";
import { durations, emirates, sectors, site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

type Fields = {
  name: string;
  company: string;
  phone: string;
  email: string;
  sector: string;
  trades: string;
  headcount: string;
  location: string;
  duration: string;
  startDate: string;
  cicpa: boolean;
  message: string;
};

type Errors = Partial<Record<keyof Fields, string>>;

const empty: Fields = {
  name: "",
  company: "",
  phone: "",
  email: "",
  sector: "",
  trades: "",
  headcount: "",
  location: "",
  duration: "",
  startDate: "",
  cicpa: false,
  message: "",
};

function validate(f: Fields, selectedTrades: string[]): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = "Please enter your full name.";
  if (f.company.trim().length < 2) e.company = "Please enter your company name.";
  const digits = f.phone.replace(/[^\d]/g, "");
  if (digits.length < 7 || digits.length > 15) e.phone = "Enter a valid phone number, e.g. +971 50 123 4567.";
  if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = "Enter a valid email address or leave it blank.";
  if (!f.sector) e.sector = "Select the sector for this requirement.";
  if (!selectedTrades.length && f.trades.trim().length < 2) e.trades = "List the trades or positions you need.";
  const n = Number(f.headcount);
  if (!f.headcount || !Number.isInteger(n) || n < 1 || n > 5000) e.headcount = "Enter the number of workers (1 – 5000).";
  if (!f.location) e.location = "Select the project location.";
  return e;
}

function buildMessage(f: Fields, selectedTrades: string[]): string {
  const trades = [selectedTrades.join(", "), f.trades.trim()].filter(Boolean).join("; ");
  const contact = [
    `*Name:* ${f.name.trim()}`,
    `*Company:* ${f.company.trim()}`,
    `*Phone:* ${f.phone.trim()}`,
    f.email.trim() ? `*Email:* ${f.email.trim()}` : "",
  ];
  const requirement = [
    `*Sector:* ${f.sector}`,
    `*Trades / positions:* ${trades}`,
    `*Headcount:* ${f.headcount}`,
    `*Location:* ${f.location}`,
    f.duration ? `*Contract duration:* ${f.duration}` : "",
    f.startDate ? `*Required from:* ${f.startDate}` : "",
    `*CICPA site:* ${f.cicpa ? "Yes" : "No / not sure"}`,
  ];
  const sections = [
    `*Manpower enquiry from the ${site.shortName} website*`,
    contact.filter(Boolean).join("\n"),
    requirement.filter(Boolean).join("\n"),
    f.message.trim() ? `*Notes:* ${f.message.trim()}` : "",
  ];
  return sections.filter(Boolean).join("\n\n");
}

type Props = {
  selectedTrades?: string[];
  onRemoveTrade?: (t: string) => void;
  defaultSector?: string;
  defaultTrade?: string;
  tone?: "light" | "dark";
  id?: string;
};

export function EnquiryForm({ selectedTrades = [], onRemoveTrade, defaultSector, defaultTrade, tone = "light", id }: Props) {
  const uid = useId();
  const reduce = useReducedMotion();
  const formRef = useRef<HTMLFormElement>(null);
  const [fields, setFields] = useState<Fields>({
    ...empty,
    sector: defaultSector && sectors.some((s) => s.title === defaultSector) ? defaultSector : "",
    trades: defaultTrade ?? "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Fields, boolean>>>({});
  const [sent, setSent] = useState(false);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    const next = { ...fields, [k]: v };
    setFields(next);
    if (touched[k]) setErrors(validate(next, selectedTrades));
  };

  const blur = (k: keyof Fields) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validate(fields, selectedTrades));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validate(fields, selectedTrades);
    setErrors(errs);
    setTouched(Object.fromEntries(Object.keys(empty).map((k) => [k, true])));
    const firstInvalid = Object.keys(errs)[0];
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    const url = whatsappLink(buildMessage(fields, selectedTrades));
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
    setSent(true);
  };

  const dark = tone === "dark";
  const labelCls = `mb-2 block text-[0.95rem] font-semibold ${dark ? "text-white" : "text-ink"}`;
  const inputCls = (k: keyof Fields) =>
    `block w-full min-h-12 border px-4 py-3 text-base transition-[border-color,box-shadow] duration-200 outline-none focus:ring-3 ${
      dark
        ? "bg-white/[0.06] text-white placeholder:text-white/40 border-white/20 focus:border-white focus:ring-white/20"
        : "bg-white text-ink placeholder:text-muted/70 border-line focus:border-ink focus:ring-ink/10"
    } ${touched[k] && errors[k] ? "!border-brand" : ""}`;
  const hintCls = `mt-1.5 text-sm ${dark ? "text-white/60" : "text-muted"}`;

  const field = (k: keyof Fields, label: string, control: ReactNode, opts?: { optional?: boolean; hint?: string; span?: boolean }) => (
    <div className={opts?.span ? "sm:col-span-2" : ""}>
      <label htmlFor={`${uid}-${k}`} className={labelCls}>
        {label}
        {opts?.optional ? (
          <span className={`ml-1 font-normal ${dark ? "text-white/50" : "text-muted"}`}>(optional)</span>
        ) : (
          <span className="text-brand ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
      {control}
      {opts?.hint && !(touched[k] && errors[k]) && (
        <p id={`${uid}-${k}-hint`} className={hintCls}>
          {opts.hint}
        </p>
      )}
      {touched[k] && errors[k] && (
        <p id={`${uid}-${k}-err`} role="alert" className={`mt-1.5 flex items-start gap-1.5 text-sm font-medium ${dark ? "text-[#ff8a95]" : "text-brand-dark"}`}>
          <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
          {errors[k]}
        </p>
      )}
    </div>
  );

  const aria = (k: keyof Fields, hint?: boolean) => ({
    id: `${uid}-${k}`,
    name: k,
    "aria-invalid": touched[k] && errors[k] ? true : undefined,
    "aria-describedby": touched[k] && errors[k] ? `${uid}-${k}-err` : hint ? `${uid}-${k}-hint` : undefined,
    onBlur: () => blur(k),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate id={id} aria-label="Manpower enquiry" className="relative">
      <div className="grid gap-x-5 gap-y-6 sm:grid-cols-2">
        {field("name", "Full name", <input type="text" autoComplete="name" className={inputCls("name")} value={fields.name} onChange={(e) => set("name", e.target.value)} {...aria("name")} />)}
        {field("company", "Company", <input type="text" autoComplete="organization" className={inputCls("company")} value={fields.company} onChange={(e) => set("company", e.target.value)} {...aria("company")} />)}
        {field("phone", "Phone / WhatsApp", <input type="tel" inputMode="tel" autoComplete="tel" placeholder="+971 50 123 4567" className={inputCls("phone")} value={fields.phone} onChange={(e) => set("phone", e.target.value)} {...aria("phone")} />)}
        {field("email", "Email", <input type="email" inputMode="email" autoComplete="email" className={inputCls("email")} value={fields.email} onChange={(e) => set("email", e.target.value)} {...aria("email")} />, { optional: true })}
        {field(
          "sector",
          "Sector",
          <select className={inputCls("sector")} value={fields.sector} onChange={(e) => set("sector", e.target.value)} {...aria("sector")}>
            <option value="">Select a sector</option>
            {sectors.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.title}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>,
        )}
        {field(
          "location",
          "Project location",
          <select className={inputCls("location")} value={fields.location} onChange={(e) => set("location", e.target.value)} {...aria("location")}>
            <option value="">Select a location</option>
            {emirates.map((em) => (
              <option key={em} value={em}>
                {em}
              </option>
            ))}
          </select>,
        )}

        <div className="sm:col-span-2">
          {selectedTrades.length > 0 && (
            <div className="mb-4">
              <p className={labelCls}>Selected trades ({selectedTrades.length})</p>
              <ul className="flex flex-wrap gap-2" aria-live="polite">
                <AnimatePresence initial={false}>
                  {selectedTrades.map((t) => (
                    <motion.li
                      key={t}
                      layout={!reduce}
                      initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className={`inline-flex items-center gap-1 py-1 pr-1 pl-3 text-sm font-medium ${dark ? "bg-white/10 text-white" : "bg-ink text-white"}`}
                    >
                      {t}
                      {onRemoveTrade && (
                        <button
                          type="button"
                          onClick={() => onRemoveTrade(t)}
                          aria-label={`Remove ${t}`}
                          className="inline-flex size-8 items-center justify-center hover:bg-white/15"
                        >
                          <X aria-hidden="true" className="size-4" />
                        </button>
                      )}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
          {field(
            "trades",
            selectedTrades.length ? "Other trades or positions" : "Trades / positions required",
            <input
              type="text"
              className={inputCls("trades")}
              placeholder="e.g. 10 scaffolders, 4 riggers, 1 safety officer"
              value={fields.trades}
              onChange={(e) => set("trades", e.target.value)}
              {...aria("trades", true)}
            />,
            { optional: selectedTrades.length > 0, hint: "List each trade and quantity if you know it." },
          )}
        </div>

        {field("headcount", "Total workers needed", <input type="number" inputMode="numeric" min={1} max={5000} className={inputCls("headcount")} value={fields.headcount} onChange={(e) => set("headcount", e.target.value)} {...aria("headcount")} />)}
        {field(
          "duration",
          "Contract duration",
          <select className={inputCls("duration")} value={fields.duration} onChange={(e) => set("duration", e.target.value)} {...aria("duration")}>
            <option value="">Select duration</option>
            {durations.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>,
          { optional: true },
        )}
        {field("startDate", "Required from", <input type="date" className={`${inputCls("startDate")} ${dark ? "[color-scheme:dark]" : ""}`} value={fields.startDate} onChange={(e) => set("startDate", e.target.value)} {...aria("startDate")} />, { optional: true })}

        <div className="flex items-end">
          <label
            htmlFor={`${uid}-cicpa`}
            className={`flex min-h-12 w-full items-center gap-3 border px-4 py-3 ${dark ? "border-white/20 text-white" : "border-line text-ink bg-white"}`}
          >
            <input
              id={`${uid}-cicpa`}
              name="cicpa"
              type="checkbox"
              checked={fields.cicpa}
              onChange={(e) => set("cicpa", e.target.checked)}
              className="accent-brand size-5 shrink-0"
            />
            <span className="text-[0.95rem] font-semibold">Site requires CICPA permits</span>
          </label>
        </div>

        {field(
          "message",
          "Additional details",
          <textarea rows={4} className={`${inputCls("message")} resize-y`} value={fields.message} onChange={(e) => set("message", e.target.value)} {...aria("message")} placeholder="Shift pattern, certifications required, accommodation/transport, etc." />,
          { optional: true, span: true },
        )}
      </div>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className={`max-w-md text-sm ${dark ? "text-white/60" : "text-muted"}`}>
          Submitting opens WhatsApp with your enquiry ready to send to our team on {site.whatsappDisplay}. Nothing is stored on this website.
        </p>
        <button
          type="submit"
          className="bg-whatsapp font-display group inline-flex min-h-14 shrink-0 items-center justify-center gap-3 px-7 text-lg font-semibold tracking-[0.06em] text-white uppercase transition-[filter,transform] duration-200 hover:brightness-95 active:scale-[0.98]"
        >
          <WhatsAppIcon className="size-6" />
          Send via WhatsApp
        </button>
      </div>

      <AnimatePresence>
        {sent && (
          <motion.div
            role="status"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-6 flex items-start gap-3 border-l-4 border-whatsapp p-4 ${dark ? "bg-white/[0.06] text-white" : "bg-white text-ink"}`}
          >
            <CheckCircle2 aria-hidden="true" className="text-whatsapp mt-0.5 size-5 shrink-0" />
            <p className="text-[0.95rem]">
              WhatsApp should have opened with your enquiry. Press <strong>Send</strong> in WhatsApp to reach our team. If it didn&apos;t open,{" "}
              <a href={whatsappLink(buildMessage(fields, selectedTrades))} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                tap here
              </a>{" "}
              or call {site.phones[0].display}.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

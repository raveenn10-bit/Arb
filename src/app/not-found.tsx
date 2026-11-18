import Link from "next/link";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="bg-ink grain relative flex min-h-[80svh] items-center overflow-hidden text-white">
      <div aria-hidden="true" className="bg-brand absolute top-0 right-[12%] h-full w-20 -skew-x-[22deg] opacity-90" />
      <div className="container-site relative pt-28 pb-20">
        <p className="eyebrow slash mb-5 text-white/70">Error 404</p>
        <h1 className="text-6xl leading-[0.9] font-bold uppercase sm:text-8xl">Page not found</h1>
        <p className="mt-6 max-w-lg text-lg text-white/75">
          The page you&apos;re looking for has moved or doesn&apos;t exist. Head back home or send us your manpower requirement.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Request workers
          </ButtonLink>
        </div>
        <p className="mt-10 text-white/60">
          Or browse our <Link href="/workforce" className="text-white underline underline-offset-4">trades directory</Link>.
        </p>
      </div>
    </section>
  );
}

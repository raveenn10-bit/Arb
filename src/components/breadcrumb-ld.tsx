import { JsonLd } from "./json-ld";
import { site } from "@/lib/site";

/** Server-rendered BreadcrumbList structured data matching the visible breadcrumb trail. */
export function BreadcrumbLd({ crumbs }: { crumbs: { href: string; label: string }[] }) {
  const items = [{ href: "/", label: "Home" }, ...crumbs];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((c, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: c.label,
          item: `${site.url}${c.href === "/" ? "" : c.href}`,
        })),
      }}
    />
  );
}

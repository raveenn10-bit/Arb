import type { Metadata, Viewport } from "next";
import "./globals.css";
import { barlow, barlowCondensed } from "./fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppFab } from "@/components/whatsapp-fab";
import { JsonLd } from "@/components/json-ld";
import { sectors, site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Industrial Manpower Supply in Abu Dhabi, UAE`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "manpower supply Abu Dhabi",
    "manpower supply UAE",
    "oil and gas manpower UAE",
    "ICV certified manpower company",
    "ADNOC approved manpower supplier",
    "CICPA manpower",
    "construction labour supply Mussafah",
    "MEP manpower supply",
    "welders scaffolders riggers supply UAE",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: "/" },
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | Industrial Workforce Solutions`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Industrial Workforce Solutions`,
    description: site.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#0d0f12",
  width: "device-width",
  initialScale: 1,
};

const organizationLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: [site.shortName, site.nameArabic],
  url: site.url,
  logo: `${site.url}/images/logo-mark.svg`,
  image: `${site.url}/opengraph-image`,
  description: site.description,
  email: site.email,
  telephone: site.phones[0].tel,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    postOfficeBoxNumber: site.address.poBox.replace(/\D/g, ""),
    addressLocality: site.address.city,
    addressRegion: "Abu Dhabi",
    addressCountry: site.address.countryCode,
  },
  areaServed: { "@type": "Country", name: "United Arab Emirates" },
  contactPoint: site.phones.map((p) => ({
    "@type": "ContactPoint",
    telephone: p.tel,
    contactType: "sales",
    areaServed: "AE",
    availableLanguage: ["English"],
  })),
  knowsAbout: sectors.map((s) => s.title),
  hasCredential: [
    "UAE In-Country Value (ICV) Certificate",
    "ISO 9001:2015",
    "ISO 14001:2015",
    "ISO 45001:2018",
  ].map((name) => ({ "@type": "EducationalOccupationalCredential", name })),
};

/** Runs before paint: enables motion "from" states only when JS is running, with a safety fallback. */
const motionInit = `(function(){var d=document.documentElement;d.classList.add('js-motion');setTimeout(function(){d.classList.remove('js-motion')},3500);})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AE" className={`${barlow.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionInit }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <JsonLd data={organizationLd} />
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}

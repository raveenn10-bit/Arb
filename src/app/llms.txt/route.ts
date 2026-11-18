import { clients, credentials, emirates, faqs, isoStandards, sectors, site, trades } from "@/lib/site";

/**
 * /llms.txt — a plain-language summary of the business for AI assistants (llmstxt.org convention).
 * Built from the same data as the website, so the facts never drift from what visitors see.
 */
export function GET() {
  const u = site.url;
  const body = `# ${site.name}

> ${site.description}

${site.name} (Arabic: ${site.nameArabic}) is a manpower supply company based in Mussafah, Abu Dhabi, United Arab Emirates. It supplies skilled, semi-skilled and supervisory workforce to oil & gas, civil construction, mechanical and electrical/MEP projects, onshore and offshore, on short- and long-term contracts.

## Credentials
${credentials.map((c) => `- ${c.title}: ${c.detail}`).join("\n")}
${isoStandards.map((s) => `- ${s.code}: ${s.name}`).join("\n")}

## Sectors served
${sectors.map((s) => `- [${s.title}](${u}/services/${s.slug}): ${s.summary}`).join("\n")}

## Trades supplied (${trades.length} categories)
${trades.map((t) => t.name).join(", ")}.

## Service area
All seven Emirates, onshore and offshore. Locations covered include: ${emirates.join(", ")}.

## How it works
Clients share the trades, headcount, site location and contract length. Pak Arab shortlists and vets candidates, completes induction and site documentation (including CICPA permits where required), and manages payroll, benefits and compliance for the duration of the contract.

## Selected clients
${clients.map((c) => c.name).join("; ")}.

## Frequently asked questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Contact
- Phone: ${site.phones.map((p) => p.display).join(", ")}
- WhatsApp: ${site.whatsappDisplay}
- Email: ${site.email}
- Address: ${site.address.line1}, ${site.address.line2}, ${site.address.poBox}, ${site.address.city}, ${site.address.country}

## Key pages
- [Home](${u}/)
- [About, mission and quality management](${u}/about)
- [Services](${u}/services)
- [Workforce and trades directory](${u}/workforce)
- [Clients](${u}/clients)
- [Contact and manpower enquiry](${u}/contact)
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

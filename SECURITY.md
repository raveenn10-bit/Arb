# Security scope

This is a public, statically prerendered Next.js marketing site. There are no API endpoints, account sessions, database, payment processing or file uploads. Enquiry forms build a WhatsApp message in the browser and open the company's fixed WhatsApp number; visitors review and send it themselves. Nothing is stored or transmitted by this site. Input limits are client-side usability checks, not server-side validation.

## Controls

- `next.config.ts` sets a Content-Security-Policy, anti-framing (`frame-ancestors 'none'`, `X-Frame-Options: DENY`), MIME-sniffing protection, HSTS, referrer policy, permissions restrictions and opener isolation on every route.
- Scripts, styles and fonts load only from this site's origin. Fonts are self-hosted, and the only third-party frame allowed is the Google Maps embed.
- `script-src` includes `'unsafe-inline'` because Next.js inlines small bootstrap scripts; nonces would force every page to render dynamically. No third-party scripts are loaded.
- Dependencies are locked and installed with `npm ci`. GitHub Actions runs the production dependency audit, lint, typecheck and build on every push and pull request. Dependabot proposes weekly updates, which are not merged automatically.
- Environment files and Vercel credentials are git-ignored. Never put secrets in `public/` or a `NEXT_PUBLIC_` variable.

## Known advisory

`npm audit` (including dev dependencies) reports a ReDoS advisory in `picomatch` (GHSA-fc5q-39xc-vjpf), pulled in only by ESLint tooling. It does not ship to the browser, and no patched release exists yet. CI audits production dependencies (`--omit=dev`). Re-check when a fixed `picomatch` is published.

## Verification

Run `npm ci`, `npm audit --omit=dev`, `npm run lint`, `npm run typecheck` and `npm run build`, then `npm start` to serve the production build with the same headers as Vercel. After CSP changes, check navigation, animations, the workforce filter, the Google Maps embed and the WhatsApp handoff.

## Account controls

GitHub/Vercel 2FA, branch protection, DNS/registrar access and account credentials are outside this codebase. Review access and dependency alerts regularly. If a backend is added later, implement server-side validation, authorisation, rate limiting and CSRF protection.

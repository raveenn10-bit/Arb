# Security scope

This is a public static React/Vite marketing site. There are no application API endpoints, account sessions, database, payment processing or file uploads in this repository. The contact form opens a fixed WhatsApp destination with URL-encoded text for the visitor to review and send; input bounds are client-side usability protections, not server-side validation.

## Controls

- Vercel applies CSP, anti-framing, MIME-sniffing protection, HSTS, referrer policy, permissions restrictions and opener isolation on all routes.
- Scripts load only from this site's origin; inline event handlers, eval, plugins, base-tag overrides, framing and native form POSTs are blocked.
- Google Fonts and the Google Maps iframe are explicitly permitted. Inline styles remain allowed for GSAP/Vanta animation; inline JavaScript is not allowed.
- Dependencies are pinned and deployed with npm ci. Security/build checks run on pushes and pull requests. Dependabot proposes weekly dependency and Actions updates; updates are not automatically merged.
- Local secrets, environment files and Vercel credentials are ignored. No browser application secret should ever be added to public/ or a VITE_ variable.
- Source maps are disabled for production. Public JavaScript and assets are necessarily downloadable; this is not a confidentiality boundary.

## Verification

Run npm ci, npm run test:security, npm audit, and npm run build. Use npm run preview to serve the production bundle with the same headers as Vercel. Check normal navigation, animated sections, workforce filtering, Google Fonts, Maps and the WhatsApp handoff after CSP changes.

The initial dependency audit reported no known vulnerabilities; this is time-sensitive and not proof of absence of security defects. A limited tracked-source pattern check found no matching private-key/API-token patterns. It is not a full history or credential audit.

## Account controls

GitHub/Vercel owner 2FA, recovery methods, access reviews, branch protection, DNS/registrar controls and account credentials are separate from the website code. Existing hosting access protections were preserved. No penetration-test certification or guarantee of complete security is implied. Review access and dependency alerts regularly. If adding a backend later, implement server validation, authorization, rate limits and CSRF protection as appropriate.

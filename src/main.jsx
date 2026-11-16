import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDownRight, ArrowRight, BadgeCheck, Building2, ChevronRight,
  CircleCheck, Construction, Factory, Gauge, Handshake, HardHat, Headphones,
  Mail, MapPin, Menu, Phone, ShieldCheck, Sparkles, UsersRound, Wrench, X,
} from 'lucide-react';
import './styles.css';
import { buildEnquiryMessage, FIELD_LIMITS } from './enquiry.mjs';

gsap.registerPlugin(ScrollTrigger);

const PHONE_DISPLAY = '+971 2 679 2576';
const PHONE_LINK = '+97126792576';
const MOBILE_ONE = '+971 55 384 2555';
const MOBILE_TWO = '+971 56 699 5962';
const WHATSAPP = '97125511925';
const EMAIL = 'info@pakarabmps.com';
const ADDRESS = 'Office No. 01, M-Floor, Building C-225, Shabiya-12, Mussafah Commercial, P.O. Box 133046, Abu Dhabi, UAE';

const services = [
  { n: '01', icon: UsersRound, title: 'Manpower services', text: 'Workforce sourcing and supply aligned with client requirements, skills and operational needs.' },
  { n: '02', icon: Gauge, title: 'Process & benefits', text: 'Flexible staffing that adapts to changing business needs, with payroll, benefits and compliance coordination to reduce the administrative workload.' },
  { n: '03', icon: Headphones, title: 'Workforce support', text: 'Vetted personnel supported by thorough inductions and regular training, with scalable teams aligned to your project requirements.' },
  { n: '04', icon: Factory, title: 'Oil & gas', text: 'Industrial manpower support built for demanding oil and gas environments.' },
  { n: '05', icon: Construction, title: 'Civil & construction', text: 'Dependable workforce support for civil projects, construction sites and skilled trades.' },
  { n: '06', icon: Wrench, title: 'Mechanical & electrical', text: 'Skilled technical personnel for mechanical, electrical and industrial requirements.' },
];

const sectors = [
  { icon: Factory, title: 'Oil & Gas', roles: 'Site managers, engineers, QA/QC, HSE, riggers, scaffolders, welders and fabricators.' },
  { icon: Construction, title: 'Civil & Construction', roles: 'General labour, steel fixers, carpenters, masons, operators, supervisors and project support.' },
  { icon: Wrench, title: 'Mechanical', roles: 'Mechanical technicians, millwrights, pipe trades, fitters, riggers and maintenance support.' },
  { icon: Sparkles, title: 'Electrical', roles: 'Electrical and instrumentation technicians, electricians and related industrial support roles.' },
];

const clients = [
  ['ADNOC', '01-adnoc.webp'], ['ALTRAD', '02-altrad.webp'], ['Etisalat by e&', '03-etisalat-by-e-and.webp'],
  ['Ali & Sons', '04-ali-and-sons.webp'], ['ASGC', '05-asgc.webp'], ['Al Jaber Group', '06-al-jaber-group.webp'],
  ['Probus Engineering & Construction', '07-probus-engineering-and-construction.webp'], ['GASCO', '08-gasco.webp'],
  ['China Comservice', '09-china-comservice.webp'], ['EPPI', '10-eppi.webp'], ['Emirates Steel', '11-emirates-steel.webp'],
  ['MICODA', '12-micoda.webp'], ['ROBT Stone', '13-robt-stone.webp'], ['Denholm Yam', '14-denholm-yam.webp'],
  ['Lamprell', '15-lamprell.webp'], ['Descon Engineering', '16-descon-engineering.webp'], ['NPCC', '17-npcc.webp'],
  ['GISCO', '18-gisco.webp'], ['Al Shoumoukh General Trading', '19-al-shoumoukh-general-trading.webp'], ['NSH', '20-nsh.webp'],
  ['Tekzone Industrial Construction', '21-tekzone-industrial-construction.webp'], ['ARCHIRODON', '22-archirodon.webp'],
  ['Tecnicas Reunidas', '23-tecnicas-reunidas.webp'], ['ALNASR', '24-alnasr.webp'], ['Galva Coat Industries', '25-galva-coat-industries.webp'],
  ['CPP China Petroleum Pipeline Engineering', '26-cpp-china-petroleum-pipeline-engineering.webp'],
];

const workforceGroups = [
  { id: 'mep', title: 'Onshore & offshore · MEP', image: '/images/generated/hero.webp', intro: 'Technical and non-technical specialists for oil, gas and industrial projects. Available for short- and long-term requirements.', roles: ['Site Manager', 'Mechanical Engineer', 'Project Engineer', 'Construction Engineer', 'Welding Engineer', 'Welding Supervisors', 'QA/QC Inspector', 'Safety Officer', 'Piping Foreman', 'Job Performer (ADNOC approved)', 'Performing Authority', 'Project Coordinator', 'Material Coordinator', 'Structural Supervisor', 'Structural Foreman', 'Rigging Supervisor', 'Rigging Foreman', 'Scaffolders', 'Multi Welder (GTAW/SMAW)', 'Welder (SMAW)', 'Piping & Structural Fabricator', 'Piping & Structural Fitter', 'Grinder Men', 'Iron Workers', 'Painters (Brush & Spray)', 'Erectors', 'Sand Blasters', 'Riggers', 'Mechanical Helper', 'Man-lift Operators', 'Industrial Electrician', 'Instrument Technician', 'Millwright Technician'] },
  { id: 'civil', title: 'Onshore & offshore · Civil', image: '/images/generated/civil.webp', intro: 'Skilled trades, site operations and project support for construction and infrastructure across the UAE.', roles: ['Helpers (General Labourers)', 'Flagmen', 'Fire Watchers', 'Steel Fixers', 'Bar Benders', 'Shuttering Carpenters', 'Gypsum Carpenters', 'Finishing Carpenters', 'Block / Plaster Mason', 'Ceramic Masons', 'Interlock Masons', 'Pasco Masons', 'Concrete Masons', 'Painters (Brush)', 'Painters (Spray)', 'Scaffolders', 'Riggers & Jointers', 'Domestic Electricians', 'HVAC Technicians', 'Ductmen', 'Plumbers', 'Forklift Operators', 'Light Duty Drivers', 'Heavy Duty Drivers', 'Hoist Operators', 'Chargehands Civil', 'Foremen Civil', 'Supervisors Civil', 'Office Boys', 'Cleaners', 'Admin & Clerical Staff', 'Document Controller', 'HSE / Safety Officers', 'Project Coordinators', 'Gardeners', 'Landscape Workers'] },
];

function Workforce({ whatsapp }) {
  const [active, setActive] = useState('mep');
  const [query, setQuery] = useState('');
  const group = workforceGroups.find(item => item.id === active);
  const roles = group.roles.filter(role => role.toLowerCase().includes(query.toLowerCase().trim()));
  return <section className="section workforce" id="profile"><div className="container">
    <div className="section-head"><div><div className="eyebrow eyebrow--dark"><span /> Workforce directory</div><h2>The right expertise.<br /><em>For every stage.</em></h2></div><p>Explore the roles in our company profile, then tell us the skills, headcount and project duration you need.</p></div>
    <div className="workforce__toolbar"><div className="workforce__tabs" role="tablist" aria-label="Workforce sector">{workforceGroups.map(item => <button key={item.id} type="button" role="tab" id={`tab-${item.id}`} aria-selected={active === item.id} aria-controls="workforce-panel" onClick={() => setActive(item.id)}>{item.id === 'mep' ? 'Industrial & MEP' : 'Civil & construction'}</button>)}</div><label className="role-search">Find a role<input type="search" maxLength={100} value={query} onChange={e => setQuery(e.target.value)} placeholder="Search engineers, welders…" /></label></div>
    <div className="workforce__body" id="workforce-panel" role="tabpanel" aria-labelledby={`tab-${active}`}>
      <aside className="workforce__visual"><img src={group.image} alt={active === 'mep' ? 'Illustrative industrial engineering team at a refinery' : 'Illustrative construction team reviewing site plans'} loading="lazy" /><div><span>PROJECT-ALIGNED PEOPLE</span><h3>{group.title}</h3><p>{group.intro}</p><a className="button button--red" href={whatsapp(`Hello Pak Arab, I would like to discuss ${group.title} workforce requirements.`)} target="_blank" rel="noopener noreferrer">Request this workforce <ArrowRight /></a></div></aside>
      <div className="workforce__directory"><p className="role-count" aria-live="polite">{roles.length} roles{query ? ' matching your search' : ' in this discipline'}</p><ul>{roles.map(role => <li key={role}><CircleCheck />{role}</li>)}</ul>{!roles.length && <p>No roles match “{query}”. Try another term or select the other sector.</p>}<p className="workforce__note">Role availability and project-specific approvals are confirmed during your enquiry.</p></div>
    </div>
  </div></section>;
}

const faqs = [
  ['What manpower services does Pak Arab Manpower Supply LLC provide?', 'We support requirement-led workforce sourcing and coordination across oil & gas, civil construction, mechanical and electrical fields.'],
  ['Which workforce roles can you support?', 'The company profile covers site managers, engineers, QA/QC and HSE personnel, riggers, scaffolders, welders, fabricators, technicians, electricians, operators and other skilled project roles.'],
  ['How do we start a manpower request?', 'Send the required roles, project location and expected timeline through WhatsApp, email or the enquiry form. Our team can then continue the requirement discussion directly.'],
  ['Where is Pak Arab Manpower Supply located?', 'Pak Arab Manpower Supply LLC is based in Abu Dhabi, United Arab Emirates.'],
  ['How does your workforce process work?', 'We begin by understanding the requirement, then move through sourcing, candidate evaluation and workforce coordination around the stated deployment needs.'],
  ['Can we discuss an urgent project requirement?', `Yes. Use the floating WhatsApp button or call ${PHONE_DISPLAY} to begin a direct conversation with the team.`],
];

function Logo({ light = false }) {
  return <a className={`brand ${light ? 'brand--light' : ''}`} href="#home" aria-label="Pak Arab Manpower Supply LLC home">
    <img src="/images/pak-arab-logo.png" alt="Pak Arab Manpower Supply LLC" />
    <span><b>PAK ARAB</b><small>MANPOWER SUPPLY LLC</small></span>
  </a>;
}

function App() {
  const root = useRef(null);
  const vantaEl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    const ctx = gsap.context(() => {
      const desktop = window.matchMedia('(min-width: 701px)').matches;
      gsap.from('.hero__eyebrow, .hero__lead, .hero__actions, .hero__proof', {
        y: 34, opacity: 0, duration: .85, stagger: .11, ease: 'power3.out', delay: .15,
      });
      gsap.from('.hero__line', { yPercent: 115, rotate: 2, duration: 1.05, stagger: .12, ease: 'power4.out', delay: .12 });
      gsap.from('.hero__visual-card', { x: 55, opacity: 0, duration: 1.1, ease: 'power3.out', delay: .35 });
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 42, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });
      gsap.utils.toArray('.stagger-grid').forEach((grid) => {
        const horizontal = !desktop && grid.classList.contains('mobile-auto-scroll');
        gsap.from(grid.children, { x: horizontal ? 42 : 0, y: horizontal ? 0 : 34, scale: horizontal ? .94 : 1, opacity: 0, duration: .68, stagger: .08, ease: 'power3.out', scrollTrigger: { trigger: grid, start: 'top 90%', once: true } });
      });
      gsap.utils.toArray('.section h2, .capability-banner h2, .quality h2, .contact h2, .site-showcase__title h2').forEach((title) => {
        gsap.fromTo(title, { y: desktop ? 48 : 30, opacity: 0, filter: 'blur(8px)', clipPath: 'inset(0 0 100% 0)' }, { y: 0, opacity: 1, filter: 'blur(0px)', clipPath: 'inset(0 0 0% 0)', duration: .95, ease: 'power4.out', scrollTrigger: { trigger: title, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray('.eyebrow > span').forEach((line) => {
        gsap.from(line, { scaleX: 0, transformOrigin: 'left center', duration: .75, ease: 'power3.out', scrollTrigger: { trigger: line, start: 'top 92%', once: true } });
      });
      gsap.utils.toArray('.service-card__top svg, .sector-list article > svg, .trust-strip svg, .about__stamp svg').forEach((icon) => {
        gsap.from(icon, { scale: .25, rotate: -28, opacity: 0, duration: .65, ease: 'back.out(1.8)', scrollTrigger: { trigger: icon, start: 'top 92%', once: true } });
      });
      gsap.from('.site-showcase__card', { scale: .88, y: 35, opacity: 0, duration: .8, stagger: .14, ease: 'back.out(1.35)', scrollTrigger: { trigger: '.site-showcase', start: 'top 72%', once: true } });
      if (desktop) {
        gsap.to('.hero__image', { yPercent: 8, scale: 1.04, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
        gsap.to('.capability-banner > img', { scale: 1.09, yPercent: 5, ease: 'none', scrollTrigger: { trigger: '.capability-banner', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        gsap.to('.site-showcase > img', { scale: 1.08, yPercent: 6, ease: 'none', scrollTrigger: { trigger: '.site-showcase', start: 'top bottom', end: 'bottom top', scrub: 1 } });
      } else {
        gsap.fromTo('.hero__image', { scale: 1.14, xPercent: 3 }, { scale: 1, xPercent: 0, duration: 1.8, ease: 'power2.out' });
        gsap.from('.trust-strip__grid > div', { y: 22, opacity: 0, duration: .58, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: '.trust-strip', start: 'top 94%', once: true } });
        gsap.from('.about__points > div', { x: 32, opacity: 0, duration: .62, stagger: .1, ease: 'power3.out', scrollTrigger: { trigger: '.about__points', start: 'top 92%', once: true } });
        gsap.to('.hero__proof svg', { y: -3, duration: 1.05, stagger: .16, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      }
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    const refreshTimer = window.setTimeout(refresh, 350);
    window.addEventListener('load', refresh, { once: true });
    window.addEventListener('orientationchange', refresh);
    return () => {
      window.clearTimeout(refreshTimer);
      window.removeEventListener('load', refresh);
      window.removeEventListener('orientationchange', refresh);
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    let effect;
    let cancelled = false;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || window.innerWidth < 760) return;
    const probe = document.createElement('canvas');
    const hasWebGL = Boolean(probe.getContext('webgl2') || probe.getContext('webgl'));
    if (!hasWebGL) return;
    (async () => {
      try {
        const THREE = await import('three');
        const vantaModule = await import('vanta/dist/vanta.net.min.js');
        if (cancelled || !vantaEl.current) return;
        const NET = vantaModule.default?.default || vantaModule.default;
        effect = NET({
          el: vantaEl.current, THREE, mouseControls: true, touchControls: false,
          gyroControls: false, minHeight: 420, minWidth: 200, scale: 1,
          scaleMobile: 1, color: 0x5f7897, backgroundColor: 0x07111f,
          points: 7, maxDistance: 18, spacing: 20, showDots: true,
        });
      } catch {
        effect = undefined;
      }
    })();
    return () => { cancelled = true; effect?.destroy(); };
  }, []);

  const whatsapp = (message = 'Hello Pak Arab Manpower Supply LLC, I would like to discuss manpower requirements.') =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;

  return <div ref={root}>
    <div className="topline"><div className="container topline__inner">
      <span><MapPin size={13} /> Abu Dhabi, United Arab Emirates</span>
      <div><a href={`tel:${PHONE_LINK}`}><Phone size={13} /> {PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}><Mail size={13} /> {EMAIL}</a></div>
    </div></div>

    <header className="header">
      <div className="container nav">
        <Logo />
        <nav className={`nav__links ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {['About', 'Purpose', 'Services', 'Profile', 'Clients', 'FAQ'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item === 'Profile' ? 'Workforce' : item === 'Purpose' ? 'Mission & Vision' : item}</a>)}
          <a className="button button--dark nav__cta" href="#contact" onClick={() => setMenuOpen(false)}>Talk to our team <ArrowUpRight /></a>
        </nav>
        <button className="nav__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <picture className="hero__picture">
          <source media="(max-width: 700px)" srcSet="/images/generated/hero-mobile.webp" />
          <img className="hero__image" src="/images/generated/hero.webp" alt="Industrial workforce at a UAE energy facility" fetchPriority="high" />
        </picture>
        <div className="hero__shade" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="eyebrow hero__eyebrow"><span /> UAE Industrial Workforce Partner</div>
            <h1><span className="hero__line-wrap"><span className="hero__line">Industrial workforce.</span></span><span className="hero__line-wrap"><span className="hero__line"><em>Ready for the real world.</em></span></span></h1>
            <p className="hero__lead">Professional manpower sourcing and workforce coordination for oil & gas, energy, EPC and industrial operations across the UAE.</p>
            <div className="hero__actions">
              <a className="button button--red" href={whatsapp()} target="_blank" rel="noopener noreferrer">Discuss your requirement <ArrowRight /></a>
              <a className="button button--glass" href="#services">Explore capabilities <ArrowDownRight /></a>
            </div>
            <div className="hero__proof">
              <span><CircleCheck /> Requirement-led sourcing</span>
              <span><CircleCheck /> Site-ready personnel</span>
              <span><CircleCheck /> Quality-focused process</span>
            </div>
          </div>
          <aside className="hero__visual-card" aria-label="Service highlights">
            <div className="hero__card-top"><span>Workforce delivery</span><BadgeCheck /></div>
            <strong>From requirement<br />to readiness.</strong>
            <div className="hero__card-line" />
            <div className="hero__card-steps"><span>01 <small>Source</small></span><span>02 <small>Evaluate</small></span><span>03 <small>Coordinate</small></span></div>
          </aside>
        </div>
        <a className="hero__scroll" href="#about"><span /> Scroll to explore</a>
      </section>

      <section className="trust-strip" aria-label="Key strengths"><div className="container trust-strip__grid stagger-grid">
        <div><ShieldCheck /><span><b>Quality-led</b><small>Structured workforce process</small></span></div>
        <div><HardHat /><span><b>Industry-ready</b><small>Skills aligned to site needs</small></span></div>
        <div><Building2 /><span><b>Multi-sector</b><small>Core technical disciplines</small></span></div>
        <div><Headphones /><span><b>Responsive</b><small>Direct client coordination</small></span></div>
      </div></section>

      <section className="section about" id="about"><div className="container about__grid">
        <div className="about__media reveal"><img src="/images/generated/planning.webp" alt="Workforce planning meeting in Abu Dhabi" loading="lazy" /><div className="about__stamp"><HardHat /><span>Built around<br /><b>your site.</b></span></div></div>
        <div className="about__copy reveal">
          <div className="eyebrow eyebrow--dark"><span /> Who we are</div>
          <h2>A workforce partner built around <em>quality, people and delivery.</em></h2>
          <p className="section-lead">Pak Arab Manpower Supply LLC partners with clients to understand project goals, source capable personnel and coordinate workforce solutions around genuine operational needs.</p>
          <div className="about__points">
            <div><span>01</span><p><b>Reliable workforce solutions</b>Matching people and skills to the requirements of clients and projects.</p></div>
            <div><span>02</span><p><b>Quality & assurance</b>A focused process supported by management, coordination and workforce readiness.</p></div>
            <div><span>03</span><p><b>Operational alignment</b>Candidate sourcing and selection shaped by capability, role and deployment needs.</p></div>
          </div>
          <a className="text-link" href="#process">How our process works <ArrowRight /></a>
        </div>
      </div></section>

      <section className="section purpose" id="purpose" aria-labelledby="purpose-title"><div className="container">
        <div className="purpose__intro"><div><div className="eyebrow eyebrow--dark"><span /> What drives Pak Arab</div><h2 id="purpose-title">Our purpose.<br /><em>People. Possibility.</em></h2></div><p>One shared ambition. Two guiding principles.<br />Connecting the right people to a better future.</p></div>
        <div className="purpose__grid">
          <article className="purpose-card purpose-card--mission" aria-labelledby="mission-title">
            <div className="purpose-card__top"><span>01 / THE WORK WE DO</span><span className="purpose-card__symbol" aria-hidden="true"><UsersRound /></span></div>
            <h3 id="mission-title">Our <strong>Mission.</strong></h3>
            <p className="purpose-card__statement">Bridging talent.<br />Building opportunity.</p>
            <img className="purpose-card__art" src="/images/generated/mission-brand.webp" alt="Illustration of an engineering team collaborating around a project drawing" width="1536" height="1024" loading="lazy" decoding="async" />
            <div className="purpose-card__copy"><p>To bridge the gap between talent and opportunity with <b>reliable, skilled and dedicated manpower.</b> We understand each client's needs and deliver workforce solutions that support their success, while fostering growth and development for our employees.</p><div className="purpose-card__values"><span>Integrity</span><span>Professionalism</span><span>Excellence</span></div></div>
          </article>
          <article className="purpose-card purpose-card--vision" aria-labelledby="vision-title">
            <div className="purpose-card__top"><span>02 / THE FUTURE WE SEE</span><span className="purpose-card__symbol" aria-hidden="true"><Building2 /></span></div>
            <h3 id="vision-title">Our <strong>Vision.</strong></h3>
            <p className="purpose-card__statement">Empowering people.<br />Shaping tomorrow.</p>
            <img className="purpose-card__art" src="/images/generated/vision-brand.webp" alt="Illustration of engineers looking towards a growing city and future opportunities" width="1536" height="1024" loading="lazy" decoding="async" />
            <div className="purpose-card__copy"><p>To become a leading manpower supply company recognized for <b>exceptional service, innovation and quality.</b> Through lasting relationships and consistent value, we empower people and businesses to contribute to the development and prosperity of the regions we serve.</p><div className="purpose-card__values"><span>Innovation</span><span>Partnership</span><span>Progress</span></div></div>
          </article>
        </div>
        <div className="purpose__closing"><span>Different skills. Shared ambition. <b>One trusted partner.</b></span><a className="text-link" href="#contact">Build your workforce with us <ArrowUpRight /></a></div>
      </div></section>

      <section className="section services" id="services"><div className="container">
        <div className="section-head reveal"><div><div className="eyebrow eyebrow--dark"><span /> Capabilities</div><h2>Flexible manpower solutions for <em>demanding operations.</em></h2></div><p>Workforce solutions across core industrial fields, with a focus on flexible, reliable and skilled manpower services.</p></div>
        <div className="services__grid stagger-grid mobile-auto-scroll">{services.map(({ n, icon: Icon, title, text }) => <article className="service-card" key={title}><div className="service-card__top"><Icon /><span>{n}</span></div><h3>{title}</h3><p>{text}</p><ChevronRight className="service-card__arrow" /></article>)}</div>
      </div></section>

      <section className="capability-banner" id="sectors">
        <img src="/images/generated/civil.webp" alt="Illustrative construction team reviewing project plans" loading="lazy" />
        <div className="capability-banner__shade" />
        <div className="container capability-banner__copy reveal"><div className="eyebrow"><span /> Fields of service</div><h2>People who keep<br /><em>operations moving.</em></h2><p>From site management to skilled trades, our service fields reflect the real-world requirements of industrial projects.</p></div>
      </section>

      <section className="section sector-list"><div className="container sector-list__grid stagger-grid mobile-auto-scroll">{sectors.map(({ icon: Icon, title, roles }, i) => <article key={title}><span>0{i + 1}</span><Icon /><h3>{title}</h3><p>{roles}</p><a href={whatsapp(`Hello Pak Arab Manpower Supply LLC, I need workforce support for ${title}.`)} target="_blank" rel="noopener noreferrer">Discuss this field <ArrowRight /></a></article>)}</div></section>

      <section className="section process" id="process"><div className="container process__grid">
        <div className="process__intro reveal"><div className="eyebrow eyebrow--dark"><span /> Our process</div><h2>Clear steps.<br /><em>Better workforce fit.</em></h2><p className="section-lead">A practical path from your requirement to coordinated workforce support—with communication kept clear throughout.</p><a className="button button--dark" href={whatsapp()} target="_blank" rel="noopener noreferrer">Start a conversation <ArrowRight /></a></div>
        <div className="process__steps stagger-grid">
          {[['01', 'Understand', 'We clarify roles, skills, project context and workforce priorities.'], ['02', 'Source', 'We identify candidates aligned to the stated technical and operational requirements.'], ['03', 'Evaluate', 'Candidate suitability, capability and readiness are reviewed for the requirement.'], ['04', 'Coordinate', 'We support clear communication and workforce coordination around deployment needs.']].map(([n, t, d]) => <div key={n}><b>{n}</b><span><strong>{t}</strong><small>{d}</small></span></div>)}
        </div>
      </div></section>

      <section className="quality" ref={vantaEl}><div className="quality__overlay" /><div className="container quality__inner reveal">
        <div><div className="eyebrow"><span /> Quality management</div><h2>Quality is part of<br /><em>the delivery process.</em></h2></div>
        <div className="quality__panel"><ShieldCheck /><p>Our documented Quality Management System is supported by an independent quality control and quality assurance department, with commitment from management and employees at every level.</p><ul><li>Quality manual</li><li>Quality assurance procedure</li><li>Implementation, monitoring & improvement</li><li>Site monitoring and implementation</li></ul></div>
      </div></section>

      <section className="section clients" id="clients"><div className="container">
        <div className="section-head reveal"><div><div className="eyebrow eyebrow--dark"><span /> Trusted relationships</div><h2>Our <em>clients.</em></h2></div><p>Organizations presented in the Pak Arab Manpower Supply LLC company profile.</p></div>
        <div className="client-logos mobile-auto-scroll stagger-grid">{clients.map(([name, file], index) => <article className="client-logo" key={name}><span>{String(index + 1).padStart(2, '0')}</span><img src={`/images/clients/${file}`} alt={`${name} logo`} loading="lazy" /><small>{name}</small></article>)}</div>
      </div></section>

      <section className="site-showcase" aria-label="Pak Arab operational values">
        <img src="/images/generated/civil.webp" alt="Illustrative construction site representing workforce operations" loading="lazy" />
        <div className="site-showcase__shade" />
        <div className="container site-showcase__canvas reveal">
          <div className="site-showcase__card site-showcase__card--hours"><strong>People</strong><span>Our strongest foundation</span></div>
          <div className="site-showcase__card site-showcase__card--partner"><small>Partnership</small><Handshake /><p><i /> Long-term cooperation</p></div>
          <div className="site-showcase__card site-showcase__card--hse"><strong>HSE</strong><span>Safety-led culture</span></div>
          <div className="site-showcase__title"><span>Industrial workforce</span><h2>Built around <em>the site.</em></h2></div>
        </div>
      </section>

      <Workforce whatsapp={whatsapp} />

      <section className="section faq" id="faq"><div className="container faq__grid">
        <div className="faq__intro reveal"><div className="eyebrow eyebrow--dark"><span /> Frequently asked questions</div><h2>Clear answers before <em>we get started.</em></h2><p className="section-lead">Quick information about our manpower fields, process and direct enquiry channels.</p><a className="text-link" href={whatsapp()} target="_blank" rel="noopener noreferrer">Ask us on WhatsApp <ArrowRight /></a></div>
        <div className="faq__list stagger-grid">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}</span><b>{question}</b><i aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
      </div></section>

      <section className="section contact" id="contact"><div className="container contact__shell reveal">
        <div className="contact__copy"><div className="eyebrow"><span /> Start a conversation</div><h2>Tell us what your operation <em>needs next.</em></h2><p>Share your required roles, project location and timeline. Our team will continue the conversation directly.</p><div className="contact__details"><a href={`tel:${PHONE_LINK}`}><Phone /><span><small>Office</small>{PHONE_DISPLAY}</span></a><a href="tel:+971553842555"><Phone /><span><small>Mobile</small>{MOBILE_ONE}</span></a><a href="tel:+971566995962"><Phone /><span><small>Mobile</small>{MOBILE_TWO}</span></a><a href={`mailto:${EMAIL}`}><Mail /><span><small>Email us</small>{EMAIL}</span></a><div className="contact__address"><MapPin /><span><small>Office address</small>{ADDRESS}</span></div></div></div>
        <form className="contact__form" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); window.open(whatsapp(buildEnquiryMessage(fd)), '_blank', 'noopener,noreferrer'); }}>
          <label>Full name<input name="name" maxLength={FIELD_LIMITS.name} autoComplete="name" placeholder="Your name" required /></label>
          <label>Company<input name="company" maxLength={FIELD_LIMITS.company} placeholder="Company name" /></label>
          <label>Phone / WhatsApp<input name="phone" maxLength={FIELD_LIMITS.phone} autoComplete="tel" type="tel" placeholder="+971..." required /></label>
          <label>Service<select name="service" defaultValue=""><option value="" disabled>Select a service</option><option>Oil & Gas</option><option>Civil & Construction</option><option>Mechanical</option><option>Electrical & Instrumentation</option><option>General Manpower</option></select></label>
          <label className="full">Project location<input name="location" maxLength={FIELD_LIMITS.location} placeholder="City / project site" /></label>
          <label className="full">Workforce requirement<textarea name="message" maxLength={FIELD_LIMITS.message} placeholder="Roles, project location, timeline..." required /></label>
          <button className="button button--whatsapp full" type="submit"><WhatsAppIcon /> Send via WhatsApp <ArrowRight /></button>
          <small className="full">This form opens WhatsApp so you can review the message before sending.</small>
        </form>
      </div>
      <div className="container contact__map reveal">
        <div className="contact__map-head"><div><span>Our Abu Dhabi office</span><strong>Shabiya-12, Mussafah Commercial</strong></div><a className="button button--outline" href="https://www.google.com/maps/search/?api=1&query=Office+No.+01+M-Floor+Building+C-225+Shabiya-12+Mussafah+Commercial+Abu+Dhabi+UAE" target="_blank" rel="noopener noreferrer">Open in Google Maps <ArrowUpRight /></a></div>
        <iframe title="Pak Arab Manpower Supply LLC office location in Mussafah, Abu Dhabi" src="https://www.google.com/maps?q=Building+C-225,+Shabiya+12,+Mussafah+Commercial,+Abu+Dhabi,+UAE&output=embed" loading="lazy" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
      </div></section>
    </main>

    <footer><div className="container footer__top"><Logo light /><p>Professional manpower supply and workforce coordination for demanding industrial environments across the UAE.<br />{ADDRESS}</p><a className="button button--outline" href="#home">Back to top <ArrowDownRight /></a></div><div className="container footer__bottom"><span>© {new Date().getFullYear()} Pak Arab Manpower Supply LLC</span><span>Industrial imagery is AI-generated for illustration.</span></div></footer>

    <a className="whatsapp-float" href={whatsapp()} target="_blank" rel="noopener noreferrer" aria-label="Chat with Pak Arab Manpower Supply LLC on WhatsApp">
      <WhatsAppIcon />
      <span className="whatsapp-status" aria-hidden="true" />
    </a>
  </div>;
}

function ArrowUpRight(props) { return <ArrowRight {...props} className={`${props.className || ''} rotate-up`} />; }

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path fill="currentColor" d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47a8.93 8.93 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.42.25-.7.25-1.3.18-1.42-.08-.13-.27-.2-.57-.35m-5.4 7.48h-.01a9.86 9.86 0 0 1-5.03-1.38l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26A9.9 9.9 0 0 1 12.08 2a9.9 9.9 0 0 1 9.9 9.91 9.9 9.9 0 0 1-9.9 9.95m8.42-18.34A11.8 11.8 0 0 0 12.09 0C5.55 0 .23 5.32.23 11.86c0 2.09.55 4.13 1.6 5.92L.13 24l6.36-1.67a11.86 11.86 0 0 0 5.59 1.42h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.47-8.39" />
  </svg>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

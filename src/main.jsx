import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowDownRight, ArrowRight, BadgeCheck, Building2, ChevronRight,
  CircleCheck, Construction, Factory, Gauge, HardHat, Headphones,
  Mail, MapPin, Menu, Phone, ShieldCheck, Sparkles, UsersRound, Wrench, X,
} from 'lucide-react';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const PHONE_DISPLAY = '02 551 1925';
const PHONE_LINK = '+97125511925';
const WHATSAPP = '97125511925';
const EMAIL = 'info@pakarabmps.com';

const services = [
  { n: '01', icon: UsersRound, title: 'Manpower services', text: 'Workforce sourcing and supply aligned with client requirements, skills and operational needs.' },
  { n: '02', icon: Gauge, title: 'Process & benefits', text: 'A structured path from requirements to selection, helping clients move with clarity and speed.' },
  { n: '03', icon: Headphones, title: 'Workforce support', text: 'Candidate sourcing and selection with attention to capability, readiness and deployment.' },
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

const clients = ['ADNOC', 'ALTRAD', 'Etisalat', 'ASGC', 'Al Jaber Group', 'GASCO', 'NPCC', 'GISCO', 'LAMPRELL', 'DESCON', 'ARCHIRODON', 'China State Construction'];

function Logo({ light = false }) {
  return <a className={`brand ${light ? 'brand--light' : ''}`} href="#home" aria-label="Pak Arab Manpower home">
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
      gsap.from('.hero__eyebrow, .hero h1, .hero__lead, .hero__actions, .hero__proof', {
        y: 34, opacity: 0, duration: .85, stagger: .11, ease: 'power3.out', delay: .15,
      });
      gsap.from('.hero__visual-card', { x: 55, opacity: 0, duration: 1.1, ease: 'power3.out', delay: .35 });
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, { y: 42, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
      });
      gsap.utils.toArray('.stagger-grid').forEach((grid) => {
        gsap.from(grid.children, { y: 34, opacity: 0, duration: .65, stagger: .09, ease: 'power3.out', scrollTrigger: { trigger: grid, start: 'top 83%', once: true } });
      });
      gsap.to('.hero__image', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    }, root);
    return () => ctx.revert();
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

  const whatsapp = (message = 'Hello PAK ARAB MANPOWER SUPPLY, I would like to discuss manpower requirements.') =>
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
          {['About', 'Services', 'Sectors', 'Process', 'Clients'].map((item) => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
          <a className="button button--dark nav__cta" href="#contact" onClick={() => setMenuOpen(false)}>Talk to our team <ArrowUpRight /></a>
        </nav>
        <button className="nav__toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <img className="hero__image" src="/images/hero-workforce.webp" alt="Industrial workforce at a UAE energy facility" fetchPriority="high" />
        <div className="hero__shade" />
        <div className="container hero__grid">
          <div className="hero__copy">
            <div className="eyebrow hero__eyebrow"><span /> UAE Industrial Workforce Partner</div>
            <h1>Industrial workforce.<br /><em>Ready for the real world.</em></h1>
            <p className="hero__lead">Professional manpower sourcing and workforce coordination for oil & gas, energy, EPC and industrial operations across the UAE.</p>
            <div className="hero__actions">
              <a className="button button--red" href={whatsapp()} target="_blank" rel="noreferrer">Discuss your requirement <ArrowRight /></a>
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
        <div className="about__media reveal"><img src="/images/workforce-planning.webp" alt="Workforce planning meeting in Abu Dhabi" loading="lazy" /><div className="about__stamp"><HardHat /><span>Built around<br /><b>your site.</b></span></div></div>
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

      <section className="section services" id="services"><div className="container">
        <div className="section-head reveal"><div><div className="eyebrow eyebrow--dark"><span /> Capabilities</div><h2>Flexible manpower solutions for <em>demanding operations.</em></h2></div><p>Workforce solutions across core industrial fields, with a focus on flexible, reliable and skilled manpower services.</p></div>
        <div className="services__grid stagger-grid">{services.map(({ n, icon: Icon, title, text }) => <article className="service-card" key={title}><div className="service-card__top"><Icon /><span>{n}</span></div><h3>{title}</h3><p>{text}</p><ChevronRight className="service-card__arrow" /></article>)}</div>
      </div></section>

      <section className="capability-banner" id="sectors">
        <img src="/images/industrial-team.webp" alt="Skilled industrial team working at an energy facility" loading="lazy" />
        <div className="capability-banner__shade" />
        <div className="container capability-banner__copy reveal"><div className="eyebrow"><span /> Fields of service</div><h2>People who keep<br /><em>operations moving.</em></h2><p>From site management to skilled trades, our service fields reflect the real-world requirements of industrial projects.</p></div>
      </section>

      <section className="section sector-list"><div className="container sector-list__grid stagger-grid">{sectors.map(({ icon: Icon, title, roles }, i) => <article key={title}><span>0{i + 1}</span><Icon /><h3>{title}</h3><p>{roles}</p><a href={whatsapp(`Hello PAK ARAB MANPOWER SUPPLY, I need workforce support for ${title}.`)} target="_blank" rel="noreferrer">Discuss this field <ArrowRight /></a></article>)}</div></section>

      <section className="section process" id="process"><div className="container process__grid">
        <div className="process__intro reveal"><div className="eyebrow eyebrow--dark"><span /> Our process</div><h2>Clear steps.<br /><em>Better workforce fit.</em></h2><p className="section-lead">A practical path from your requirement to coordinated workforce support—with communication kept clear throughout.</p><a className="button button--dark" href={whatsapp()} target="_blank" rel="noreferrer">Start a conversation <ArrowRight /></a></div>
        <div className="process__steps stagger-grid">
          {[['01', 'Understand', 'We clarify roles, skills, project context and workforce priorities.'], ['02', 'Source', 'We identify candidates aligned to the stated technical and operational requirements.'], ['03', 'Evaluate', 'Candidate suitability, capability and readiness are reviewed for the requirement.'], ['04', 'Coordinate', 'We support clear communication and workforce coordination around deployment needs.']].map(([n, t, d]) => <div key={n}><b>{n}</b><span><strong>{t}</strong><small>{d}</small></span></div>)}
        </div>
      </div></section>

      <section className="quality" ref={vantaEl}><div className="quality__overlay" /><div className="container quality__inner reveal">
        <div><div className="eyebrow"><span /> Quality management</div><h2>Quality is part of<br /><em>the delivery process.</em></h2></div>
        <div className="quality__panel"><ShieldCheck /><p>Our company profile outlines a documented Quality Management System supported by quality-control and quality-assurance practices.</p><ul><li>Quality manual</li><li>Quality assurance procedure</li><li>Implementation & monitoring</li></ul></div>
      </div></section>

      <section className="section clients" id="clients"><div className="container">
        <div className="section-head reveal"><div><div className="eyebrow eyebrow--dark"><span /> Company profile</div><h2>Organizations featured in our <em>client portfolio.</em></h2></div><p>Selected names presented in the Pak Arab company profile.</p></div>
        <div className="clients__marquee"><div>{[...clients, ...clients].map((c, i) => <span key={`${c}-${i}`}>{c}</span>)}</div></div>
      </div></section>

      <section className="section contact" id="contact"><div className="container contact__shell reveal">
        <div className="contact__copy"><div className="eyebrow"><span /> Start a conversation</div><h2>Tell us what your operation <em>needs next.</em></h2><p>Share your required roles, project location and timeline. Our team will continue the conversation directly.</p><div className="contact__details"><a href={`tel:${PHONE_LINK}`}><Phone /><span><small>Call us</small>{PHONE_DISPLAY}</span></a><a href={`mailto:${EMAIL}`}><Mail /><span><small>Email us</small>{EMAIL}</span></a><div><MapPin /><span><small>Location</small>Abu Dhabi, UAE</span></div></div></div>
        <form className="contact__form" onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); window.open(whatsapp(`Hello PAK ARAB MANPOWER SUPPLY,\nName: ${fd.get('name')}\nCompany: ${fd.get('company')}\nRequirement: ${fd.get('message')}`), '_blank', 'noopener,noreferrer'); }}>
          <label>Full name<input name="name" placeholder="Your name" required /></label>
          <label>Company<input name="company" placeholder="Company name" /></label>
          <label className="full">Workforce requirement<textarea name="message" placeholder="Roles, project location, timeline..." required /></label>
          <button className="button button--red full" type="submit">Send via WhatsApp <ArrowRight /></button>
          <small className="full">This form opens WhatsApp so you can review the message before sending.</small>
        </form>
      </div></section>
    </main>

    <footer><div className="container footer__top"><Logo light /><p>Professional manpower supply and workforce coordination for demanding industrial environments across the UAE.</p><a className="button button--outline" href="#home">Back to top <ArrowDownRight /></a></div><div className="container footer__bottom"><span>© {new Date().getFullYear()} Pak Arab Manpower Supply LLC</span><span>Abu Dhabi · Oil & Gas · Industrial Workforce</span></div></footer>

    <a className="whatsapp-float" href={whatsapp()} target="_blank" rel="noreferrer" aria-label="Chat with Pak Arab on WhatsApp"><span className="whatsapp-icon">WA</span><b>WhatsApp us<small>Direct workforce enquiry</small></b></a>
  </div>;
}

function ArrowUpRight(props) { return <ArrowRight {...props} className={`${props.className || ''} rotate-up`} />; }

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);

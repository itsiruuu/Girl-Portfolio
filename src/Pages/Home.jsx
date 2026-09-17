import { useState, useEffect, useRef, useCallback } from "react";
import irinAkterImage from "../assets/irin-akter.png";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import AboutSection from "../components/About";
import ServicesSection from "../components/Services";
import Work from "../components/Work";
import JourneySection from "../components/Journey";
import ContactSection from "../components/Contact";
import FooterSection from "../components/Footer";

/* ── Reveal hook ─────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Cursor dot ──────────────────────────────── */
function CursorDot() {
  const dotRef = useRef(null);
  useEffect(() => {
    let lastParticleAt = 0;
    const particleSymbols = ["</>", "{}", "*", "+", "//", "<>" ];

    const addParticle = (x, y) => {
      const particle = document.createElement("span");
      const angle = Math.random() * Math.PI * 2;
      const distance = 18 + Math.random() * 28;
      particle.className = "cursor-particle";
      particle.textContent = particleSymbols[Math.floor(Math.random() * particleSymbols.length)];
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
      particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
      particle.style.setProperty("--particle-rotate", `${-30 + Math.random() * 60}deg`);
      particle.addEventListener("animationend", () => particle.remove(), { once: true });
      document.body.appendChild(particle);
    };

    const move = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      if (window.innerWidth >= 1024 && e.timeStamp - lastParticleAt > 45) {
        lastParticleAt = e.timeStamp;
        addParticle(e.clientX, e.clientY);
        if (Math.random() > 0.35) addParticle(e.clientX, e.clientY);
      }
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll(".cursor-particle").forEach((particle) => particle.remove());
    };
  }, []);
  return <div ref={dotRef} className="cursor-dot hidden lg:block" />;
}

/* ── Navigation ──────────────────────────────── */
const NAV = ["About", "Services", "Work", "Journey", "Contact"];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(254,247,255,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(240,214,239,0.7)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="font-display font-semibold text-lg tracking-wide"
          style={{ color: "#1e0a2e" }}>
          <span className="text-gradient">Irin Akter</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a key={n} href={`#${n.toLowerCase()}`}
              className="font-sans text-sm tracking-wide transition-colors duration-200"
              style={{ color: "#9d84b7" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#d946a8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#9d84b7")}>
              {n}
            </a>
          ))}
          <a href="#contact"
            className="btn-shimmer font-sans text-sm px-5 py-2 rounded-full font-medium shadow-sm transition-transform duration-200 hover:scale-105">
            Hire Me ✦
          </a>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-xl" style={{ color: "#d946a8" }} onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>

        {/* Mobile drawer */}
        {open && (
          <div className="absolute top-full left-0 right-0 glass px-6 py-8 flex flex-col gap-6"
            style={{ borderTop: "1px solid rgba(240,214,239,0.6)" }}>
            {NAV.map((n) => (
              <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)}
                className="font-sans text-lg font-medium"
                style={{ color: "#4a1d6e" }}>
                {n}
              </a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}

/* ── Hero ────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-5 animate-fade-up"
              style={{ color: "#d946a8", animationDelay: "0ms", opacity: 0 }}>
              ✦ Frontend Engineer & UI Architect
            </p>
            <h1 className="font-display font-bold leading-none mb-6 animate-fade-up"
              style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", animationDelay: "120ms" }}>
              <span style={{ color: "#1e0a2e" }}>Irin</span>
              <br />
              <span className="text-gradient italic">Akter</span>
            </h1>
            <p className="font-sans text-lg mb-8 max-w-md animate-fade-up"
              style={{ color: "#9d84b7", lineHeight: 1.75, animationDelay: "240ms", opacity: 0 }}>
              I design and engineer interfaces that feel alive — merging
              <span style={{ color: "#4a1d6e" }}> parametric thinking</span> with
              <span style={{ color: "#d946a8" }}> pixel-level craft</span> to build products people love.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "360ms", opacity: 0 }}>
              <a href="#work"
                className="btn-shimmer font-sans font-medium px-7 py-3.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-105">
                View My Work
              </a>
              <a href="#contact"
                className="font-sans font-medium px-7 py-3.5 rounded-full transition-all duration-200 glass"
                style={{ color: "#4a1d6e", border: "1px solid rgba(167,139,250,0.4)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#d946a8")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(167,139,250,0.4)")}>
                Let"s Talk →
              </a>
            </div>

            {/* Stats row */}
            <div className="mt-12 flex gap-8 animate-fade-up" style={{ animationDelay: "480ms", opacity: 0 }}>
              {[
                { n: "5+", l: "Years building" },
                { n: "40+", l: "Projects shipped" },
                { n: "15", l: "Girls mentored" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
                  <div className="font-mono text-xs mt-1" style={{ color: "#c4aed8" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Photo card */}
          <div className="relative flex justify-center lg:justify-end animate-fade-up"
            style={{ animationDelay: "200ms", opacity: 0 }}>
            <div className="relative w-72 lg:w-96">
              {/* Floating blob behind photo */}
              <div className="absolute -inset-8 animate-blob"
                style={{ background: "linear-gradient(135deg, rgba(217,70,168,0.18), rgba(167,139,250,0.18))", filter: "blur(30px)" }} />

              {/* Photo frame */}
              <div className="relative overflow-hidden rounded-3xl animate-float-slow"
                style={{ border: "2px solid rgba(240,214,239,0.8)", boxShadow: "0 32px 80px rgba(217,70,168,0.15)" }}>
                <img
                  src={irinAkterImage}
                  alt="Irin Akter — frontend engineer"
                  className="w-full object-cover"
                  style={{ height: "420px", filter: "brightness(0.95) saturate(1.1)" }}
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(254,247,255,0.9) 100%)" }} />

                {/* Overlay badge */}
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">✦</span>
                  <div>
                    <div className="font-sans text-sm font-semibold" style={{ color: "#1e0a2e" }}>Available for hire</div>
                    <div className="font-mono text-xs" style={{ color: "#9d84b7" }}>Remote · Freelance · Full-time</div>
                  </div>
                </div>
              </div>

              {/* Floating tag */}
              <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2 animate-float"
                style={{ border: "1px solid rgba(167,139,250,0.4)", animationDelay: "1s" }}>
                <div className="font-mono text-xs" style={{ color: "#a78bfa" }}>React · TypeScript</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float-slow">
        <div className="font-mono text-xs" style={{ color: "#c4aed8" }}>scroll</div>
        <div className="w-px h-10" style={{ background: "linear-gradient(to bottom, #d946a8, transparent)" }} />
      </div>
    </section>
  );
}

/* ── Ticker ──────────────────────────────────── */
const TICKER_ITEMS = [
  "React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion",
  "Design Tools", "GraphQL", "Supabase", "Node.js", "Vitest", "Storybook", "D3.js",
];

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="py-4 overflow-hidden" style={{ background: "#1e0a2e", borderTop: "1px solid #2d1045", borderBottom: "1px solid #2d1045" }}>
      <div className="flex animate-ticker whitespace-nowrap gap-12" style={{ width: "max-content" }}>
        {items.map((t, i) => (
          <span key={i} className="font-mono text-sm tracking-widest uppercase inline-flex items-center gap-3"
            style={{ color: i % 3 === 0 ? "#d946a8" : i % 3 === 1 ? "#a78bfa" : "#fb7185" }}>
            {t} <span style={{ color: "#2d1045" }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── About ───────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        {/* Architecture / ambient visual */}
        <div className="reveal relative">
          <div className="relative rounded-3xl overflow-hidden aspect-square max-w-lg"
            style={{ background: "linear-gradient(135deg, #ede9fe, #fce7f8)" }}>
            <img
              src="https://images.unsplash.com/photo-1567201864585-6baec9110dac?w=600&h=600&fit=crop&auto=format"
              alt="Curved parametric architectural ribs"
              className="w-full h-full object-cover mix-blend-overlay"
              style={{ filter: "saturate(0.8) brightness(0.9)" }}
            />
            <div className="absolute inset-0"
              style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(217,70,168,0.2))" }} />

            {/* Code snippet float */}
            <div className="absolute bottom-6 right-6 glass rounded-xl p-4 font-mono text-xs"
              style={{ maxWidth: 180 }}>
              <div style={{ color: "#9d84b7" }}>// about me</div>
              <div><span style={{ color: "#a78bfa" }}>const</span> <span style={{ color: "#1e0a2e" }}>irinAkter</span> = {"{"}</div>
              <div className="ml-3"><span style={{ color: "#d946a8" }}>role</span>: <span style={{ color: "#4a1d6e" }}>"engineer"</span>,</div>
              <div className="ml-3"><span style={{ color: "#d946a8" }}>love</span>: <span style={{ color: "#4a1d6e" }}>"craft"</span></div>
              <div>{"}"}</div>
            </div>
          </div>

          {/* Decorative ring */}
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-2 animate-spin-slow"
            style={{ borderColor: "rgba(167,139,250,0.3)", borderStyle: "dashed" }} />
        </div>

        {/* Text */}
        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
            // 001 — about
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl mb-6 leading-tight">
            The human<br />behind the
            <span className="text-gradient italic"> code.</span>
          </h2>
          <div className="space-y-4 font-sans text-base" style={{ color: "#9d84b7", lineHeight: 1.85 }}>
            <p>
              I"m Irin Akter, a frontend engineer based in Dubai. I discovered my passion for
              web development at 14 when I built a fan site for my favourite band —
              <span style={{ color: "#4a1d6e" }}> glittery GIFs and all.</span>
            </p>
            <p>
              Today I specialise in React ecosystems, design systems, and
              <span style={{ color: "#4a1d6e" }}> bridging the gap between design and engineering.</span> I believe
              interfaces should be as thoughtfully engineered as they are visually refined.
            </p>
            <p>
              Outside of code I mentor girls entering tech through
              <span style={{ color: "#d946a8" }}> She Codes Arabia</span>, write on my Substack,
              and obsess over generative art.
            </p>
          </div>

          {/* Personality tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {["Accessibility advocate", "Design systems nerd", "Generative art enthusiast", "Mentor", "Cat mum 🐱"].map((tag) => (
              <span key={tag} className="font-sans text-xs px-3 py-1.5 rounded-full"
                style={{ background: "#fce7f8", color: "#9d174d", border: "1px solid rgba(249,168,212,0.5)" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Services ────────────────────────────────── */
const SERVICES = [
  {
    icon: "✦",
    title: "UI Engineering",
    desc: "Pixel-perfect React interfaces built for performance, accessibility, and delight. From design tokens to production.",
    color: "#d946a8",
  },
  {
    icon: "◈",
    title: "Design Systems",
    desc: "Scalable component libraries with living documentation, Storybook integration, and a11y baked in from day one.",
    color: "#a78bfa",
  },
  {
    icon: "◎",
    title: "Motion & Interaction",
    desc: "Purposeful animation that communicates state, guides attention, and makes experiences feel premium.",
    color: "#fb7185",
  },
  {
    icon: "⬡",
    title: "Full-Stack Products",
    desc: "End-to-end features with Next.js, Supabase, GraphQL APIs, and deployment pipelines that ship fast.",
    color: "#c084fc",
  },
  {
    icon: "⊹",
    title: "Performance Audits",
    desc: "Lighthouse-perfect scores, Core Web Vitals optimisation, bundle analysis, and code-splitting strategies.",
    color: "#f472b6",
  },
  {
    icon: "♡",
    title: "Mentorship",
    desc: "1-on-1 coaching for women entering frontend. Portfolio reviews, pair programming, and career guidance.",
    color: "#e879f9",
  },
];

function Services() {
  return (
    <section id="services" className="py-28 px-6 lg:px-12" style={{ background: "#fdf2fb" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
            // 002 — services
          </p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="font-display font-bold text-5xl md:text-6xl leading-tight">
              What I<span className="text-gradient italic"> build.</span>
            </h2>
            <p className="font-sans text-base max-w-xs" style={{ color: "#9d84b7", lineHeight: 1.7 }}>
              From concept to code — I bring technical rigour and visual sensitivity to every engagement.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => (
            <div key={s.title}
              className="reveal group p-7 rounded-2xl transition-all duration-300 cursor-default"
              style={{
                background: "#fff",
                border: "1px solid rgba(240,214,239,0.8)",
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 60px ${s.color}22`;
                e.currentTarget.style.borderColor = `${s.color}55`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.borderColor = "rgba(240,214,239,0.8)";
              }}>
              <div className="text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 inline-block"
                style={{ color: s.color }}>
                {s.icon}
              </div>
              <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "#1e0a2e" }}>{s.title}</h3>
              <p className="font-sans text-sm" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Tech Stack ──────────────────────────────── */
const STACK = [
  { cat: "Core", items: ["React 19", "TypeScript 5", "Next.js 15", "Vite"] },
  { cat: "Styling", items: ["Tailwind CSS v4", "CSS Modules", "Framer Motion", "Radix UI"] },
  { cat: "Data", items: ["GraphQL", "React Query", "Zustand", "Supabase"] },
  { cat: "Testing", items: ["Vitest", "Testing Library", "Playwright", "Storybook"] },
  { cat: "Tooling", items: ["Design Tools", "Docker", "Vercel", "GitHub Actions"] },
];

function Stack() {
  return (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="reveal mb-14">
        <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
          // 003 — stack
        </p>
        <h2 className="font-display font-bold text-5xl md:text-6xl">
          Tech<span className="text-gradient italic"> stack.</span>
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
        {STACK.map((group, i) => (
          <div key={group.cat} className="reveal rounded-2xl p-6"
            style={{
              background: "linear-gradient(135deg, #fdf2fb, #ede9fe22)",
              border: "1px solid rgba(240,214,239,0.8)",
              transitionDelay: `${i * 80}ms`,
            }}>
            <div className="font-mono text-xs tracking-widest uppercase mb-5" style={{ color: "#d946a8" }}>
              {group.cat}
            </div>
            <div className="flex flex-col gap-3">
              {group.items.map((item) => (
                <div key={item} className="font-sans text-sm font-medium" style={{ color: "#4a1d6e" }}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Projects ────────────────────────────────── */
const PROJECTS = [
  {
    title: "Luminary DS",
    tag: "Design System",
    year: "2025",
    desc: "A comprehensive component library — 80+ components, dark mode, full a11y compliance, Storybook docs, and automated visual regression tests.",
    stack: ["React", "TypeScript", "Storybook", "Radix UI"],
    image: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=700&h=440&fit=crop&auto=format",
    color: "#d946a8",
    href: "#",
  },
  {
    title: "Stellar Notes",
    tag: "Full-Stack App",
    year: "2024",
    desc: "Real-time collaborative note editor with CRDT conflict resolution, offline mode, E2E encryption, and a 12ms sync latency. 1 400 active users.",
    stack: ["Next.js", "Supabase", "Yjs", "Tailwind"],
    image: "https://images.unsplash.com/photo-1600540984005-c7f3a641fbe5?w=700&h=440&fit=crop&auto=format",
    color: "#a78bfa",
    href: "#",
  },
  {
    title: "DataLens",
    tag: "Data Visualisation",
    year: "2024",
    desc: "CSV-to-dashboard in seconds. Interactive charts, shareable reports, and column-level transformations. Processes 200 k rows client-side.",
    stack: ["React", "D3.js", "Web Workers", "FastAPI"],
    image: "https://images.unsplash.com/photo-1567201864585-6baec9110dac?w=700&h=440&fit=crop&auto=format",
    color: "#fb7185",
    href: "#",
  },
];

function Projects() {
  const [active, setActive] = useState(0);
  const p = PROJECTS[active];

  return (
    <section id="work" className="py-28 px-6 lg:px-12" style={{ background: "#1e0a2e" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
            // 004 — selected work
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl" style={{ color: "#fdf2fb" }}>
            Selected<span className="text-gradient italic"> projects.</span>
          </h2>
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-6" style={{ transitionDelay: "100ms" }}>
          {/* Sidebar list */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {PROJECTS.map((proj, i) => (
              <button key={proj.title} onClick={() => setActive(i)}
                className="text-left p-5 rounded-2xl transition-all duration-300"
                style={{
                  background: active === i ? `${proj.color}18` : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active === i ? proj.color + "55" : "rgba(255,255,255,0.07)"}`,
                }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs tracking-widest uppercase" style={{ color: proj.color }}>
                    {proj.tag}
                  </span>
                  <span className="font-mono text-xs" style={{ color: "#4a1d6e" }}>{proj.year}</span>
                </div>
                <h3 className="font-display font-semibold text-xl" style={{ color: active === i ? "#fdf2fb" : "#9d84b7" }}>
                  {proj.title}
                </h3>
              </button>
            ))}
          </div>

          {/* Preview panel */}
          <div className="lg:col-span-3 rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
            <div className="relative aspect-video overflow-hidden">
              <img src={p.image} alt={p.title} className="w-full h-full object-cover transition-all duration-500"
                style={{ filter: "brightness(0.5) saturate(1.3)" }} />
              <div className="absolute inset-0"
                style={{ background: `linear-gradient(to bottom, transparent 30%, #1e0a2e 100%)` }} />
              <div className="absolute top-4 left-4">
                <span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full"
                  style={{ background: `${p.color}33`, color: p.color, border: `1px solid ${p.color}55` }}>
                  {p.tag}
                </span>
              </div>
            </div>
            <div className="p-7">
              <h3 className="font-display font-bold text-3xl mb-3" style={{ color: "#fdf2fb" }}>{p.title}</h3>
              <p className="font-sans text-base mb-6" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{p.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {p.stack.map((tech) => (
                  <span key={tech} className="font-mono text-xs px-3 py-1.5 rounded-full"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#c4aed8" }}>
                    {tech}
                  </span>
                ))}
              </div>
              <a href={p.href}
                className="inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors duration-200"
                style={{ color: p.color }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                View Case Study ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Case Studies ────────────────────────────── */
const CASES = [
  {
    label: "Case 01",
    title: "Rebuilding a DS for 12 product teams",
    challenge: "A fragmented codebase — 3 UI libraries, no shared tokens, WCAG failures everywhere.",
    solution: "Audited 400+ components, distilled to 80 canonical primitives, established token governance, and migrated teams over 6 sprints.",
    outcome: "60% reduction in design-to-code cycle time. Lighthouse a11y scores from 62 → 98.",
    color: "#d946a8",
  },
  {
    label: "Case 02",
    title: "0 → 100ms load for a data dashboard",
    challenge: "A React dashboard rendering 50 k data points causing 8-second TTI on mid-range devices.",
    solution: "Virtualised tables, moved aggregations to Web Workers, added incremental hydration, and tree-shook D3 to 18 kb.",
    outcome: "TTI from 8.2 s → 0.9 s. Bundle size reduced by 73%. User drop-off cut in half.",
    color: "#a78bfa",
  },
];

function CaseStudies() {
  return (
    <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="reveal mb-14">
        <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
          // 005 — case studies
        </p>
        <h2 className="font-display font-bold text-5xl md:text-6xl">
          Deep<span className="text-gradient italic"> dives.</span>
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {CASES.map((c, i) => (
          <div key={c.label}
            className="reveal rounded-3xl p-8 relative overflow-hidden group cursor-default"
            style={{
              background: "linear-gradient(135deg, #fdf2fb, #ede9fe33)",
              border: "1px solid rgba(240,214,239,0.8)",
              transitionDelay: `${i * 100}ms`,
            }}>
            <div className="absolute top-6 right-6 font-mono text-xs" style={{ color: "#c4aed8" }}>{c.label}</div>
            <div className="w-10 h-10 rounded-full mb-6 flex items-center justify-center text-lg"
              style={{ background: `${c.color}20`, color: c.color, border: `1px solid ${c.color}44` }}>
              ◎
            </div>
            <h3 className="font-display font-semibold text-2xl mb-6" style={{ color: "#1e0a2e" }}>{c.title}</h3>

            {[
              { head: "Challenge", body: c.challenge, icon: "⚡" },
              { head: "Solution", body: c.solution, icon: "◈" },
              { head: "Outcome", body: c.outcome, icon: "✦" },
            ].map((row) => (
              <div key={row.head} className="mb-4">
                <div className="font-mono text-xs tracking-widest uppercase mb-1 flex items-center gap-2"
                  style={{ color: c.color }}>
                  <span>{row.icon}</span> {row.head}
                </div>
                <p className="font-sans text-sm" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{row.body}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── How I Build ─────────────────────────────── */
const PROCESS = [
  { step: "01", title: "Discover", desc: "Deep dive into user needs, business goals, and technical constraints before touching a single component." },
  { step: "02", title: "Architect", desc: "Design the component tree, data flow, and state model. Agree on API contracts between design and engineering." },
  { step: "03", title: "Prototype", desc: "Build interactive prototypes and code stubs fast. Validate with real users before full build-out." },
  { step: "04", title: "Engineer", desc: "Write tested, typed, accessible code. Iterate in short cycles with continuous integration and deploy previews." },
  { step: "05", title: "Polish", desc: "Motion design, micro-interactions, edge cases, performance. The final 10% that makes the product feel alive." },
  { step: "06", title: "Ship & Learn", desc: "Monitor, measure, and iterate. A launch is the start of a feedback loop, not the finish line." },
];

function HowIBuild() {
  return (
    <section className="py-28 px-6 lg:px-12" style={{ background: "#fdf2fb" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
            // 006 — process
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl">
            How I<span className="text-gradient italic"> build.</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROCESS.map((p, i) => (
            <div key={p.step}
              className="reveal p-7 rounded-2xl bg-white group transition-all duration-300"
              style={{
                border: "1px solid rgba(240,214,239,0.8)",
                transitionDelay: `${i * 60}ms`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 16px 48px rgba(217,70,168,0.1)"}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}>
              <div className="font-mono text-4xl font-bold mb-4 text-gradient">{p.step}</div>
              <h3 className="font-display font-semibold text-xl mb-3" style={{ color: "#1e0a2e" }}>{p.title}</h3>
              <p className="font-sans text-sm" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Journey / Experience ────────────────────── */
const JOURNEY = [
  { year: "2026", role: "Senior Frontend Engineer", co: "Spatial Labs · Dubai", desc: "Leading UI architecture for an AR-powered interior design platform. Design system from scratch, 4 squads." },
  { year: "2024", role: "Frontend Engineer II", co: "Noon · Remote", desc: "Built the design system serving 4M+ monthly users. Reduced component duplication by 70%." },
  { year: "2023", role: "Frontend Engineer", co: "Careem · Dubai", desc: "Developed driver-facing web tools with React, improving task completion rate by 34%." },
  { year: "2022", role: "Junior Developer", co: "Freelance", desc: "30+ client projects — e-commerce stores, SaaS dashboards, landing pages, and design handoffs." },
  { year: "2021", role: "CS Degree", co: "American University of Sharjah", desc: "Graduated with Honours. Final project: an accessible transit app for riders with visual impairment." },
];

function Journey() {
  return (
    <section id="journey" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="reveal mb-14">
        <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
          // 007 — journey
        </p>
        <h2 className="font-display font-bold text-5xl md:text-6xl">
          My<span className="text-gradient italic"> story.</span>
        </h2>
      </div>
      <div className="relative">
        {/* Timeline spine */}
        <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px"
          style={{ background: "linear-gradient(to bottom, #d946a8, #a78bfa, #fb7185)" }} />

        <div className="flex flex-col gap-10">
          {JOURNEY.map((j, i) => (
            <div key={j.year}
              className={`reveal relative flex gap-8 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-row pl-12 lg:pl-0`}
              style={{ transitionDelay: `${i * 80}ms` }}>
              {/* Dot on spine */}
              <div className="absolute left-2 lg:left-1/2 top-3 w-5 h-5 rounded-full -translate-x-1/2 border-2 animate-float-slow"
                style={{
                  background: "#fdf2fb",
                  borderColor: "#d946a8",
                  boxShadow: "0 0 0 4px rgba(217,70,168,0.15)",
                  animationDelay: `${i * 0.3}s`,
                }} />

              {/* Year badge — centered */}
              <div className="hidden lg:flex lg:w-1/2 items-start justify-center pt-2">
                <span className="font-mono font-bold text-2xl text-gradient">{j.year}</span>
              </div>

              {/* Card */}
              <div className={`lg:w-1/2 ${i % 2 === 0 ? "lg:pr-16" : "lg:pl-16"}`}>
                <div className="p-6 rounded-2xl glass"
                  style={{ border: "1px solid rgba(240,214,239,0.8)" }}>
                  <div className="font-mono text-xs text-gradient font-bold mb-1 lg:hidden">{j.year}</div>
                  <div className="font-display font-semibold text-xl mb-1" style={{ color: "#1e0a2e" }}>{j.role}</div>
                  <div className="font-mono text-xs mb-3" style={{ color: "#d946a8" }}>{j.co}</div>
                  <p className="font-sans text-sm" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{j.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Development Philosophy ──────────────────── */
const PRINCIPLES = [
  { icon: "◉", title: "Accessibility first", desc: "A11y is not a checklist — it is a design constraint that produces better interfaces for everyone." },
  { icon: "◈", title: "Performance is UX", desc: "Every millisecond saved is respect paid to the user. I measure before and after every optimization." },
  { icon: "⬡", title: "Design is logic", desc: "The best visual decisions are grounded in information hierarchy and cognitive principles, not taste." },
  { icon: "✦", title: "Ship to learn", desc: "Iteration beats perfection. Ship early, measure, and let real usage guide the next decision." },
];

function Philosophy() {
  return (
    <section className="py-28 px-6 lg:px-12 relative overflow-hidden" style={{ background: "#1e0a2e" }}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(217,70,168,0.12) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="reveal mb-14">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
            // 008 — philosophy
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl" style={{ color: "#fdf2fb" }}>
            What I<span className="text-gradient italic"> believe.</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {PRINCIPLES.map((pr, i) => (
            <div key={pr.title} className="reveal p-8 rounded-2xl group"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.07)",
                transitionDelay: `${i * 80}ms`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(217,70,168,0.35)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}>
              <div className="text-3xl mb-5 text-gradient">{pr.icon}</div>
              <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "#fdf2fb" }}>{pr.title}</h3>
              <p className="font-sans text-base" style={{ color: "#9d84b7", lineHeight: 1.8 }}>{pr.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Contact ─────────────────────────────────── */
function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handle = (e) => { e.preventDefault(); setSent(true); };

  const inputStyle = {
    background: "#fff",
    border: "1px solid rgba(240,214,239,0.9)",
    color: "#1e0a2e",
    outline: "none",
    width: "100%",
    padding: "0.875rem 1rem",
    borderRadius: "10px",
    fontFamily: "inherit",
    fontSize: "0.9rem",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" className="py-28 px-6 lg:px-12" style={{ background: "#fdf2fb" }}>
      <div className="max-w-3xl mx-auto">
        <div className="reveal mb-12 text-center">
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>
            // 009 — contact
          </p>
          <h2 className="font-display font-bold text-5xl md:text-6xl mb-4">
            Let"s<span className="text-gradient italic"> create.</span>
          </h2>
          <p className="font-sans text-base" style={{ color: "#9d84b7" }}>
            Open to full-time roles, contract work, design-system projects, and mentorship.
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "100ms" }}>
          {sent ? (
            <div className="text-center py-20 glass rounded-3xl"
              style={{ border: "1px solid rgba(240,214,239,0.8)" }}>
              <div className="text-5xl mb-4">✦</div>
              <div className="font-display text-3xl font-semibold text-gradient">Message received!</div>
              <div className="font-sans text-sm mt-3" style={{ color: "#9d84b7" }}>
                I"ll reply within 24 hours. Talk soon ✨
              </div>
            </div>
          ) : (
            <form onSubmit={handle} className="glass rounded-3xl p-8 lg:p-12 flex flex-col gap-5"
              style={{ border: "1px solid rgba(240,214,239,0.8)" }}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Name</label>
                  <input style={inputStyle} placeholder="Your name" required value={form.name} onChange={set("name")}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#d946a8")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,214,239,0.9)")} />
                </div>
                <div>
                  <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Email</label>
                  <input type="email" style={inputStyle} placeholder="you@example.com" required value={form.email} onChange={set("email")}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#d946a8")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,214,239,0.9)")} />
                </div>
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Project type</label>
                <select style={{ ...inputStyle, appearance: "none" }} value={form.project} onChange={set("project")}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#d946a8")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,214,239,0.9)")}>
                  <option value="">Select a service…</option>
                  <option>UI Engineering</option>
                  <option>Design System</option>
                  <option>Full-Stack Product</option>
                  <option>Performance Audit</option>
                  <option>Mentorship</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Message</label>
                <textarea rows={5} style={{ ...inputStyle, resize: "none" }} placeholder="Tell me about your project…" required
                  value={form.message} onChange={set("message")}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#d946a8")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,214,239,0.9)")} />
              </div>
              <button type="submit"
                className="btn-shimmer font-sans font-semibold text-base py-4 rounded-full transition-transform duration-200 hover:scale-105">
                Send Message ✦
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ──────────────────────────────────── */
const SOCIALS = [
  { name: "GitHub", href: "#", icon: "⊹" },
  { name: "LinkedIn", href: "#", icon: "◈" },
  { name: "Twitter / X", href: "#", icon: "◉" },
  { name: "Dribbble", href: "#", icon: "◎" },
  { name: "Substack", href: "#", icon: "✦" },
];

function Footer() {
  return (
    <footer style={{ background: "#1e0a2e", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div>
            <div className="font-display font-bold text-3xl mb-2">
              <span className="text-gradient">Irin Akter</span>
            </div>
            <p className="font-sans text-sm" style={{ color: "#4a1d6e" }}>
              Frontend engineer · Dubai, UAE
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {SOCIALS.map((s) => (
              <a key={s.name} href={s.href}
                className="flex items-center gap-2 font-sans text-sm transition-colors duration-200"
                style={{ color: "#4a1d6e" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#d946a8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4a1d6e")}>
                <span>{s.icon}</span> {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Large name */}
        <div className="overflow-hidden">
          <div className="font-display font-bold text-gradient leading-none select-none text-center"
            style={{ fontSize: "clamp(3rem, 12vw, 10rem)", opacity: 0.12 }}>
            Irin Akter
          </div>
        </div>

        <div className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <span className="font-mono text-xs" style={{ color: "#2d1045" }}>
            © 2026 Irin Akter — Designed and coded with ♡
          </span>
          <span className="font-mono text-xs" style={{ color: "#2d1045" }}>
            React · TypeScript · Tailwind CSS v4
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ── App ─────────────────────────────────────── */
export default function Home() {
  useReveal();

  return (
    <div style={{ background: "#fef7ff" }}>
      <CursorDot />
      <Navbar />
      <Banner />
      <Ticker />
      <AboutSection />
      <ServicesSection />
      <Stack />
      <Work />
      <CaseStudies />
      <HowIBuild />
      <JourneySection />
      <Philosophy />
      <ContactSection />
      <FooterSection />
    </div>
  );
}

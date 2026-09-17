import { useState } from "react";

const PROJECTS = [
  { title: "Luminary DS", tag: "Design System", year: "2025", desc: "A comprehensive component library — 80+ components, dark mode, full a11y compliance, Storybook docs, and automated visual regression tests.", stack: ["React", "TypeScript", "Storybook", "Radix UI"], image: "https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?w=700&h=440&fit=crop&auto=format", color: "#d946a8", href: "#" },
  { title: "Stellar Notes", tag: "Full-Stack App", year: "2024", desc: "Real-time collaborative note editor with CRDT conflict resolution, offline mode, E2E encryption, and a 12ms sync latency. 1 400 active users.", stack: ["Next.js", "Supabase", "Yjs", "Tailwind"], image: "https://images.unsplash.com/photo-1600540984005-c7f3a641fbe5?w=700&h=440&fit=crop&auto=format", color: "#a78bfa", href: "#" },
  { title: "DataLens", tag: "Data Visualisation", year: "2024", desc: "CSV-to-dashboard in seconds. Interactive charts, shareable reports, and column-level transformations. Processes 200 k rows client-side.", stack: ["React", "D3.js", "Web Workers", "FastAPI"], image: "https://images.unsplash.com/photo-1567201864585-6baec9110dac?w=700&h=440&fit=crop&auto=format", color: "#fb7185", href: "#" },
];

export default function Work() {
  const [active, setActive] = useState(0);
  const project = PROJECTS[active];

  return (
    <section id="work" className="py-28 px-6 lg:px-12" style={{ background: "#1e0a2e" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-14"><p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>// 004 — selected work</p><h2 className="font-display font-bold text-5xl md:text-6xl" style={{ color: "#fdf2fb" }}>Selected<span className="text-gradient italic"> projects.</span></h2></div>
        <div className="reveal grid lg:grid-cols-5 gap-6" style={{ transitionDelay: "100ms" }}>
          <div className="lg:col-span-2 flex flex-col gap-3">{PROJECTS.map((item, index) => <button key={item.title} onClick={() => setActive(index)} className="text-left p-5 rounded-2xl transition-all duration-300" style={{ background: active === index ? `${item.color}18` : "rgba(255,255,255,0.04)", border: `1px solid ${active === index ? item.color + "55" : "rgba(255,255,255,0.07)"}` }}><div className="flex items-center justify-between mb-2"><span className="font-mono text-xs tracking-widest uppercase" style={{ color: item.color }}>{item.tag}</span><span className="font-mono text-xs" style={{ color: "#4a1d6e" }}>{item.year}</span></div><h3 className="font-display font-semibold text-xl" style={{ color: active === index ? "#fdf2fb" : "#9d84b7" }}>{item.title}</h3></button>)}</div>
          <div className="lg:col-span-3 rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}><div className="relative aspect-video overflow-hidden"><img src={project.image} alt={project.title} className="w-full h-full object-cover transition-all duration-500" style={{ filter: "brightness(0.5) saturate(1.3)" }} /><div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 30%, #1e0a2e 100%)" }} /><div className="absolute top-4 left-4"><span className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded-full" style={{ background: `${project.color}33`, color: project.color, border: `1px solid ${project.color}55` }}>{project.tag}</span></div></div><div className="p-7"><h3 className="font-display font-bold text-3xl mb-3" style={{ color: "#fdf2fb" }}>{project.title}</h3><p className="font-sans text-base mb-6" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{project.desc}</p><div className="flex flex-wrap gap-2 mb-6">{project.stack.map((tech) => <span key={tech} className="font-mono text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "#c4aed8" }}>{tech}</span>)}</div><a href={project.href} className="inline-flex items-center gap-2 font-sans text-sm font-medium transition-colors duration-200" style={{ color: project.color }} onMouseEnter={(event) => (event.currentTarget.style.opacity = "0.75")} onMouseLeave={(event) => (event.currentTarget.style.opacity = "1")}>View Case Study ↗</a></div></div>
        </div>
      </div>
    </section>
  );
}

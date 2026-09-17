const JOURNEY = [
  { year: "2026", role: "Senior Frontend Engineer", co: "Spatial Labs · Dubai", desc: "Leading UI architecture for an AR-powered interior design platform. Design system from scratch, 4 squads." },
  { year: "2024", role: "Frontend Engineer II", co: "Noon · Remote", desc: "Built the design system serving 4M+ monthly users. Reduced component duplication by 70%." },
  { year: "2023", role: "Frontend Engineer", co: "Careem · Dubai", desc: "Developed driver-facing web tools with React, improving task completion rate by 34%." },
  { year: "2022", role: "Junior Developer", co: "Freelance", desc: "30+ client projects — e-commerce stores, SaaS dashboards, landing pages, and design handoffs." },
  { year: "2021", role: "CS Degree", co: "American University of Sharjah", desc: "Graduated with Honours. Final project: an accessible transit app for riders with visual impairment." },
];

export default function Journey() {
  return (
    <section id="journey" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="reveal mb-14"><p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>// 007 — journey</p><h2 className="font-display font-bold text-5xl md:text-6xl">My<span className="text-gradient italic"> story.</span></h2></div>
      <div className="relative"><div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, #d946a8, #a78bfa, #fb7185)" }} /><div className="flex flex-col gap-10">{JOURNEY.map((item, index) => <div key={item.year} className={`reveal relative flex gap-8 ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-row pl-12 lg:pl-0`} style={{ transitionDelay: `${index * 80}ms` }}><div className="absolute left-2 lg:left-1/2 top-3 w-5 h-5 rounded-full -translate-x-1/2 border-2 animate-float-slow" style={{ background: "#fdf2fb", borderColor: "#d946a8", boxShadow: "0 0 0 4px rgba(217,70,168,0.15)", animationDelay: `${index * 0.3}s` }} /><div className="hidden lg:flex lg:w-1/2 items-start justify-center pt-2"><span className="font-mono font-bold text-2xl text-gradient">{item.year}</span></div><div className={`lg:w-1/2 ${index % 2 === 0 ? "lg:pr-16" : "lg:pl-16"}`}><div className="p-6 rounded-2xl glass" style={{ border: "1px solid rgba(240,214,239,0.8)" }}><div className="font-mono text-xs text-gradient font-bold mb-1 lg:hidden">{item.year}</div><div className="font-display font-semibold text-xl mb-1" style={{ color: "#1e0a2e" }}>{item.role}</div><div className="font-mono text-xs mb-3" style={{ color: "#d946a8" }}>{item.co}</div><p className="font-sans text-sm" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{item.desc}</p></div></div></div>)}</div></div>
    </section>
  );
}

const SERVICES = [
  { icon: "✦", title: "UI Engineering", desc: "Pixel-perfect React interfaces built for performance, accessibility, and delight. From design tokens to production.", color: "#d946a8" },
  { icon: "◈", title: "Design Systems", desc: "Scalable component libraries with living documentation, Storybook integration, and a11y baked in from day one.", color: "#a78bfa" },
  { icon: "◎", title: "Motion & Interaction", desc: "Purposeful animation that communicates state, guides attention, and makes experiences feel premium.", color: "#fb7185" },
  { icon: "⬡", title: "Full-Stack Products", desc: "End-to-end features with Next.js, Supabase, GraphQL APIs, and deployment pipelines that ship fast.", color: "#c084fc" },
  { icon: "⊹", title: "Performance Audits", desc: "Lighthouse-perfect scores, Core Web Vitals optimisation, bundle analysis, and code-splitting strategies.", color: "#f472b6" },
  { icon: "♡", title: "Mentorship", desc: "1-on-1 coaching for women entering frontend. Portfolio reviews, pair programming, and career guidance.", color: "#e879f9" },
];

export default function Services() {
  return (
    <section id="services" className="py-28 px-6 lg:px-12" style={{ background: "#fdf2fb" }}>
      <div className="max-w-7xl mx-auto">
        <div className="reveal mb-16"><p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>// 002 — services</p><div className="flex flex-col md:flex-row md:items-end justify-between gap-6"><h2 className="font-display font-bold text-5xl md:text-6xl leading-tight">What I<span className="text-gradient italic"> build.</span></h2><p className="font-sans text-base max-w-xs" style={{ color: "#9d84b7", lineHeight: 1.7 }}>From concept to code — I bring technical rigour and visual sensitivity to every engagement.</p></div></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">{SERVICES.map((service, index) => <div key={service.title} className="reveal group p-7 rounded-2xl transition-all duration-300 cursor-default" style={{ background: "#fff", border: "1px solid rgba(240,214,239,0.8)", transitionDelay: `${index * 60}ms` }} onMouseEnter={(event) => { event.currentTarget.style.boxShadow = `0 20px 60px ${service.color}22`; event.currentTarget.style.borderColor = `${service.color}55`; }} onMouseLeave={(event) => { event.currentTarget.style.boxShadow = "none"; event.currentTarget.style.borderColor = "rgba(240,214,239,0.8)"; }}><div className="text-3xl mb-5 transition-transform duration-300 group-hover:scale-110 inline-block" style={{ color: service.color }}>{service.icon}</div><h3 className="font-display font-semibold text-2xl mb-3" style={{ color: "#1e0a2e" }}>{service.title}</h3><p className="font-sans text-sm" style={{ color: "#9d84b7", lineHeight: 1.75 }}>{service.desc}</p></div>)}</div>
      </div>
    </section>
  );
}

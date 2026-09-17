export default function About() {
  return (
    <section id="about" className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="reveal relative">
          <div className="relative rounded-3xl overflow-hidden aspect-square max-w-lg" style={{ background: "linear-gradient(135deg, #ede9fe, #fce7f8)" }}>
            <img src="https://images.unsplash.com/photo-1567201864585-6baec9110dac?w=600&h=600&fit=crop&auto=format" alt="Curved parametric architectural ribs" className="w-full h-full object-cover mix-blend-overlay" style={{ filter: "saturate(0.8) brightness(0.9)" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(167,139,250,0.3), rgba(217,70,168,0.2))" }} />
            <div className="absolute bottom-6 right-6 glass rounded-xl p-4 font-mono text-xs" style={{ maxWidth: 180 }}>
              <div style={{ color: "#9d84b7" }}>// about me</div>
              <div><span style={{ color: "#a78bfa" }}>const</span> <span style={{ color: "#1e0a2e" }}>irinAkter</span> = {'{'}</div>
              <div className="ml-3"><span style={{ color: "#d946a8" }}>role</span>: <span style={{ color: "#4a1d6e" }}>&quot;engineer&quot;</span>,</div>
              <div className="ml-3"><span style={{ color: "#d946a8" }}>love</span>: <span style={{ color: "#4a1d6e" }}>&quot;craft&quot;</span></div>
              <div>{'}'}</div>
            </div>
          </div>
          <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full border-2 animate-spin-slow" style={{ borderColor: "rgba(167,139,250,0.3)", borderStyle: "dashed" }} />
        </div>
        <div className="reveal" style={{ transitionDelay: "150ms" }}>
          <p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>// 001 — about</p>
          <h2 className="font-display font-bold text-5xl md:text-6xl mb-6 leading-tight">The human<br />behind the<span className="text-gradient italic"> code.</span></h2>
          <div className="space-y-4 font-sans text-base" style={{ color: "#9d84b7", lineHeight: 1.85 }}>
            <p>I&apos;m Irin Akter, a frontend engineer based in Dubai. I discovered my passion for web development at 14 when I built a fan site for my favourite band —<span style={{ color: "#4a1d6e" }}> glittery GIFs and all.</span></p>
            <p>Today I specialise in React ecosystems, design systems, and<span style={{ color: "#4a1d6e" }}> bridging the gap between design and engineering.</span> I believe interfaces should be as thoughtfully engineered as they are visually refined.</p>
            <p>Outside of code I mentor girls entering tech through<span style={{ color: "#d946a8" }}> She Codes Arabia</span>, write on my Substack, and obsess over generative art.</p>
          </div>
          <div className="mt-8 flex flex-wrap gap-2">{["Accessibility advocate", "Design systems nerd", "Generative art enthusiast", "Mentor", "Cat mum 🐱"].map((tag) => <span key={tag} className="font-sans text-xs px-3 py-1.5 rounded-full" style={{ background: "#fce7f8", color: "#9d174d", border: "1px solid rgba(249,168,212,0.5)" }}>{tag}</span>)}</div>
        </div>
      </div>
    </section>
  );
}

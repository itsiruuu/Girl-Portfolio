import irinAkterImage from "../assets/irin-akter.png";

export default function Banner() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase mb-5 animate-fade-up" style={{ color: "#d946a8", animationDelay: "0ms", opacity: 0 }}>✦ Frontend Engineer & UI Architect</p>
            <h1 className="font-display font-bold leading-none mb-6 animate-fade-up" style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", animationDelay: "120ms" }}><span style={{ color: "#1e0a2e" }}>Irin</span><br /><span className="text-gradient italic">Akter</span></h1>
            <p className="font-sans text-lg mb-8 max-w-md animate-fade-up" style={{ color: "#9d84b7", lineHeight: 1.75, animationDelay: "240ms", opacity: 0 }}>I design and engineer interfaces that feel alive — merging <span style={{ color: "#4a1d6e" }}>parametric thinking</span> with <span style={{ color: "#d946a8" }}>pixel-level craft</span> to build products people love.</p>
            <div className="flex flex-wrap gap-4 animate-fade-up" style={{ animationDelay: "360ms", opacity: 0 }}>
              <a href="#work" className="btn-shimmer font-sans font-medium px-7 py-3.5 rounded-full shadow-lg transition-transform duration-200 hover:scale-105">View My Work</a>
              <a href="#contact" className="font-sans font-medium px-7 py-3.5 rounded-full transition-all duration-200 glass" style={{ color: "#4a1d6e", border: "1px solid rgba(167,139,250,0.4)" }} onMouseEnter={(event) => (event.currentTarget.style.borderColor = "#d946a8")} onMouseLeave={(event) => (event.currentTarget.style.borderColor = "rgba(167,139,250,0.4)")}>Let&quot;s Talk →</a>
            </div>
            <div className="mt-12 flex gap-8 animate-fade-up" style={{ animationDelay: "480ms", opacity: 0 }}>
              {[{ n: "5+", l: "Years building" }, { n: "40+", l: "Projects shipped" }, { n: "15", l: "Girls mentored" }].map((stat) => <div key={stat.l}><div className="font-display text-3xl font-bold text-gradient">{stat.n}</div><div className="font-mono text-xs mt-1" style={{ color: "#c4aed8" }}>{stat.l}</div></div>)}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end animate-fade-up" style={{ animationDelay: "200ms", opacity: 0 }}>
            <div className="relative w-72 lg:w-96">
              <div className="absolute -inset-8 animate-blob" style={{ background: "linear-gradient(135deg, rgba(217,70,168,0.18), rgba(167,139,250,0.18))", filter: "blur(30px)" }} />
              <div className="relative overflow-hidden rounded-3xl animate-float-slow" style={{ border: "2px solid rgba(240,214,239,0.8)", boxShadow: "0 32px 80px rgba(217,70,168,0.15)" }}>
                <img src={irinAkterImage} alt="Irin Akter — frontend engineer" className="w-full object-cover" style={{ height: "420px", filter: "brightness(0.95) saturate(1.1)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, transparent 55%, rgba(254,247,255,0.9) 100%)" }} />
                <div className="absolute bottom-4 left-4 right-4 glass rounded-xl px-4 py-3 flex items-center gap-3"><span className="text-2xl">✦</span><div><div className="font-sans text-sm font-semibold" style={{ color: "#1e0a2e" }}>Available for hire</div><div className="font-mono text-xs" style={{ color: "#9d84b7" }}>Remote · Freelance · Full-time</div></div></div>
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-2xl px-4 py-2 animate-float" style={{ border: "1px solid rgba(167,139,250,0.4)", animationDelay: "1s" }}><div className="font-mono text-xs" style={{ color: "#a78bfa" }}>React · TypeScript</div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float-slow"><div className="font-mono text-xs" style={{ color: "#c4aed8" }}>scroll</div><div className="w-px h-10" style={{ background: "linear-gradient(to bottom, #d946a8, transparent)" }} /></div>
    </section>
  );
}
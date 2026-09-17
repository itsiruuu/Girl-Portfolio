const SOCIAL_LINKS = [
  { name: "GitHub", href: "#", icon: "⊹" },
  { name: "LinkedIn", href: "#", icon: "◈" },
  { name: "Twitter / X", href: "#", icon: "◉" },
  { name: "Dribbble", href: "#", icon: "◎" },
  { name: "Substack", href: "#", icon: "✦" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#1e0a2e", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12"><div><div className="font-display font-bold text-3xl mb-2"><span className="text-gradient">Irin Akter</span></div><p className="font-sans text-sm" style={{ color: "#4a1d6e" }}>Frontend engineer · Dubai, UAE</p></div><div className="flex flex-wrap justify-center gap-6">{SOCIAL_LINKS.map((social) => <a key={social.name} href={social.href} className="flex items-center gap-2 font-sans text-sm transition-colors duration-200" style={{ color: "#4a1d6e" }} onMouseEnter={(event) => (event.currentTarget.style.color = "#d946a8")} onMouseLeave={(event) => (event.currentTarget.style.color = "#4a1d6e")}><span>{social.icon}</span> {social.name}</a>)}</div></div>
        <div className="overflow-hidden"><div className="font-display font-bold text-gradient leading-none select-none text-center" style={{ fontSize: "clamp(3rem, 12vw, 10rem)", opacity: 0.12 }}>Irin Akter</div></div>
        <div className="mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}><span className="font-mono text-xs" style={{ color: "#2d1045" }}>© 2026 Irin Akter — Designed and coded with ♡</span><span className="font-mono text-xs" style={{ color: "#2d1045" }}>React · TypeScript · Tailwind CSS v4</span></div>
      </div>
    </footer>
  );
}

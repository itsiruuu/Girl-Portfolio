import { useEffect, useState } from "react";

const NAV_ITEMS = ["About", "Services", "Work", "Journey", "Contact"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500" style={{ background: scrolled ? "rgba(254,247,255,0.88)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? "1px solid rgba(240,214,239,0.7)" : "none" }}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#hero" className="font-display font-semibold text-lg tracking-wide" style={{ color: "#1e0a2e" }}>
          <span className="text-gradient">Irin Akter</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="font-sans text-sm tracking-wide transition-colors duration-200" style={{ color: "#9d84b7" }} onMouseEnter={(event) => (event.currentTarget.style.color = "#d946a8")} onMouseLeave={(event) => (event.currentTarget.style.color = "#9d84b7")}>
              {item}
            </a>
          ))}
          <a href="#contact" className="btn-shimmer font-sans text-sm px-5 py-2 rounded-full font-medium shadow-sm transition-transform duration-200 hover:scale-105">Hire Me ✦</a>
        </div>

        <button className="md:hidden text-xl" style={{ color: "#d946a8" }} onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>

        {open && (
          <div className="absolute top-full left-0 right-0 glass px-6 py-8 flex flex-col gap-6" style={{ borderTop: "1px solid rgba(240,214,239,0.6)" }}>
            {NAV_ITEMS.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="font-sans text-lg font-medium" style={{ color: "#4a1d6e" }}>{item}</a>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
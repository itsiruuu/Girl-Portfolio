import { useState } from "react";

const INPUT_STYLE = { background: "#fff", border: "1px solid rgba(240,214,239,0.9)", color: "#1e0a2e", outline: "none", width: "100%", padding: "0.875rem 1rem", borderRadius: "10px", fontFamily: "inherit", fontSize: "0.9rem", transition: "border-color 0.2s" };

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const updateField = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));
  const handleSubmit = (event) => { event.preventDefault(); setSent(true); };
  const resetBorder = (event) => (event.currentTarget.style.borderColor = "rgba(240,214,239,0.9)");
  const focusBorder = (event) => (event.currentTarget.style.borderColor = "#d946a8");
  return (
    <section id="contact" className="py-28 px-6 lg:px-12" style={{ background: "#fdf2fb" }}>
      <div className="max-w-3xl mx-auto"><div className="reveal mb-12 text-center"><p className="font-mono text-xs tracking-widest uppercase mb-4" style={{ color: "#d946a8" }}>// 009 — contact</p><h2 className="font-display font-bold text-5xl md:text-6xl mb-4">Let&quot;s<span className="text-gradient italic"> create.</span></h2><p className="font-sans text-base" style={{ color: "#9d84b7" }}>Open to full-time roles, contract work, design-system projects, and mentorship.</p></div>
        <div className="reveal" style={{ transitionDelay: "100ms" }}>{sent ? <div className="text-center py-20 glass rounded-3xl" style={{ border: "1px solid rgba(240,214,239,0.8)" }}><div className="text-5xl mb-4">✦</div><div className="font-display text-3xl font-semibold text-gradient">Message received!</div><div className="font-sans text-sm mt-3" style={{ color: "#9d84b7" }}>I&apos;ll reply within 24 hours. Talk soon ✨</div></div> : <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 lg:p-12 flex flex-col gap-5" style={{ border: "1px solid rgba(240,214,239,0.8)" }}>
          <div className="grid md:grid-cols-2 gap-5"><div><label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Name</label><input style={INPUT_STYLE} placeholder="Your name" required value={form.name} onChange={updateField("name")} onFocus={focusBorder} onBlur={resetBorder} /></div><div><label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Email</label><input type="email" style={INPUT_STYLE} placeholder="you@example.com" required value={form.email} onChange={updateField("email")} onFocus={focusBorder} onBlur={resetBorder} /></div></div>
          <div><label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Project type</label><select style={{ ...INPUT_STYLE, appearance: "none" }} value={form.project} onChange={updateField("project")} onFocus={focusBorder} onBlur={resetBorder}><option value="">Select a service…</option><option>UI Engineering</option><option>Design System</option><option>Full-Stack Product</option><option>Performance Audit</option><option>Mentorship</option><option>Other</option></select></div>
          <div><label className="font-mono text-xs tracking-widest uppercase block mb-2" style={{ color: "#9d84b7" }}>Message</label><textarea rows={5} style={{ ...INPUT_STYLE, resize: "none" }} placeholder="Tell me about your project…" required value={form.message} onChange={updateField("message")} onFocus={focusBorder} onBlur={resetBorder} /></div>
          <button type="submit" className="btn-shimmer font-sans font-semibold text-base py-4 rounded-full transition-transform duration-200 hover:scale-105">Send Message ✦</button>
        </form>}</div>
      </div>
    </section>
  );
}

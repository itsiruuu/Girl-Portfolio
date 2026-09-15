import { useEffect, useRef } from "react";

interface Panel {
  x: number; y: number; z: number;
  w: number; h: number;
  rx: number; ry: number; rz: number;
  speed: number; phase: number;
  hue: number;
}

export default function ArchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    // Build parametric panels — tessellated hexagonal grid + curved ribs
    const panels: Panel[] = [];
    for (let i = 0; i < 60; i++) {
      panels.push({
        x: (Math.random() - 0.5) * 900,
        y: (Math.random() - 0.5) * 600,
        z: Math.random() * 400 - 200,
        w: 40 + Math.random() * 120,
        h: 30 + Math.random() * 80,
        rx: Math.random() * Math.PI,
        ry: Math.random() * Math.PI * 2,
        rz: Math.random() * Math.PI,
        speed: 0.0003 + Math.random() * 0.0006,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.5 ? 300 + Math.random() * 40 : 260 + Math.random() * 40,
      });
    }

    // Rib arcs
    const ribs: { cx: number; cy: number; r: number; start: number; end: number; speed: number; phase: number }[] = [];
    for (let i = 0; i < 18; i++) {
      ribs.push({
        cx: (Math.random() - 0.5) * 800,
        cy: (Math.random() - 0.5) * 500,
        r: 80 + Math.random() * 200,
        start: Math.random() * Math.PI,
        end: Math.random() * Math.PI + Math.PI,
        speed: 0.0002 + Math.random() * 0.0003,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const project = (x: number, y: number, z: number, t: number, W: number, H: number) => {
      const fov = 900;
      const camZ = 600 + Math.sin(t * 0.1) * 50;
      const scale = fov / (fov + z + camZ);
      const cx = W / 2 + x * scale;
      const cy = H / 2 + y * scale;
      return { cx, cy, scale };
    };

    const draw = (t: number) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      // Sky gradient
      const sky = ctx.createLinearGradient(0, 0, W, H);
      sky.addColorStop(0, "#fce7f8");
      sky.addColorStop(0.4, "#ede9fe");
      sky.addColorStop(0.7, "#ddd6fe");
      sky.addColorStop(1, "#fdf4ff");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Soft sun glow
      const glow = ctx.createRadialGradient(W * 0.7, H * 0.2, 0, W * 0.7, H * 0.2, H * 0.6);
      glow.addColorStop(0, "rgba(251,207,232,0.55)");
      glow.addColorStop(0.4, "rgba(196,148,255,0.2)");
      glow.addColorStop(1, "transparent");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, H);

      // Water reflection strip
      const waterY = H * 0.72;
      const water = ctx.createLinearGradient(0, waterY, 0, H);
      water.addColorStop(0, "rgba(167,139,250,0.25)");
      water.addColorStop(1, "rgba(216,180,254,0.1)");
      ctx.fillStyle = water;
      ctx.fillRect(0, waterY, W, H - waterY);

      // Water shimmer lines
      for (let i = 0; i < 20; i++) {
        const wy = waterY + (i / 20) * (H - waterY);
        const alpha = 0.06 + Math.sin(t * 0.002 + i * 0.4) * 0.04;
        ctx.strokeStyle = `rgba(200,160,255,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, wy);
        ctx.lineTo(W, wy);
        ctx.stroke();
      }

      // Hills silhouette
      ctx.beginPath();
      ctx.moveTo(0, H * 0.65);
      for (let x = 0; x <= W; x += 8) {
        const y = H * 0.65 + Math.sin(x * 0.004 + 1) * 30 + Math.sin(x * 0.009) * 20 + Math.cos(x * 0.002) * 25;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(W, H);
      ctx.lineTo(0, H);
      ctx.closePath();
      const hillGrad = ctx.createLinearGradient(0, H * 0.6, 0, H * 0.75);
      hillGrad.addColorStop(0, "rgba(134,182,100,0.45)");
      hillGrad.addColorStop(1, "rgba(80,140,60,0.15)");
      ctx.fillStyle = hillGrad;
      ctx.fill();

      // Terraces / paved platforms
      for (let i = 0; i < 5; i++) {
        const ty = H * 0.55 + i * 22;
        const tw = W * (0.55 - i * 0.04);
        const tx = (W - tw) / 2;
        ctx.fillStyle = `rgba(255,255,255,${0.12 - i * 0.02})`;
        ctx.fillRect(tx, ty, tw, 8);
        // Subtle path lighting dots
        for (let d = 0; d < 10; d++) {
          const dotX = tx + (tw / 10) * d + tw / 20;
          const dotY = ty + 10;
          const dotGlow = ctx.createRadialGradient(dotX, dotY, 0, dotX, dotY, 6);
          dotGlow.addColorStop(0, `rgba(251,113,133,${0.5 + Math.sin(t * 0.004 + d + i) * 0.3})`);
          dotGlow.addColorStop(1, "transparent");
          ctx.fillStyle = dotGlow;
          ctx.beginPath();
          ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Structural ribs (curved parametric arcs)
      ribs.forEach((rib) => {
        const wobble = Math.sin(t * rib.speed + rib.phase) * 0.06;
        const { cx: px, cy: py } = project(rib.cx, rib.cy - 80, 0, t, W, H);
        const scale = 0.9 + Math.sin(t * rib.speed * 0.5 + rib.phase) * 0.06;
        const radius = rib.r * scale;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(wobble);

        const ribGrad = ctx.createLinearGradient(-radius, 0, radius, 0);
        ribGrad.addColorStop(0, "rgba(255,255,255,0.06)");
        ribGrad.addColorStop(0.5, "rgba(255,255,255,0.28)");
        ribGrad.addColorStop(1, "rgba(255,255,255,0.06)");

        ctx.strokeStyle = ribGrad;
        ctx.lineWidth = 1.5 + Math.sin(t * rib.speed + rib.phase) * 0.5;
        ctx.beginPath();
        ctx.arc(0, 0, radius, rib.start + wobble, rib.end + wobble);
        ctx.stroke();

        // Inner glow line
        ctx.strokeStyle = `rgba(216,180,254,${0.15 + Math.sin(t * rib.speed + rib.phase) * 0.1})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      });

      // Tessellated glass panels — sorted by z for depth
      const sorted = [...panels].sort((a, b) => b.z - a.z);
      sorted.forEach((p) => {
        const angle = t * p.speed + p.phase;
        const px3 = p.x + Math.sin(angle * 0.7) * 15;
        const py3 = p.y + Math.cos(angle * 0.5) * 10;
        const pz3 = p.z + Math.sin(angle * 0.3) * 30;

        const { cx, cy, scale } = project(px3, py3, pz3, t, W, H);
        const pw = p.w * scale;
        const ph = p.h * scale;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(p.ry + angle * 0.15);

        // Panel face — glass-like fill
        const alpha = 0.04 + scale * 0.1;
        const isLavender = p.hue < 290;
        ctx.fillStyle = isLavender
          ? `rgba(167,139,250,${alpha})`
          : `rgba(217,70,168,${alpha * 0.7})`;

        ctx.strokeStyle = isLavender
          ? `rgba(196,148,255,${0.25 + alpha})`
          : `rgba(249,168,212,${0.2 + alpha})`;
        ctx.lineWidth = 0.8;

        // Hexagonal panel
        ctx.beginPath();
        const sides = Math.random() > 0.4 ? 6 : 4;
        for (let s = 0; s <= sides; s++) {
          const a = (s / sides) * Math.PI * 2 - Math.PI / 6;
          const ex = (pw / 2) * Math.cos(a);
          const ey = (ph / 2) * Math.sin(a);
          s === 0 ? ctx.moveTo(ex, ey) : ctx.lineTo(ex, ey);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Internal light diffusion
        if (scale > 0.6) {
          const panelGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, pw / 2);
          panelGlow.addColorStop(0, `rgba(255,255,255,${0.12 * scale})`);
          panelGlow.addColorStop(1, "transparent");
          ctx.fillStyle = panelGlow;
          ctx.fill();
        }

        ctx.restore();
      });

      // Main structure skeleton — spire frame
      const spireX = W / 2;
      const spireBaseY = H * 0.68;
      const spireTopY = H * 0.1 + Math.sin(t * 0.0005) * 5;

      // Central column glow
      const colGrad = ctx.createLinearGradient(spireX, spireTopY, spireX, spireBaseY);
      colGrad.addColorStop(0, "rgba(255,255,255,0.0)");
      colGrad.addColorStop(0.3, "rgba(255,255,255,0.35)");
      colGrad.addColorStop(0.7, "rgba(196,148,255,0.4)");
      colGrad.addColorStop(1, "rgba(167,139,250,0.05)");
      ctx.strokeStyle = colGrad;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(spireX, spireTopY);
      ctx.lineTo(spireX, spireBaseY);
      ctx.stroke();

      // Organic branching ribs from center
      for (let i = 0; i < 14; i++) {
        const frac = i / 14;
        const ry2 = spireTopY + (spireBaseY - spireTopY) * (frac * 0.9 + 0.05);
        const spread = 80 + frac * 300;
        const wobble2 = Math.sin(t * 0.0008 + i * 0.5) * 8;

        ctx.strokeStyle = `rgba(255,255,255,${0.12 + (1 - frac) * 0.2})`;
        ctx.lineWidth = 0.8 + (1 - frac) * 1.5;
        ctx.beginPath();
        ctx.moveTo(spireX, ry2);
        const cpX = spireX + (i % 2 === 0 ? 1 : -1) * spread * 0.6 + wobble2;
        const cpY = ry2 - 30 - frac * 20;
        const endX = spireX + (i % 2 === 0 ? 1 : -1) * spread;
        ctx.quadraticCurveTo(cpX, cpY, endX, ry2 + 10);
        ctx.stroke();

        // Glow on rib tip
        const tipGlow = ctx.createRadialGradient(endX, ry2 + 10, 0, endX, ry2 + 10, 20);
        tipGlow.addColorStop(0, `rgba(251,113,133,${0.3 + Math.sin(t * 0.003 + i) * 0.2})`);
        tipGlow.addColorStop(1, "transparent");
        ctx.fillStyle = tipGlow;
        ctx.beginPath();
        ctx.arc(endX, ry2 + 10, 20, 0, Math.PI * 2);
        ctx.fill();
      }

      // Apex beacon glow
      const beacon = ctx.createRadialGradient(spireX, spireTopY, 0, spireX, spireTopY, 60 + Math.sin(t * 0.003) * 10);
      beacon.addColorStop(0, `rgba(255,255,255,${0.6 + Math.sin(t * 0.004) * 0.2})`);
      beacon.addColorStop(0.2, "rgba(249,168,212,0.4)");
      beacon.addColorStop(0.6, "rgba(167,139,250,0.15)");
      beacon.addColorStop(1, "transparent");
      ctx.fillStyle = beacon;
      ctx.beginPath();
      ctx.arc(spireX, spireTopY, 60, 0, Math.PI * 2);
      ctx.fill();

      // Floating geometric ornaments
      const ornaments = [
        { ox: W * 0.2, oy: H * 0.3, r: 18, phase: 0 },
        { ox: W * 0.8, oy: H * 0.25, r: 12, phase: 1 },
        { ox: W * 0.15, oy: H * 0.55, r: 8, phase: 2 },
        { ox: W * 0.85, oy: H * 0.5, r: 14, phase: 3 },
        { ox: W * 0.35, oy: H * 0.15, r: 10, phase: 4 },
        { ox: W * 0.65, oy: H * 0.18, r: 16, phase: 5 },
      ];
      ornaments.forEach((o) => {
        const fy = o.oy + Math.sin(t * 0.001 + o.phase) * 12;
        const alpha2 = 0.3 + Math.sin(t * 0.002 + o.phase) * 0.15;
        ctx.strokeStyle = `rgba(196,148,255,${alpha2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let s = 0; s <= 6; s++) {
          const a = (s / 6) * Math.PI * 2 + t * 0.0005;
          const ex = o.ox + o.r * Math.cos(a);
          const ey = fy + o.r * Math.sin(a);
          s === 0 ? ctx.moveTo(ex, ey) : ctx.lineTo(ex, ey);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner dot
        ctx.fillStyle = `rgba(217,70,168,${alpha2 * 0.8})`;
        ctx.beginPath();
        ctx.arc(o.ox, fy, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

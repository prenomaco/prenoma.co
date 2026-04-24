"use client";

import { useRef, useEffect } from "react";
import { createNoise3D } from "simplex-noise";

interface BlobConfig {
  bx: number;
  by: number;
  rx: number;
  ry: number;
  rotation: number; // radians
  color: [number, number, number]; // RGB
  opacity: number;
  nx: number;
  ny: number;
  pass: "under" | "core";
}

export default function WavyBackground(): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const lerped = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const noise3D = createNoise3D();
    let raf: number;
    let t = 0;

    const resize = () => {
      // Render at half resolution — blur hides the downsample, saves GPU
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = Math.round(window.innerWidth * 0.5 * dpr);
      canvas.height = Math.round(window.innerHeight * 0.5 * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    // Two-pass blob system: "under" = dark maroon underlay (large, diffuse),
    // "core" = bright orange-red cores (smaller, more saturated).
    // All by values sit within 40–65% of viewport height.
    // Left peak (bx≈0.28) is brighter/more saturated than right (bx≈0.68).
    const blobs: BlobConfig[] = [
      // ── UNDERLAY PASS ─────────────────────────────────────────────────────
      // Centre bridge — wide, flat, deep maroon foundation
      { bx: 0.48, by: 0.58, rx: 580, ry: 230, rotation: 0.08,  color: [90, 16, 6],   opacity: 0.55, nx: 0.5,  ny: 0.5,  pass: "under" },
      // Left underlay — large diffuse maroon halo behind left peak
      { bx: 0.22, by: 0.52, rx: 520, ry: 260, rotation: -0.06, color: [107, 21, 8],  opacity: 0.50, nx: 0.15, ny: 0.75, pass: "under" },
      // Right underlay — smaller, higher, cooler maroon
      { bx: 0.70, by: 0.43, rx: 420, ry: 190, rotation: 0.10,  color: [85, 14, 5],   opacity: 0.42, nx: 0.85, ny: 0.25, pass: "under" },
      // Far-left edge extension — very soft, extends band leftward
      { bx: 0.06, by: 0.50, rx: 320, ry: 160, rotation: -0.12, color: [100, 18, 7],  opacity: 0.30, nx: 0.05, ny: 0.80, pass: "under" },

      // ── CORE PASS ──────────────────────────────────────────────────────────
      // Left core — brightest, most saturated orange-red, slightly lower
      { bx: 0.27, by: 0.54, rx: 300, ry: 155, rotation: -0.05, color: [224, 75, 35],  opacity: 0.82, nx: 0.28, ny: 0.68, pass: "core" },
      // Left secondary — slightly right of centre, mid orange-red
      { bx: 0.38, by: 0.56, rx: 240, ry: 125, rotation: 0.07,  color: [194, 59, 24],  opacity: 0.65, nx: 0.40, ny: 0.55, pass: "core" },
      // Right core — dimmer, slightly smaller, higher
      { bx: 0.67, by: 0.44, rx: 260, ry: 128, rotation: 0.09,  color: [168, 44, 16],  opacity: 0.60, nx: 0.70, ny: 0.22, pass: "core" },
      // Accent flare — deep ember between left core and bridge
      { bx: 0.33, by: 0.60, rx: 180, ry: 95,  rotation: -0.10, color: [139, 18, 0],   opacity: 0.50, nx: 0.35, ny: 0.62, pass: "core" },
    ];

    const draw = () => {
      t += 0.004;

      // Smooth mouse lerp — slow lag for dreamy parallax
      lerped.current.x += (mouse.current.x - lerped.current.x) * 0.03;
      lerped.current.y += (mouse.current.y - lerped.current.y) * 0.03;

      // Max parallax offset in px at display resolution (±15 x, ±10 y)
      // Canvas is half-res so halve the offset to match screen pixels
      const mx = (lerped.current.x - 0.5) * 15;
      const my = (lerped.current.y - 0.5) * 10;

      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = "#161415";
      ctx.fillRect(0, 0, W, H);

      // Draw underlay pass first, then core pass on top
      const passes: Array<BlobConfig["pass"]> = ["under", "core"];

      for (const pass of passes) {
        for (const b of blobs) {
          if (b.pass !== pass) continue;

          // Independent noise offsets per blob axis
          const ox = noise3D(b.nx,      b.ny,      t) * W * 0.04;
          const oy = noise3D(b.nx + 10, b.ny + 10, t) * H * 0.035;

          // Noise-modulated opacity — ±0.12 breathing/pulse
          const noisedOpacity = b.opacity + noise3D(b.nx + 5, b.ny + 5, t * 0.7) * 0.12;
          const clampedOpacity = Math.max(0, Math.min(1, noisedOpacity));

          const cx = b.bx * W + ox + mx;
          const cy = b.by * H + oy + my;

          const [r, g, bl] = b.color;

          ctx.save();

          // Translate to blob centre for rotation
          ctx.translate(cx, cy);
          ctx.rotate(b.rotation);
          ctx.translate(-cx, -cy);

          // Blur radius scaled to the larger radial dimension
          const blurPx = Math.round(b.rx * 0.28);
          ctx.filter = `blur(${blurPx}px)`;
          ctx.globalAlpha = clampedOpacity;

          // Radial gradient with proper feathered stops
          const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, b.rx);
          grad.addColorStop(0,    `rgba(${r},${g},${bl},1.0)`);
          grad.addColorStop(0.35, `rgba(${r},${g},${bl},0.65)`);
          grad.addColorStop(0.65, `rgba(${r},${g},${bl},0.2)`);
          grad.addColorStop(1.0,  `rgba(${r},${g},${bl},0)`);

          // Organic ellipse with ry/rx ratio 0.4–0.75
          ctx.beginPath();
          ctx.ellipse(cx, cy, b.rx, b.ry, 0, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();

          ctx.restore();
        }
      }

      // ── GRAIN OVERLAY ─────────────────────────────────────────────────────
      // Film-grain texture pass: small random-opacity dots at ~3% alpha
      ctx.save();
      ctx.filter = "none";
      const grainCount = Math.round((W * H) / 600);
      for (let i = 0; i < grainCount; i++) {
        const gx = Math.random() * W;
        const gy = Math.random() * H;
        const ga = Math.random() * 0.03;
        ctx.globalAlpha = ga;
        ctx.fillStyle = "#c8a080";
        ctx.fillRect(gx, gy, 1, 1);
      }
      ctx.restore();

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
      aria-hidden="true"
    />
  );
}

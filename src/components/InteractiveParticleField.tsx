/**
 * InteractiveParticleField.tsx
 *
 * A fullscreen canvas particle field inspired by Google Antigravity.
 * Particles rest at fixed positions and spring away from the cursor,
 * then ease back to their origins when the cursor moves away.
 *
 * ─── Configuration ────────────────────────────────────────────────────────────
 * All tuneable values live in CONFIG. Touch nothing else to adjust the feel.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { useEffect, useRef } from "react";

// ─── Tuneable constants ───────────────────────────────────────────────────────

const CONFIG = {
  spacing: 34,
  interactionRadius: 150,
  repelStrength: 60,
  springStrength: 0.08,
  damping: 0.82,
  minWidth: 2,
  maxWidth: 5,
  minHeight: 1,
  maxHeight: 2,
  maxRotation: 180,
  colors: [
    { hex: "#F3F3F3", weight: 70 },
    { hex: "#FF3EA5", weight: 20 },
    { hex: "#A855F7", weight: 10 },
  ] as const,
  minOpacity: 0.35,
  maxOpacity: 0.75,
} as const;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Particle {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rotation: number;
  color: string;
  opacity: number;
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function pickColor(): string {
  const total = CONFIG.colors.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * total;
  for (const entry of CONFIG.colors) {
    r -= entry.weight;
    if (r <= 0) return entry.hex;
  }
  return CONFIG.colors[0].hex;
}

// ─── Particle factory ─────────────────────────────────────────────────────────

function buildGrid(width: number, height: number): Particle[] {
  const particles: Particle[] = [];

  for (let y = CONFIG.spacing / 2; y < height; y += CONFIG.spacing) {
    for (let x = CONFIG.spacing / 2; x < width; x += CONFIG.spacing) {
      const jx = rand(-4, 4);
      const jy = rand(-4, 4);
      const ox = x + jx;
      const oy = y + jy;

      particles.push({
        ox,
        oy,
        x: ox,
        y: oy,
        vx: 0,
        vy: 0,
        w: rand(CONFIG.minWidth, CONFIG.maxWidth),
        h: rand(CONFIG.minHeight, CONFIG.maxHeight),
        rotation: rand(0, CONFIG.maxRotation) * (Math.PI / 180),
        color: pickColor(),
        opacity: rand(CONFIG.minOpacity, CONFIG.maxOpacity),
      });
    }
  }

  return particles;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function InteractiveParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = window.devicePixelRatio || 1;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    function applySize() {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas!.width = cssW * dpr;
      canvas!.height = cssH * dpr;
      canvas!.style.width = `${cssW}px`;
      canvas!.style.height = `${cssH}px`;
      ctx!.scale(dpr, dpr);
    }
    applySize();

    let particles = buildGrid(cssW, cssH);

    let resizeTimer: ReturnType<typeof setTimeout>;

    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ctx!.setTransform(1, 0, 0, 1, 0, 0);
        applySize();
        particles = buildGrid(cssW, cssH);
        if (reducedMotion) drawStatic();
      }, 150);
    }

    window.addEventListener("resize", onResize, { passive: true });

    let mx = -9999;
    let my = -9999;

    function onMove(e: MouseEvent | PointerEvent) {
      mx = e.clientX;
      my = e.clientY;
    }
    function onLeave() {
      mx = -9999;
      my = -9999;
    }

    if (!reducedMotion) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("mouseleave", onLeave, { passive: true });
    }

    function drawParticle(p: Particle) {
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.globalAlpha = p.opacity;
      ctx!.fillStyle = p.color;
      const hw = p.w / 2;
      const hh = p.h / 2;
      ctx!.beginPath();
      ctx!.roundRect(-hw, -hh, p.w, p.h, hh);
      ctx!.fill();
      ctx!.restore();
    }

    function drawStatic() {
      ctx!.clearRect(0, 0, cssW, cssH);
      for (const p of particles) drawParticle(p);
    }

    if (reducedMotion) {
      drawStatic();
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    let rafId: number;
    const r2 = CONFIG.interactionRadius * CONFIG.interactionRadius;

    function tick() {
      if (document.hidden) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      ctx!.clearRect(0, 0, cssW, cssH);

      for (const p of particles) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < r2 && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const factor =
            (1 - dist / CONFIG.interactionRadius) * CONFIG.repelStrength;
          p.vx += (dx / dist) * factor;
          p.vy += (dy / dist) * factor;
        }

        p.vx += (p.ox - p.x) * CONFIG.springStrength;
        p.vy += (p.oy - p.y) * CONFIG.springStrength;

        p.vx *= CONFIG.damping;
        p.vy *= CONFIG.damping;

        p.x += p.vx;
        p.y += p.vy;

        drawParticle(p);
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 0,
        display: "block",
      }}
    />
  );
}

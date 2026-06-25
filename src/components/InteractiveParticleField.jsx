/**
 * InteractiveParticleField.jsx
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
  /**
   * Approximate px gap between particles in each axis.
   * Higher = sparser field.
   */
  spacing: 34,

  /**
   * Radius (CSS px) around the cursor where particles react.
   */
  interactionRadius: 150,

  /**
   * How hard the cursor pushes particles away.
   * Scaled by (1 - distance/radius) so edge particles barely move.
   */
  repelStrength: 60,

  /**
   * Spring constant: how eagerly particles return home.
   * 0.06–0.12 is a good range. Higher = snappier.
   */
  springStrength: 0.08,

  /**
   * Damping applied to velocity each frame.
   * 0.82 feels like moving through soft air.
   */
  damping: 0.82,

  /** Particle width range (px) */
  minWidth: 2,
  maxWidth: 5,

  /** Particle height range (px) */
  minHeight: 1,
  maxHeight: 2,

  /** Max initial rotation in degrees (randomised per particle) */
  maxRotation: 180,

  /**
   * Color palette with weighted probability.
   * Weights are relative — they don't need to sum to 100.
   */
  colors: [
    { hex: "#F3F3F3", weight: 70 }, // Soft White
    { hex: "#FF3EA5", weight: 20 }, // Hot Pink
    { hex: "#A855F7", weight: 10 }, // Violet
  ],

  /**
   * Base opacity of each particle.
   * Slight variation is applied per-particle for organic feel.
   */
  minOpacity: 0.35,
  maxOpacity: 0.75,
};

// ─── Utilities ────────────────────────────────────────────────────────────────

function rand(min, max) {
  return min + Math.random() * (max - min);
}

function pickColor() {
  const total = CONFIG.colors.reduce((s, c) => s + c.weight, 0);
  let r = Math.random() * total;
  for (const entry of CONFIG.colors) {
    r -= entry.weight;
    if (r <= 0) return entry.hex;
  }
  return CONFIG.colors[0].hex;
}

// ─── Particle factory ─────────────────────────────────────────────────────────

function buildGrid(width, height) {
  const particles = [];

  // Offset every other column for a slightly more organic hex-ish grid
  for (let y = CONFIG.spacing / 2; y < height; y += CONFIG.spacing) {
    for (let x = CONFIG.spacing / 2; x < width; x += CONFIG.spacing) {
      // Tiny jitter so the grid doesn't look mechanical
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
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check reduced motion once; if true we draw a static field and quit.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── DPI-aware sizing ────────────────────────────────────────────────────

    const dpr = window.devicePixelRatio || 1;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;

    function applySize() {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.scale(dpr, dpr);
    }
    applySize();

    // ── Particle state ──────────────────────────────────────────────────────

    let particles = buildGrid(cssW, cssH);

    // ── Resize ──────────────────────────────────────────────────────────────

    let resizeTimer;

    function onResize() {
      // Debounce — only rebuild after resize settles
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        // Re-apply scale after canvas dimensions reset
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        applySize();
        particles = buildGrid(cssW, cssH);
        if (reducedMotion) drawStatic();
      }, 150);
    }

    window.addEventListener("resize", onResize, { passive: true });

    // ── Cursor tracking ─────────────────────────────────────────────────────

    let mx = -9999; // start off-screen so nothing reacts on load
    let my = -9999;

    function onMove(e) {
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

    // ── Draw helpers ────────────────────────────────────────────────────────

    function drawParticle(p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      // Rounded rectangle capsule (rounded ends)
      const hw = p.w / 2;
      const hh = p.h / 2;
      ctx.beginPath();
      ctx.roundRect(-hw, -hh, p.w, p.h, hh); // radius = half-height = pill shape
      ctx.fill();
      ctx.restore();
    }

    // ── Static render (reduced-motion) ──────────────────────────────────────

    function drawStatic() {
      ctx.clearRect(0, 0, cssW, cssH);
      for (const p of particles) drawParticle(p);
    }

    if (reducedMotion) {
      drawStatic();
      // Cleanup for reduced-motion path
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    // ── Animation loop ──────────────────────────────────────────────────────

    let rafId;
    const r2 = CONFIG.interactionRadius * CONFIG.interactionRadius; // squared radius

    function tick() {
      if (document.hidden) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, cssW, cssH);

      for (const p of particles) {
        // Vector from cursor to particle
        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq < r2 && distSq > 0) {
          // Particle is within interaction radius → repel
          const dist = Math.sqrt(distSq);
          const factor =
            (1 - dist / CONFIG.interactionRadius) * CONFIG.repelStrength;
          // Normalised push direction
          p.vx += (dx / dist) * factor;
          p.vy += (dy / dist) * factor;
        }

        // Spring back to origin
        p.vx += (p.ox - p.x) * CONFIG.springStrength;
        p.vy += (p.oy - p.y) * CONFIG.springStrength;

        // Damping
        p.vx *= CONFIG.damping;
        p.vy *= CONFIG.damping;

        // Integrate
        p.x += p.vx;
        p.y += p.vy;

        drawParticle(p);
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    // ── Cleanup ─────────────────────────────────────────────────────────────

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
        pointerEvents: "none", // never blocks clicks or hovers
        zIndex: 0,             // above background, below all content
        display: "block",
      }}
    />
  );
}

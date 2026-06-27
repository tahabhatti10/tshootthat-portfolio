import { useEffect, useRef } from 'react';

const CONFIG = {
  spacing: 28,
  dotRadius: 1.5,
  spotlightRadius: 160,
  falloff: 0.6,
  maxOpacity: 0.7,
  pinkWeight: 60,
  colors: {
    pink: '#FF3EA5',
    violet: '#A855F7',
  },
};

function pickColor() {
  return Math.random() * 100 < CONFIG.pinkWeight
    ? CONFIG.colors.pink
    : CONFIG.colors.violet;
}

function buildDots(w, h) {
  const dots = [];
  for (let y = CONFIG.spacing / 2; y < h; y += CONFIG.spacing) {
    for (let x = CONFIG.spacing / 2; x < w; x += CONFIG.spacing) {
      dots.push({ x, y, color: pickColor() });
    }
  }
  return dots;
}

export default function DotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let cssW = window.innerWidth;
    let cssH = window.innerHeight;
    let dots = [];

    let mx = -9999;
    let my = -9999;

    function applySize() {
      cssW = window.innerWidth;
      cssH = window.innerHeight;
      canvas.width = cssW * dpr;
      canvas.height = cssH * dpr;
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = buildDots(cssW, cssH);
    }

    applySize();

    let resizeTimer;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applySize, 150);
    }

    window.addEventListener('resize', onResize, { passive: true });

    function onMove(e) {
      mx = e.clientX;
      my = e.clientY;
    }

    function onLeave() {
      mx = -9999;
      my = -9999;
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    let rafId;
    const r = CONFIG.spotlightRadius;
    const r2 = r * r;

    function tick() {
      if (document.hidden) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      ctx.clearRect(0, 0, cssW, cssH);

      for (const dot of dots) {
        const dx = dot.x - mx;
        const dy = dot.y - my;
        const distSq = dx * dx + dy * dy;

        if (distSq > r2) continue;

        const dist = Math.sqrt(distSq);
        const t = 1 - dist / r;
        const alpha = Math.pow(t, CONFIG.falloff) * CONFIG.maxOpacity;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, CONFIG.dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        display: 'block',
      }}
    />
  );
}

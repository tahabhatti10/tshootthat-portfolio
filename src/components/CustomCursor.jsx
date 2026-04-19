import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ mx: 0, my: 0, rx: 0, ry: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    const onMouseMove = (e) => {
      pos.current.mx = e.clientX;
      pos.current.my = e.clientY;
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    const animateRing = () => {
      pos.current.rx += (pos.current.mx - pos.current.rx) * 0.1;
      pos.current.ry += (pos.current.my - pos.current.ry) * 0.1;
      ring.style.left = pos.current.rx + 'px';
      ring.style.top = pos.current.ry + 'px';
      requestAnimationFrame(animateRing);
    };

    const interactiveEls = document.querySelectorAll('a, button, .project-card, .skill-card, .stat-box');

    const onEnter = () => {
      cursor.style.width = '22px';
      cursor.style.height = '22px';
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.opacity = '0.7';
      ring.style.borderColor = 'var(--pink)';
    };

    const onLeave = () => {
      cursor.style.width = '14px';
      cursor.style.height = '14px';
      ring.style.width = '42px';
      ring.style.height = '42px';
      ring.style.opacity = '0.45';
      ring.style.borderColor = 'var(--purple)';
    };

    document.addEventListener('mousemove', onMouseMove);
    animateRing();

    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
}

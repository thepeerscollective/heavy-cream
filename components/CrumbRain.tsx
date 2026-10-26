'use client';
import { useEffect, useRef } from 'react';
import { useHC } from '@/lib/state';

const COLS = ['#f7c873', '#f7b8cb', '#a10e1a', '#d9954a'];

/** scrolling sheds crumbs. they fall and get counted into the footer pile */
export default function CrumbRain() {
  const { addCrumbs } = useHC();
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let last = window.scrollY, acc = 0, pending = 0;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const flush = setInterval(() => { if (pending) { addCrumbs(pending); pending = 0; } }, 800);
    const on = () => {
      const y = window.scrollY; acc += Math.abs(y - last); last = y;
      while (acc > 160) {
        acc -= 160;
        const n = 1 + Math.floor(Math.random() * 3); pending += n;
        if (reduce || !layer.current) continue;
        for (let i = 0; i < n; i++) {
          const c = document.createElement('i'); const d = 4 + Math.random() * 8;
          Object.assign(c.style, { left: 8 + Math.random() * 84 + 'vw', width: d + 'px', height: d * 0.75 + 'px', background: COLS[Math.floor(Math.random() * 4)], animationDuration: 1.1 + Math.random() * 0.8 + 's', ['--r' as string]: Math.random() * 540 - 270 + 'deg', ['--x' as string]: Math.random() * 60 - 30 + 'px' });
          layer.current.appendChild(c);
          setTimeout(() => c.remove(), 2100);
        }
      }
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => { window.removeEventListener('scroll', on); clearInterval(flush); };
  }, [addCrumbs]);
  return <div className="crumb-rain" ref={layer} aria-hidden />;
}

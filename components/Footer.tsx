'use client';
import Link from 'next/link';
import { useMemo } from 'react';
import { useHC } from '@/lib/state';

const COLS = ['#f7c873', '#f7b8cb', '#a10e1a', '#fff4ea', '#d9954a'];

export default function Footer() {
  const { crumbs, sweep, ready } = useHC();
  const n = Math.min(crumbs, 420);
  const pile = useMemo(() => {
    let s = 7; const r = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    const h = 14 + Math.min(90, Math.sqrt(n) * 5);
    return Array.from({ length: n }, () => {
      const u = r() * 2 - 1; const d = 4 + r() * 9;
      return { left: 50 + u * 46, bottom: r() * (1 - u * u) * h, d, h: d * (0.6 + r() * 0.5), c: COLS[Math.floor(r() * COLS.length)], rot: r() * 180 };
    });
  }, [n]);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="giant" aria-hidden>heavy cream</div>
        <div className="foot-row">
          <div>
            <p className="body cherry">12 kingsland road, london e8<br />mon–sun 7:00–18:00</p>
          </div>
          <nav className="foot-links" aria-label="footer">
            <a href="https://instagram.com/" target="_blank" rel="noreferrer">instagram</a>
            <Link href="/about/#hiring">careers</Link>
            <Link href="/legal/#accessibility">accessibility</Link>
            <Link href="/legal/">legal</Link>
          </nav>
        </div>
        <div className="crumb-line">
          <span className="mono cherry">{ready ? (crumbs ? `you made ${crumbs} crumb${crumbs === 1 ? '' : 's'}. we’ll sweep.` : 'not a crumb. tidy. suspicious.') : ' '}</span>
          {crumbs > 0 && <button className="mono sweep" onClick={sweep}>sweep ↺</button>}
        </div>
      </div>
      <div className="pile" aria-hidden>
        {pile.map((c, i) => (
          <i key={i} style={{ left: `${c.left}%`, bottom: c.bottom, width: c.d, height: c.h, background: c.c, transform: `rotate(${c.rot}deg)` }} />
        ))}
      </div>
    </footer>
  );
}

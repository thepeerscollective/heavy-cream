'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { londonNow, modeAt, type Kind, type Mode } from './data';

const read = <T,>(k: string, f: T): T => {
  try { const v = localStorage.getItem(k); return v ? (JSON.parse(v) as T) : f; } catch { return f; }
};
const write = (k: string, v: unknown) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

export type Line = { key: string; id: string; name: string; price: number; qty: number; kind: Kind; img?: string; note?: string };

type Ctx = {
  ready: boolean;
  // box
  lines: Line[]; add: (l: Omit<Line, 'qty' | 'key'> & { key?: string }, from?: HTMLElement | null) => void; setQty: (key: string, q: number) => void; clear: () => void;
  count: number; pastries: number; free: number; subtotal: number; total: number; bump: number;
  open: boolean; setOpen: (o: boolean) => void;
  // stamps
  stamps: string[]; stamp: (reason?: string) => boolean;
  // crumbs
  crumbs: number; addCrumbs: (n: number) => void; sweep: () => void;
  // sound
  sound: boolean; setSound: (s: boolean) => void; ding: (kind?: 'ding' | 'crunch' | 'thunk' | 'squeeze') => void;
  // time + mode
  now: number; mode: Mode; peek: boolean; setPeek: (p: boolean) => void; clock: string;
  // name on the cup
  cupName: string; setCupName: (s: string) => void;
  toast: (m: string) => void;
};
const C = createContext<Ctx>(null as unknown as Ctx);
export const useHC = () => useContext(C);

const PEEK_TIME = 10 * 60 + 24; // peeking at the day shows 10:24

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [stamps, setStamps] = useState<string[]>([]);
  const [crumbs, setCrumbs] = useState(0);
  const [sound, setSoundS] = useState(false);
  const [real, setReal] = useState({ minutes: 10 * 60, day: '', hm: '10:00' });
  const [peek, setPeekS] = useState(false);
  const [cupName, setCupNameS] = useState('');
  const [msg, setMsg] = useState<string | null>(null);
  const [bump, setBump] = useState(0);
  const audio = useRef<AudioContext | null>(null);

  useEffect(() => {
    setLines(read('hc-box', []));
    setCrumbs(read('hc-crumbs', 0));
    setSoundS(read('hc-sound', false));
    setCupNameS(read('hc-cup', ''));
    setPeekS(read('hc-peek', false));
    const n = londonNow();
    setReal(n);
    // one stamp per day you visit
    const s = read<string[]>('hc-stamps', []);
    if (!s.includes(n.day)) { s.push(n.day); write('hc-stamps', s); }
    setStamps(s);
    setReady(true);
    const id = setInterval(() => setReal(londonNow()), 30000);
    return () => clearInterval(id);
  }, []);

  const realMode = modeAt(real.minutes);
  const mode: Mode = peek && realMode !== 'open' ? 'open' : realMode;
  const now = peek && realMode !== 'open' ? PEEK_TIME : real.minutes;
  useEffect(() => { document.documentElement.dataset.mode = mode; }, [mode]);

  const toast = useCallback((m: string) => { setMsg(m); window.setTimeout(() => setMsg((x) => (x === m ? null : x)), 2600); }, []);

  const ding = useCallback((kind: 'ding' | 'crunch' | 'thunk' | 'squeeze' = 'ding') => {
    if (!read('hc-sound', false)) return;
    try {
      const ctx = (audio.current ??= new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)());
      const t = ctx.currentTime;
      const g = ctx.createGain(); g.connect(ctx.destination);
      if (kind === 'crunch') {
        const b = ctx.createBuffer(1, ctx.sampleRate * 0.18, ctx.sampleRate); const d = b.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2) * (Math.random() > 0.7 ? 1 : 0.3);
        const s = ctx.createBufferSource(); s.buffer = b; const f = ctx.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = 900; s.connect(f); f.connect(g); g.gain.value = 0.5; s.start(t); return;
      }
      const o = ctx.createOscillator(); o.connect(g);
      if (kind === 'ding') { o.type = 'sine'; o.frequency.setValueAtTime(1568, t); g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.35, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2); o.start(t); o.stop(t + 1.25);
        const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 3136; const g2 = ctx.createGain(); g2.gain.setValueAtTime(0.08, t); g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.6); o2.connect(g2); g2.connect(ctx.destination); o2.start(t); o2.stop(t + 0.62); }
      if (kind === 'thunk') { o.type = 'triangle'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(60, t + 0.15); g.gain.setValueAtTime(0.5, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2); o.start(t); o.stop(t + 0.22); }
      if (kind === 'squeeze') { o.type = 'sine'; o.frequency.setValueAtTime(500 + Math.random() * 200, t); o.frequency.exponentialRampToValueAtTime(900, t + 0.06); g.gain.setValueAtTime(0.06, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08); o.start(t); o.stop(t + 0.09); }
    } catch {}
  }, []);

  const setSound = (s: boolean) => { setSoundS(s); write('hc-sound', s); if (s) setTimeout(() => ding('ding'), 30); };
  const setPeek = (p: boolean) => { setPeekS(p); write('hc-peek', p); };
  const setCupName = (s: string) => { setCupNameS(s); write('hc-cup', s); };

  const saveLines = (n: Line[]) => { setLines(n); write('hc-box', n); };
  const flyTo = (from?: HTMLElement | null, src?: string) => {
    const box = document.querySelector('[data-box-target]') as HTMLElement | null;
    if (!from || !box || !src || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const a = from.getBoundingClientRect(), b = box.getBoundingClientRect();
    const el = document.createElement('img'); el.src = src; el.className = 'flyer';
    Object.assign(el.style, { left: a.left + a.width / 2 - 50 + 'px', top: a.top + a.height / 2 - 50 + 'px' });
    document.body.appendChild(el);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2), dy = b.top + b.height / 2 - (a.top + a.height / 2);
    el.animate([{ transform: 'translate(0,0) scale(1) rotate(0)' }, { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 120}px) scale(.7) rotate(-90deg)`, offset: 0.5 }, { transform: `translate(${dx}px, ${dy}px) scale(.2) rotate(-200deg)`, opacity: 0.6 }], { duration: 700, easing: 'cubic-bezier(.4,.2,.4,1)' }).onfinish = () => el.remove();
  };
  const add: Ctx['add'] = (l, from) => {
    const key = l.key ?? l.id;
    setLines((prev) => {
      const f = prev.find((p) => p.key === key);
      const n = f ? prev.map((p) => (p.key === key ? { ...p, qty: p.qty + 1 } : p)) : [...prev, { ...l, key, qty: 1 }];
      write('hc-box', n);
      return n;
    });
    flyTo(from, l.img ? `${process.env.NEXT_PUBLIC_BASE ?? ''}/img/${l.img}.webp` : undefined);
    setTimeout(() => setBump((b) => b + 1), 650);
    ding('thunk');
    toast(`${l.name} → in the box`);
  };
  const setQty = (key: string, q: number) => saveLines(q <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty: q } : l)));
  const clear = () => saveLines([]);

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const pastryLines = lines.filter((l) => l.kind === 'pastry');
  const pastries = pastryLines.reduce((s, l) => s + l.qty, 0);
  const cheapest = pastryLines.length ? Math.min(...pastryLines.map((l) => l.price)) : 0;
  const free = Math.floor(pastries / 13) * cheapest;
  const subtotal = lines.reduce((s, l) => s + l.price * l.qty, 0);
  const total = Math.max(0, subtotal - free);

  const stamp = (reason?: string) => {
    const key = `${londonNow().day}${reason ? '-' + reason : ''}`;
    const s = read<string[]>('hc-stamps', []);
    if (s.includes(key)) return false;
    s.push(key); write('hc-stamps', s); setStamps([...s]); ding('thunk');
    return true;
  };

  const addCrumbs = useCallback((n: number) => setCrumbs((c) => { const v = c + n; write('hc-crumbs', v); return v; }), []);
  const sweep = () => { setCrumbs(0); write('hc-crumbs', 0); toast('swept. thank you.'); };

  const value: Ctx = {
    ready, lines, add, setQty, clear, count, pastries, free, subtotal, total, bump, open, setOpen,
    stamps, stamp, crumbs, addCrumbs, sweep, sound, setSound, ding,
    now, mode, peek, setPeek, clock: real.hm, cupName, setCupName, toast,
  };
  return (
    <C.Provider value={value}>
      {children}
      <div className="toast" role="status" aria-live="polite" data-show={msg ? '' : undefined}>{msg}</div>
    </C.Provider>
  );
}

export function useInView<T extends HTMLElement>(threshold = 0.25) {
  const [el, setEl] = useState<T | null>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!el || seen) return;
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el); return () => io.disconnect();
  }, [el, seen, threshold]);
  return [setEl, seen] as const;
}
export { useMemo };

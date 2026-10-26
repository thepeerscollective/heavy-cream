'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { img, money, hm, OPEN, CLOSE } from '@/lib/data';
import { useHC } from '@/lib/state';
import StampCard from './StampCard';

export default function BoxDrawer() {
  const { open, setOpen, lines, setQty, pastries, free, subtotal, total, count, mode, now, cupName, clear, stamp } = useHC();
  const [slot, setSlot] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState<Record<string, string>>({});
  const [stage, setStage] = useState<'box' | 'tying' | 'done'>('box');
  const [done, setDone] = useState<{ no: string; slot: string; name: string } | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  // pick-up slots: today if there's time, else tomorrow from 7:00
  const today = mode === 'open' && now < CLOSE - 60;
  const slots = today
    ? Array.from({ length: 4 }, (_, i) => `today ${hm(Math.ceil((now + 30) / 30) * 30 + i * 30)}`)
    : ['tomorrow 7:00', 'tomorrow 7:30', 'tomorrow 8:00', 'tomorrow 8:30'];

  useEffect(() => { if (open) { setName((n) => n || cupName); setSlot((s) => s || slots[0]); } }, [open]); // eslint-disable-line
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    setTimeout(() => panel.current?.querySelector<HTMLElement>('h2')?.focus(), 30);
    const k = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll<HTMLElement>('button, input, a[href]');
        if (!f.length) return; const a = f[0], b = f[f.length - 1];
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); } else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
      }
    };
    document.addEventListener('keydown', k);
    return () => { document.removeEventListener('keydown', k); document.body.style.overflow = ''; prev?.focus?.(); if (stage === 'done') setStage('box'); };
  }, [open]); // eslint-disable-line

  const tie = () => {
    const e: Record<string, string> = {};
    if (!count) e.box = 'the box is empty. go get something.';
    if (!name.trim()) e.name = 'a name for the box';
    if (phone.replace(/\D/g, '').length < 8) e.phone = 'we text you when it’s ready';
    setErr(e); if (Object.keys(e).length) return;
    setStage('tying');
    setTimeout(() => {
      setDone({ no: String(200 + Math.floor(Math.random() * 99)).padStart(4, '0'), slot, name });
      stamp('order'); clear(); setStage('done'); panel.current?.scrollTo({ top: 0 });
    }, 1300);
  };

  if (!open) return null;
  const toDozen = 13 - (pastries % 13);
  return (
    <div className="drawer-wrap" onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className="drawer" role="dialog" aria-modal="true" aria-labelledby="box-title" ref={panel}>
        <button className="drawer-x" onClick={() => setOpen(false)} aria-label="close the box">✕</button>
        {stage !== 'done' ? (
          <>
            <h2 id="box-title" tabIndex={-1} className="title cherry">your box</h2>
            <div className={`box-visual ${stage === 'tying' ? 'tying' : ''}`}>
              <img src={img(stage === 'tying' ? 'box-closed' : 'box-open')} alt="" className="cutout" />
              {stage === 'tying' && (
                <svg className="bow" viewBox="0 0 120 70" aria-hidden><path d="M60 35 C 30 5, 5 20, 20 40 S 55 40, 60 35 C 65 30, 115 5, 100 40 S 65 40, 60 35 L 45 68 M60 35 L 78 68" /></svg>
              )}
            </div>
            {lines.length === 0 ? (
              <p className="body">empty. the tray is on the <Link href="/menu/" className="cherry" onClick={() => setOpen(false)} style={{ textDecoration: 'underline' }}>menu</Link>.</p>
            ) : (
              <ul className="box-lines" aria-live="polite">
                {lines.map((l) => (
                  <li key={l.key}>
                    <button onClick={() => setQty(l.key, l.qty - 1)} aria-label={`one less ${l.name}`}>–</button>
                    <span className="q">{l.qty}</span>
                    <button onClick={() => setQty(l.key, l.qty + 1)} aria-label={`one more ${l.name}`}>+</button>
                    <span className="nm">{l.name}{l.note ? <em> · {l.note}</em> : null}</span>
                    <span className="pr mono">{money(l.price * l.qty)}</span>
                  </li>
                ))}
              </ul>
            )}
            {err.box && <p className="err">{err.box}</p>}
            {pastries > 0 && (
              <div className="dozen">
                <div className="bar"><span style={{ width: `${((pastries % 13) / 12) * 100}%` }} /></div>
                <p className="mono cherry">
                  {free > 0 ? `baker’s dozen! ${Math.floor(pastries / 13)} pastr${pastries >= 26 ? 'ies' : 'y'} on us · −${money(free)}` : `${pastries} pastr${pastries === 1 ? 'y' : 'ies'} · add ${toDozen} more and the 13th is on us`}
                </p>
              </div>
            )}
            <div className="box-total"><span className="mono">total</span><span className="title-s cherry">{money(total)}</span>{free > 0 && <s className="mono">{money(subtotal)}</s>}</div>
            <fieldset className="fs">
              <legend className="mono cherry">pick-up</legend>
              <div className="chips" role="radiogroup" aria-label="pick-up time">
                {slots.map((s) => <button key={s} role="radio" aria-checked={slot === s} className="chip" onClick={() => setSlot(s)}>{s}</button>)}
              </div>
            </fieldset>
            <div className="grid2">
              <label className="field"><span>name on the box</span><input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" aria-invalid={!!err.name} />{err.name && <span className="err">{err.name}</span>}</label>
              <label className="field"><span>phone</span><input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" autoComplete="tel" aria-invalid={!!err.phone} />{err.phone && <span className="err">{err.phone}</span>}</label>
            </div>
            <div className="pay-embed mono">payment provider sits here · card · apple pay · demo, nothing is charged</div>
            <button className="btn fill block" onClick={tie} aria-disabled={stage === 'tying'}>{stage === 'tying' ? 'tying the string…' : `tie the box · ${money(total)}`}</button>
          </>
        ) : (
          <div className="box-done">
            <p className="script">tied with a bow</p>
            <h2 id="box-title" tabIndex={-1} className="headline-m">See you {done?.slot.replace('today ', 'at ').replace('tomorrow ', 'tomorrow, ')}.</h2>
            <img src={img('box-closed')} alt="your pink box, tied with a bow" className="cutout" style={{ width: '80%', margin: '20px auto' }} />
            <p className="mono cherry">box #{done?.no} · name on it: {done?.name}</p>
            <StampCard small />
            <button className="btn block" style={{ marginTop: 18 }} onClick={() => { setOpen(false); }}>back to the tray</button>
          </div>
        )}
      </div>
    </div>
  );
}

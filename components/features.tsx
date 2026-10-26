'use client';
import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CAKE, MOODS, fresh, img, money, type Item } from '@/lib/data';
import { useHC } from '@/lib/state';

/* ---------- 7 · bite to scroll ---------- */
const BITES = [
  'radial-gradient(circle at 96% 30%, transparent 0 15%, #000 15.3%)',
  'radial-gradient(circle at 99% 52%, transparent 0 13%, #000 13.3%)',
  'radial-gradient(circle at 90% 12%, transparent 0 11%, #000 11.3%)',
  'radial-gradient(circle at 80% 2%, transparent 0 12%, #000 12.3%)',
];
export function BiteCroissant() {
  const { ding } = useHC();
  const [clicks, setClicks] = useState(0);
  const [scrolled, setScrolled] = useState(0);
  useEffect(() => {
    const on = () => setScrolled(Math.min(2, Math.floor(window.scrollY / 260)));
    on(); window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const bites = Math.min(4, scrolled + clicks);
  const prev = useRef(0);
  useEffect(() => { if (bites > prev.current) ding('crunch'); prev.current = bites; }, [bites, ding]);
  const mask = bites ? BITES.slice(0, bites).join(', ') : 'none';
  return (
    <div className="bite-wrap">
      <button className="bite" onClick={() => setClicks((c) => Math.min(4, c + 1))} aria-label={bites >= 4 ? 'the croissant is gone' : `take a bite, ${bites} of 4 bites taken`}>
        <img src={img('hero-croissant')} alt="a golden butter croissant" className="cutout" style={{ WebkitMaskImage: mask, maskImage: mask, WebkitMaskComposite: 'source-in', maskComposite: 'intersect' }} />
      </button>
      <p className="bite-note script" aria-live="polite">{bites >= 4 ? 'ok you’re hungry.' : 'bite it. go on.'}</p>
    </div>
  );
}

/* ---------- 4 · fresh-o-meter card ---------- */
export function FreshCard({ item, size = 'm' }: { item: Item; size?: 'm' | 's' }) {
  const { now, add, mode } = useHC();
  const ref = useRef<HTMLDivElement>(null);
  const f = fresh(item, now);
  const closed = mode === 'closed';
  const state = closed && item.bake != null && !item.soldOut ? 'soon' : f.state;
  const price = state === 'old' ? item.price / 2 : item.price;
  const label = closed && item.bake != null && !item.soldOut ? 'back in the oven at 7:00' : f.label;
  return (
    <article className={`fcard ${size} st-${state}`}>
      <div className="fimg" ref={ref}>
        {state === 'fresh' && <span className={`steam s${f.steam}`} aria-hidden><i /><i /><i /></span>}
        <img src={img(item.img)} alt="" loading="lazy" />
        {state === 'sold' && <span className="gone marker" aria-hidden>GONE</span>}
        {state === 'old' && <span className="half metal" aria-hidden>½</span>}
      </div>
      <h3 className="title-s">{item.name}</h3>
      {label && <span className="mono flabel"><i className="dot" aria-hidden />{label}</span>}
      <div className="frow">
        <span className="mono price">{state === 'old' ? <><s>{money(item.price)}</s> {money(price)}</> : money(price)}</span>
        {state !== 'sold' && (
          <button className="plus" onClick={() => add({ id: item.id + (state === 'old' ? '-old' : ''), name: item.name + (state === 'old' ? ' (half price)' : ''), price, kind: item.kind === 'slice' || item.kind === 'bread' ? item.kind : 'pastry', img: item.img }, ref.current)} aria-label={`add ${item.name} to the box`}>+</button>
        )}
      </div>
    </article>
  );
}

/* ---------- 1 · write on the cake ---------- */
export function CakeBuilder({ compact = false }: { compact?: boolean }) {
  const { add, ding } = useHC();
  const [msg, setMsg] = useState('congrats on the divorce');
  const [size, setSize] = useState('8');
  const [flav, setFlav] = useState('vanilla-cherry');
  const [extras, setExtras] = useState<string[]>(['candles']);
  const [day, setDay] = useState('');
  const [days, setDays] = useState<{ key: string; label: string }[]>([]);
  const textRef = useRef<HTMLDivElement>(null);
  const [bag, setBag] = useState({ x: 70, y: 60 });
  const prevLen = useRef(msg.length);
  useEffect(() => {
    const out: { key: string; label: string }[] = []; const d = new Date();
    for (let i = 2; out.length < 4; i++) { const x = new Date(d.getFullYear(), d.getMonth(), d.getDate() + i); out.push({ key: x.toISOString().slice(0, 10), label: x.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }).toLowerCase() }); }
    setDays(out); setDay(out[1].key);
  }, []);
  useLayoutEffect(() => {
    const wrap = textRef.current; if (!wrap) return;
    const spans = wrap.querySelectorAll('span.l'); const last = spans[spans.length - 1] as HTMLElement | undefined;
    const box = wrap.parentElement!.getBoundingClientRect();
    if (last) { const r = last.getBoundingClientRect(); setBag({ x: ((r.right - box.left) / box.width) * 100, y: ((r.top - box.top) / box.height) * 100 }); }
  }, [msg, size]);
  const onType = (v: string) => { const t = v.slice(0, 40); if (t.length > prevLen.current) ding('squeeze'); prevLen.current = t.length; setMsg(t); };
  const sz = CAKE.sizes.find((s) => s.id === size)!; const fl = CAKE.flavours.find((f) => f.id === flav)!;
  const price = sz.price + extras.reduce((s, e) => s + (CAKE.extras.find((x) => x[0] === e)?.[1] ?? 0), 0);
  const words = msg.split(' ');
  const long = msg.length > 22;
  const cakeRef = useRef<HTMLDivElement>(null);
  return (
    <div className={`cake-builder ${compact ? 'compact' : ''}`}>
      <div className="cake-form">
        <label className="field">
          <span>{compact ? 'your message' : '1 · your message'}</span>
          <input value={msg} onChange={(e) => onType(e.target.value)} maxLength={40} aria-describedby="bagmeter" />
        </label>
        <div className="bagmeter" id="bagmeter"><div className="bar"><span style={{ width: `${(1 - msg.length / 40) * 100}%` }} /></div><span className="mono">piping bag · {40 - msg.length} letters left</span></div>
        <fieldset className="fs"><legend className="mono">{compact ? 'size' : '2 · size'}</legend>
          <div className="chips" role="radiogroup" aria-label="size">{CAKE.sizes.map((s) => <button key={s.id} role="radio" aria-checked={size === s.id} className="chip" onClick={() => setSize(s.id)}>{s.label}{compact ? '' : ` · serves ${s.serves} · ${money(s.price)}`}</button>)}</div>
        </fieldset>
        <fieldset className="fs"><legend className="mono">{compact ? 'flavour' : '3 · flavour = buttercream colour'}</legend>
          <div className="chips" role="radiogroup" aria-label="flavour">{CAKE.flavours.map((f) => <button key={f.id} role="radio" aria-checked={flav === f.id} className="chip" onClick={() => setFlav(f.id)}><span className="swatch" style={{ background: f.swatch }} />{f.label}</button>)}</div>
        </fieldset>
        {!compact && (
          <>
            <fieldset className="fs"><legend className="mono">4 · pick-up (48h notice)</legend>
              <div className="chips" role="radiogroup" aria-label="pick-up day">{days.map((d) => <button key={d.key} role="radio" aria-checked={day === d.key} className="chip" onClick={() => setDay(d.key)}>{d.label}</button>)}</div>
            </fieldset>
            <fieldset className="fs"><legend className="mono">5 · extras</legend>
              <div className="chips">{CAKE.extras.map(([e, p]) => <button key={e} aria-pressed={extras.includes(e)} className="chip" onClick={() => setExtras((x) => (x.includes(e) ? x.filter((y) => y !== e) : [...x, e]))}>{e}{p ? ` +${money(p)}` : ''}</button>)}</div>
            </fieldset>
          </>
        )}
        <button className={`btn ${compact ? 'cream' : 'fill'}`} onClick={() => add({ key: `cake-${Date.now()}`, id: 'cake', name: `${sz.label} ${fl.label} cake`, note: `“${msg}”`, price, kind: 'cake', img: 'cake-top' }, cakeRef.current)}>
          order this exact cake · {money(price)}
        </button>
        <p className="sr" aria-live="polite">the cake will say: {msg}</p>
      </div>
      <div className="cake-stage" ref={cakeRef} style={{ ['--s' as string]: sz.scale }}>
        <img src={img('cake-top')} alt="" className="cake-img cutout" style={{ filter: `${fl.filter} drop-shadow(0 22px 26px rgba(90,10,25,.22))` }} />
        {fl.tint && <span className="tint" aria-hidden style={{ background: fl.tint, WebkitMaskImage: `url(${img('cake-top')})`, maskImage: `url(${img('cake-top')})` }} />}
        <div className={`piped ${long ? 'long' : ''}`} ref={textRef} aria-hidden>
          {words.map((w, wi) => (
            <span key={wi} className="w">
              {[...w].map((ch, ci) => <span key={ci} className="l" style={{ ['--r' as string]: `${((wi * 7 + ci * 13) % 9) - 4}deg` }}>{ch}</span>)}
              {wi < words.length - 1 && ' '}
            </span>
          ))}
        </div>
        <img src={img('cake-piping-bag')} alt="" className="bag" style={{ left: `${bag.x}%`, top: `${bag.y}%` }} />
      </div>
    </div>
  );
}

/* ---------- 3 · wrong name on the cup ---------- */
import { misspell } from '@/lib/data';
export function WrongName() {
  const { cupName, setCupName } = useHC();
  const [name, setName] = useState('karina');
  const [step, setStep] = useState(0);
  useEffect(() => { if (cupName) setName(cupName.toLowerCase()); }, []); // eslint-disable-line
  const written = misspell(name, step);
  useEffect(() => { setCupName(written); }, [written]); // eslint-disable-line
  return (
    <div className="card cupcard">
      <h3 className="title-s">the cup knows you.</h3>
      <div className="cup">
        <img src={img('coffee-cup')} alt="" className="cutout" />
        <span key={written} className="marker cupname" aria-live="polite">{written}</span>
      </div>
      <div className="cup-row">
        <label className="field"><span>your name</span><input value={name} onChange={(e) => { setName(e.target.value); setStep(0); }} maxLength={14} /></label>
        <button className="btn" onClick={() => setStep((s) => Math.min(4, s + 1))} aria-disabled={step >= 4}>{step >= 4 ? 'it gave up' : 'that’s not my name'}</button>
      </div>
      <p className="mono muted">{step >= 4 ? 'we’ll write babe on the box too.' : `${name || 'you'} → ${misspell(name, 0).toLowerCase()} → ${misspell(name, 1).toLowerCase()} → kevin`}</p>
    </div>
  );
}

/* ---------- 6 · mood-to-coffee dial ---------- */
export function MoodDial() {
  const { add, cupName } = useHC();
  const [v, setV] = useState(100);
  const idx = Math.round(v / 25);
  const m = MOODS[idx];
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="card dialcard">
      <h3 className="title-s">how are we feeling?</h3>
      <div className="latte" ref={ref}>
        {MOODS.map((x, i) => {
          const d = Math.abs(v / 25 - i);
          return <img key={x.img} src={img(x.img)} alt={i === idx ? `latte art: ${x.img.replace('latte-', '')}` : ''} style={{ opacity: Math.max(0, 1 - d), transform: `rotate(${(v / 25 - i) * 40}deg)` }} />;
        })}
      </div>
      <input className="dial" style={{ ["--p" as string]: `${v}%` }} type="range" min={0} max={100} step={1} value={v} onChange={(e) => setV(Number(e.target.value))} onMouseUp={() => setV(idx * 25)} onTouchEnd={() => setV(idx * 25)} aria-label="how are we feeling" aria-valuetext={`${m.mood}: ${m.drink}`} />
      <div className="dial-labels mono"><span>barely alive</span><span>unhinged</span></div>
      <p className="title-s cherry result" aria-live="polite">{m.line}</p>
      <button className="btn fill sm" onClick={() => add({ id: 'drink-' + idx, name: m.drink, note: cupName ? `for ${cupName}` : undefined, price: m.price, kind: 'drink', img: m.img }, ref.current)}>add to box · {money(m.price)}</button>
    </div>
  );
}

/* ---------- 10 · morning to closed ---------- */
export function NightHero() {
  const { setPeek, clock } = useHC();
  return (
    <section className="night">
      <div className="stars" aria-hidden />
      <div className="wrap night-in">
        <p className="script" style={{ color: 'var(--night-pink)' }}>the ovens are sleeping</p>
        <h1 className="headline" style={{ color: 'var(--night-pink)' }}>Back. At. Seven.</h1>
        <div className="sleeper">
          <img src={img('night-croissant')} alt="a croissant asleep in an eye mask under a tiny blanket" className="cutout" />
          <span className="zzz script" aria-hidden><span>z</span><span>z</span><span>z</span></span>
        </div>
        <div className="night-cta">
          <Link href="/menu/" className="btn" style={{ background: 'var(--night-pink)', borderColor: 'var(--night-pink)', color: 'var(--night)' }}>pre-order for tomorrow</Link>
          <button className="btn" style={{ borderColor: 'var(--night-pink)', color: 'var(--night-pink)' }} onClick={() => setPeek(true)}>peek at the day ☀</button>
        </div>
        <p className="mono" style={{ color: 'var(--night-pink)' }}>closed · ovens back on at 07:00 · it’s {clock} in london</p>
      </div>
    </section>
  );
}

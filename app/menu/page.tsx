'use client';
import Link from 'next/link';
import { useState } from 'react';
import { PASTRIES, BREAD, SLICES, COFFEE, fresh, money } from '@/lib/data';
import { useHC } from '@/lib/state';
import { FreshCard } from '@/components/features';

export default function Menu() {
  const { now, mode } = useHC();
  const [f, setF] = useState<'all' | 'fresh' | 'half'>('all');
  const keep = (i: (typeof PASTRIES)[number]) => {
    if (f === 'all') return true;
    const s = fresh(i, now).state;
    return f === 'fresh' ? s === 'fresh' && (fresh(i, now).mins ?? 99) < 30 : s === 'old';
  };
  const sections = [['pastries', PASTRIES], ['bread + bagels', BREAD], ['cake by the slice', SLICES]] as const;
  return (
    <div className="wrap page">
      <p className="script">today’s tray</p>
      <h1 className="headline">Pastry. Bread. Coffee.</h1>
      <p className="body" style={{ marginTop: 18 }}>everything on here was baked this morning in the back. the minutes are real, the steam is honest.{mode === 'closed' ? ' we’re closed now, so everything you add is for tomorrow.' : ''}</p>
      <div className="chips" role="radiogroup" aria-label="filter" style={{ margin: '34px 0 10px' }}>
        {([['all', 'all'], ['fresh', 'fresh now'], ['half', 'half price']] as const).map(([k, l]) => (
          <button key={k} role="radio" aria-checked={f === k} className="chip" onClick={() => setF(k)}>{l}</button>
        ))}
      </div>
      {f === 'half' && now < 15 * 60 && mode === 'open' && <p className="mono cherry">half price starts at 3pm. come back then, or take a cinnamon swirl, it never learns.</p>}
      {sections.map(([title, items]) => {
        const list = items.filter(keep);
        if (!list.length) return null;
        return (
          <section key={title} className="menu-sec">
            <h2 className="mono sec-title">{title}</h2>
            <div className="menu-grid">{list.map((i) => <FreshCard key={i.id} item={i} size="s" />)}</div>
          </section>
        );
      })}
      <section className="menu-sec">
        <h2 className="mono sec-title">coffee</h2>
        <ul className="coffee-list">
          {COFFEE.map(([n, p]) => <li key={n}><span className="title-s">{n}</span><span className="lead" /><span className="mono cherry">{n.includes('/') ? `+${Math.round(p * 100)}p` : money(p)}</span></li>)}
        </ul>
        <p className="body" style={{ marginTop: 24 }}>can’t choose? <Link href="/coffee/" className="cherry" style={{ textDecoration: 'underline' }}>the mood dial will choose for you →</Link></p>
      </section>
    </div>
  );
}

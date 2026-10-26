'use client';
import Link from 'next/link';
import { useEffect } from 'react';
import { PASTRIES, BREAD, fresh, img } from '@/lib/data';
import { useHC } from '@/lib/state';
import { BiteCroissant, FreshCard, CakeBuilder, WrongName, MoodDial, NightHero } from '@/components/features';
import StampCard from '@/components/StampCard';

const TRAY = [PASTRIES[0], PASTRIES[1], PASTRIES[2], BREAD[0], BREAD[2], PASTRIES[5]];

export default function Home() {
  const { mode, peek, setPeek, now, sound, ding, toast } = useHC();
  const chip = fresh(PASTRIES[0], now);
  // 8 · oven ding: every so often a fresh batch "lands"
  useEffect(() => {
    if (!sound || mode !== 'open') return;
    const names = ['cardamom buns', 'croissants', 'everything bagels', 'pain au chocolat'];
    const id = setInterval(() => { ding('ding'); toast(`ding! fresh ${names[Math.floor(Math.random() * names.length)]} just landed`); }, 75000);
    return () => clearInterval(id);
  }, [sound, mode, ding, toast]);

  return (
    <>
      {mode === 'closed' ? (
        <NightHero />
      ) : (
        <section className="hero">
          {peek && (
            <p className="peek mono">peeking at 10:24 · <button onClick={() => setPeek(false)} className="cherry" style={{ textDecoration: 'underline' }}>back to night</button></p>
          )}
          <div className="wrap hero-in">
            <p className="script">baked loud, daily</p>
            <h1 className="headline hero-words"><span>Butter.</span> <span>Flour.</span> <span>Patience.</span></h1>
            <BiteCroissant />
            <div className="fresh-chip mono">
              <span className={`steam s${chip.steam || 1}`} aria-hidden><i /><i /><i /></span>
              <i className="dot" aria-hidden />{chip.label || 'baked this morning'}
            </div>
            <div className="hero-cta">
              <Link href="/menu/" className="btn fill">pre-order for tomorrow</Link>
              <a href="#tray" className="btn">today’s tray</a>
            </div>
            <p className="mono hours-line">open 7:00–18:00 · {mode === 'sunrise' ? 'ovens warming up' : 'ovens on'}</p>
          </div>
        </section>
      )}

      <section className="wrap tray" id="tray">
        <div className="sec-head">
          <h2 className="headline-m">Fresh. Warm. Gone.</h2>
          <p className="body">every tray tells you when it left the oven. after 3pm the leftovers go half price on their own.</p>
        </div>
        <div className="tray-grid">{TRAY.map((i) => <FreshCard key={i.id} item={i} />)}</div>
        <Link href="/menu/" className="btn" style={{ marginTop: 34 }}>the whole tray →</Link>
      </section>

      <section className="cake-band on-cherry">
        <div className="wrap">
          <p className="script" style={{ color: 'var(--pink)' }}>for birthdays &amp; breakups</p>
          <h2 className="headline" style={{ color: 'var(--cream)' }}>Write on<br />the cake.</h2>
          <p className="body" style={{ color: 'var(--cream)', marginTop: 18 }}>type it, watch it get piped, then order exactly that cake.</p>
          <CakeBuilder compact />
        </div>
      </section>

      <section className="wrap coffee">
        <p className="script">espresso o’clock</p>
        <h2 className="headline-m">Espresso. Milk. Attitude.</h2>
        <div className="coffee-grid"><WrongName /><MoodDial /></div>
      </section>

      <section className="wrap boxsec">
        <div>
          <p className="script">everything goes in</p>
          <h2 className="headline-m">The pink box.</h2>
          <p className="body" style={{ marginTop: 18 }}>add anything and it drops in. the 13th pastry joins free, that’s a baker’s dozen. at checkout the string ties itself.</p>
          <img src={img('box-open')} alt="an open pink pastry box full of croissants and buns" className="cutout boximg" loading="lazy" />
        </div>
        <StampCard />
      </section>

      <section className="wrap film">
        <img src={img('film-tee')} alt="a baker from behind in a white tee with a metal-style heavy cream logo" loading="lazy" />
        <div className="film-cap"><span className="mono cherry">the tee · £30 · cherry on white</span><Link href="/about/#merch" className="cherry">shop merch →</Link></div>
      </section>
    </>
  );
}
